import { O2_AMBIENT_CLASSNAME } from './const'
import { getRandomInt, getRandom, getDevicePixelRatio, degToRad } from './utils'
import debounce from 'lodash/debounce'

class Bubble {
  constructor ({
    width = window.innerWidth,
    height = window.innerHeight,
    parent = document.body,
    fps = 30,
    textures = [],
    className = O2_AMBIENT_CLASSNAME,
    particleNumber = 25
  }) {
    this.devicePixelRatio = getDevicePixelRatio()
    this.width = width * this.devicePixelRatio
    this.height = height * this.devicePixelRatio
    this.parent = parent
    this.FPS = fps
    this.textures = textures
    this.className = className
    this.isPaused = false
    this.angle = 0
    this.PARTICLE_NUMBER = particleNumber
    this.initFPS()
    this.initTexture()
    this.initDOM()
    this.addParticles()
    this.bindEvents()
    this.play()
  }

  initDOM () {
    const canvas = document.createElement('canvas')
    const devicePixelRatio = this.devicePixelRatio
    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = `${this.width / devicePixelRatio}px`
    canvas.style.height = `${this.height / devicePixelRatio}px`
    canvas.style.zIndex = -1
    canvas.style.pointerEvents = 'none'
    canvas.className = this.className
    canvas.width = this.width
    canvas.height = this.height
    this.parent.appendChild(canvas)
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  bindEvents () {
    this.resizeSelf = debounce(this.windowResizeHandle.bind(this), 300)
    window.addEventListener('resize', this.resizeSelf, false)
  }

  unbindEvents () {
    window.removeEventListener('resize', this.resizeSelf, false)
  }

  windowResizeHandle (e) {
    const devicePixelRatio = this.devicePixelRatio

    this.width = window.innerWidth * devicePixelRatio
    this.height = window.innerHeight * devicePixelRatio
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = `${this.width / devicePixelRatio}px`
    this.canvas.style.height = `${this.height / devicePixelRatio}px`
  }

  initFPS () {
    this.INTERVAL = 1000 / this.FPS
    this.nextTime = Date.now()
    this.startTime = this.nextTime
  }

  initTexture () {
    this.isTexture = this.textures.length > 0
    this.draw = this.drawDefault
    this.maxRadius = 15
    if (this.isTexture) {
      this.setTexureCache()
      this.draw = this.drawTexture
      this.maxRadius = 50
    }
  }

  setTexureCache () {
    this.offCanvas = document.createElement('canvas')
    this.offCtx = this.offCanvas.getContext('2d')
    this.offWidth = 0
    this.offHeight = 0

    this.textures.forEach((img, index) => {
      this.offWidth += img.width
      this.offHeight = Math.max(img.height, this.offHeight || 0)
    })

    this.offCanvas.width = this.offWidth
    this.offCanvas.height = this.offHeight

    let x = 0
    const y = 0
    this.imgsSize = []
    this.textures.forEach((img, index) => {
      this.imgsSize.push({
        x,
        y,
        width: img.width,
        height: img.height
      })
      this.offCtx.drawImage(img, x, y, img.width, img.height)
      x += img.width
    })
  }

  addParticles () {
    const particles = []
    for (let i = 0; i < this.PARTICLE_NUMBER; i++) {
      const imgIndex = getRandomInt(0, this.textures.length - 1)
      particles.push({
        x: getRandom(0, this.width),
        y: getRandom(this.height, 1.5 * this.height),
        r: (this.isTexture ? this.imgsSize[imgIndex].width : getRandomInt(1, 5)) * (this.devicePixelRatio / 2),
        d: getRandom(0, this.PARTICLE_NUMBER),
        a: getRandomInt(-360, 360),
        imgIndex,
      })
    }

    this.particles = particles
  }

  drawTexture () {
    const ctx = this.ctx
    this.particles.forEach(particle => {
      const size = this.imgsSize[particle.imgIndex]
      const width = size.width
      const height = size.height
      ctx.save()
      ctx.translate(particle.x + (width / 2), particle.y + (height / 2))
      ctx.rotate(degToRad(particle.a))
      ctx.drawImage(
        this.offCanvas,
        size.x, size.y, width, height,
        (-width / 2), (-height / 2), particle.r, particle.r
      )
      ctx.restore()
    })
  }

  drawDefault () {
    const ctx = this.ctx
    ctx.save()
    ctx.fillStyle = 'rgba(255, 255, 255, .5)'
    ctx.beginPath()
    this.particles.forEach(particle => {
      ctx.moveTo(particle.x, particle.y)
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
    })
    ctx.fill()
    ctx.restore()
  }

  play () {
    this.isPaused = false
    cancelAnimationFrame(this.rafId)
    this.loop()
  }

  pause () {
    this.isPaused = true
  }

  stop () {
    cancelAnimationFrame(this.rafId)
    this.pause()
  }

  toggle () {
    this.isPaused
      ? this.play()
      : this.pause()
  }

  loop () {
    this.rafId = requestAnimationFrame(this.loop.bind(this))
    if (this.isPaused) return

    const now = Date.now()
    const elapsed = now - this.nextTime

    if (elapsed > this.INTERVAL) {
      this.nextTime = now - (elapsed % this.INTERVAL)

      this.ctx.clearRect(0, 0, this.width, this.height)
      this.draw()

      this.angle += 0.05
      const angle = this.angle
      const width = this.width
      const height = this.height
      const maxRadius = this.maxRadius

      this.particles.forEach((particle, index) => {
        // +1 是为了避免负值，导致向上移动
        // 每个粒子均由其密度，影响着下落速度
        particle.y -= Math.cos(angle + (particle.d / 2)) + 1 + (particle.d / 5)

        if (particle.y < 0) {

          particle.y = getRandom(height, 1.5 * height)
        }
      })
    }
  }

  destory () {
    this.stop()
    this.unbindEvents()
    this.parent.removeChild(this.canvas)
  }
}

export default Bubble
