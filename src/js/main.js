import 'zepto/src/zepto'
import {
  O2_AMBIENT_CONFIG
} from './utils/const'

class Main {
  constructor() {
    this.$field = $('.o2team_ambient_field')
    this.styleInsertId = 'o2teamAmbientStyleBubbleFootball'
    this.reset()
    this.ease = 'linear'
    this.cubic = 'cubic-bezier(0.470,0.000,0.745,0.715)'
    this.shake = true
    this.scaleBig = false
    this.isInited = false
    this.init()
  }

  init() {
    this.setCss()
    this.create()
    this.isInited = true
    // this.setting()
    let sto
    window.addEventListener('resize', () => {
      sto && clearTimeout(sto)
      sto = setTimeout(() => {
        this.setCss()
        this.reset()
      }, 200)
    })
  }

  create() {
    let xRatio = ((this.size[0] / document.documentElement.clientWidth) / 2) * 100
    for (let i = 0; i < this.num; i++) {
      let moveVal = Math.ceil(Math.random() * 50)
      let posVal = Math.ceil(Math.random() * (50 + (xRatio * 2))) - xRatio
      let scaleVal = Math.floor(Math.random() * 3) + 2 //[2~5]
      let shakeVal = Math.ceil(Math.random() * 5)
      let stretchVal = Math.ceil(Math.random() * 5)
      let picNum = this.pic ? Math.floor(Math.random() * (this.pic.length)) + 1 : ''
      let backGround = picNum ? `background-image: url(${this.pic[picNum-1]});` : 'background-color:rgba(255, 255, 255, 0.8);'
      let {
        move,
        scale,
        shake,
        stretch
      } = this.animate({
        moveVal,
        posVal,
        scaleVal,
        shakeVal,
        stretchVal
      })

      this.$field.append(`<div style="${move}" class="o2team_ambient_move o2team_ambient_move${moveVal} pos${posVal}"><div style="${scale}" class="o2team_ambient_scale${scaleVal}"><div style="${backGround}${shake}" class="o2team_ambient_item o2team_ambient_shake${shakeVal}"><span style="${stretch}" class="o2team_ambient_item o2team_ambient_stretch${stretchVal}"></span></div></div>`);
    }

    $('.o2team_ambient_item').css({
      width: this.size[0],
      height: this.size[1]
    })
  }

  setCss() {
    let head = document.getElementsByTagName('head')[0]
    let style = this.isInited ? document.getElementById(this.styleInsertId) : document.createElement('style')
    if (!this.isInited) {
      style.type = 'text/css'
      style.id = this.styleInsertId
    }
    style.innerHTML = `
    @keyframes move {
        0% {
            transform: translateY(0px);
        }
        100% {
            transform: translateY(-${document.documentElement.clientHeight + (this.size[0] * 2)}px);
        }
    }`
    !this.isInited && head.appendChild(style)
  }

  animate(aniObj) {
    let {
      moveVal,
      posVal,
      scaleVal,
      shakeVal,
      stretchVal
    } = aniObj
    let easeBase = this.cubic || this.ease
    let posCssStr = `left: ${posVal*2}%;bottom: -${this.size[0]}px;`
    let movCssStr = `animation: move ${moveVal*0.2 + 5}s ${easeBase} ${moveVal*0.2}s infinite normal;-webkit-animation: move ${moveVal*0.2 + 5}s ${easeBase} ${moveVal*0.2}s infinite normal;`
    let scaleCssStr = this.scaleBig ? `animation: scale ${moveVal*0.2 + 5}s ${easeBase} ${moveVal*0.2}s infinite normal;transform: scale(${scaleVal*0.1});-webkit-transform: scale(${scaleVal*0.1});` : `transform: scale(${scaleVal*0.1});-webkit-transform: scale(${scaleVal*0.1});`
    let shakeCssStr = this.shake ? `animation: shake ${shakeVal*0.2 + 2}s ease 0s infinite normal;-webkit-animation: shake ${shakeVal*0.2 + 2}s ease 0s infinite normal;` : ''
    let stretchCssStr = `animation: stretch ${stretchVal*0.2 + 2}s ease 0s infinite normal;-webkit-animation: stretch ${stretchVal*0.2 + 2}s ease 0s infinite normal;`

    return {
      move: `${movCssStr}${posCssStr}`,
      scale: `${scaleCssStr}`,
      shake: `${shakeCssStr}`,
      stretch: `${stretchCssStr}`
    }
  }

  reset() {
    this.num = window[O2_AMBIENT_CONFIG].particleNumber
    this.pic = window[O2_AMBIENT_CONFIG].textures
    this.size = [window[O2_AMBIENT_CONFIG].size, window[O2_AMBIENT_CONFIG].size]

    this.$field.html('')

    this.isInited && this.create()
  }
}

export default Main