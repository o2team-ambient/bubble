/**
* @author yvonnexchen
* @date 2018-4-16
* @desc
*/

class Main {
  constructor() {
    this.num = 30
    this.ease = 'linear'
    this.cubic = 'cubic-bezier(0.470,0.000,0.745,0.715)'
    this.pic = [
      'https://img20.360buyimg.com/ling/jfs/t19231/101/1740022916/276990/bd8945f/5ad47a2bN4ec852a3.png',
      'https://img13.360buyimg.com/ling/jfs/t17290/130/1661446065/268718/412bc02a/5ad47a2eNc8614596.png',
      'https://img12.360buyimg.com/ling/jfs/t16603/85/1723180043/158655/307809f2/5ad47a2dN56abcd39.png'
    ]
    this.shake = true
    this.scaleBig = false
    this.size = [150, 150]
    this.init()
  }

  init () {
    this.create()
    this.setting()
  }

  create () {
    let _self = this
    for (let i=0;i < this.num; i++ ){
      let moveVal = Math.ceil(Math.random()*50)
      let posVal = Math.ceil(Math.random()*50)
      let scaleVal = Math.floor(Math.random()*3) + 2 //[2~5]
      let shakeVal = Math.ceil(Math.random()*5)
      let stretchVal = Math.ceil(Math.random()*5)
      let picNum = this.pic ? Math.floor(Math.random()*(this.pic.length)) + 1 : ''
      let backGround = picNum ? `background-image: url(${this.pic[picNum-1]});` : 'background-color:rgba(255, 255, 255, 0.8);'
      let {move, scale, shake, stretch} = this.animate({moveVal, posVal, scaleVal, shakeVal, stretch})

      $(".field").append(`<div style="${move}" class="move move${moveVal} pos${posVal}"><div style="${scale}" class="scale${scaleVal}"><div style="${backGround}${shake}" class="item shake${shakeVal}"><span style="${stretch}" class="item stretch${stretchVal}"></span></div></div>`);
    }

    $('.item').css({
      width: _self.size[0],
      height: _self.size[1]
    })

    console.log( _self.size[0]);
  }

  animate (aniObj) {
    let { moveVal, posVal, scaleVal, shakeVal, stretchVal} = aniObj
    let easeBase = this.cubic || this.ease
    let posCssStr = `left: ${posVal*2}%;`
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

  setting () {
    $('.submit').on('click', () => {
      let num = $('.num').val()
      let cubic = $('.cubic').val()
      let pic = $('.pic').val()
      let ease = $('.ease').val()
      let shake = $('.shake').val()
      let scaleBig = $('.scale').val()
      let size = $('.size').val()

      if (typeof pic === 'string') {
        let splitMark = ','
        if (/，/.test(pic)) splitMark = '，'

        this.pic = pic.split(splitMark)
      }

      if (typeof size === 'string') {
        let splitMark = ','
        if (/，/.test(size)) splitMark = '，'

        this.size = size.split(splitMark)
        this.size[0] = Number(this.size[0])
        this.size[1] = this.size[1] ? Number(this.size[1]) : Number(this.size[0])
      }

      this.num = num
      this.cubic = cubic
      this.ease = ease
      this.shake = shake === 'true'
      this.scaleBig = scaleBig === 'true'

      $(".field").html('')

      this.create()
    })
  }
}

export default Main
