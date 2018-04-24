import { O2_AMBIENT_CLASSNAME } from './const'
import { getRandomInt, getRandom } from './utils'
import debounce from 'lodash/debounce'

class Snow {
  constructor ({
    width = window.innerWidth,
    height = window.innerHeight,
    parent = document.body,
    fps = 30,
    textures = [],
    className = O2_AMBIENT_CLASSNAME,
    particleNumber = 25
  }) {
    this.width = width
    this.height = height
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
    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
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
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.width = window.innerWidth
    this.height = window.innerHeight
  }

  initFPS () {
    this.INTERVAL = 1000 / this.FPS
    this.nextTime = Date.now()
    this.startTime = this.nextTime
  }

  initTexture () {
    this.isTexture = this.textures.length > 0
    this.draw = this.drawDefault
    this.maxRadius = 5
    if (this.isTexture) {
      this.setTexureCache()
      this.draw = this.drawTexture
      this.maxRadius = 32
    }
  }

  setTexureCache () {
    this.offCanvas = document.createElement('canvas')
    this.offCtx = this.offCanvas.getContext('2d')
    this.offWidth = 0
    this.offHeight = 0

    this.textures.forEach((img, index) => {
      this.offWidth += img.width
      this.offHeight = Math.max(img.height, this.textures[index + 1] || 0)
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
      particles.push({
        x: getRandom(0, this.width),
        y: getRandom(0, this.height),
        r: this.isTexture ? getRandomInt(16, 32) : getRandomInt(1, 5),
        d: getRandom(0, this.PARTICLE_NUMBER),
        imgIndex: getRandomInt(0, this.textures.length - 1),
      })
    }

    this.particles = particles
  }

  drawTexture () {
    const ctx = this.ctx
    this.particles.forEach(particle => {
      ctx.moveTo(particle.x, particle.y)
      const size = this.imgsSize[particle.imgIndex]

      ctx.drawImage(
        this.offCanvas,
        size.x, size.y, size.width, size.height,
        particle.x, particle.y, particle.r, particle.r
      )
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

      this.angle += 0.01
      const angle = this.angle
      const width = this.width
      const height = this.height
      const maxRadius = this.maxRadius

      this.particles.forEach((particle, index) => {
        // +1 是为了避免负值，导致向上移动
        // 每个粒子均由其密度，影响着下落速度
        particle.y += Math.cos(angle + particle.d) + 1 + (particle.d / 10)
        particle.x += Math.sin(angle) * 2

        if (particle.x > width + maxRadius || particle.x < -maxRadius || particle.y > height) {
          // 66.7 % 的粒子
          if (index % 3 > 0) {
            particle.x = getRandom(0, width)
            particle.y = -maxRadius * 2
          } else if (Math.sin(angle) > 0) {
            particle.x = -maxRadius
            particle.y = getRandom(0, height)
          } else {
            particle.x = width + maxRadius
            particle.y = getRandom(0, height)
          }
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

export default Snow
