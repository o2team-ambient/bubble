/*
 * 控制面板
 */

import dat from 'dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT
} from './components/const'
import { getParameterByName } from './components/utils'
import forEach from 'lodash/forEach'

 /* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const isShowController = getParameterByName('controller')
// console.log(isShowController, isLoop)

// 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
class OtherConfig {
  constructor () {
    this.message = 'Snow-统一方向'
    this.backgroundColor = '#2f85dc'
    this.play = () => {
      window[O2_AMBIENT_MAIN] && window[O2_AMBIENT_MAIN].toggle()
    }
  }
}

class Control {
  constructor () {
    this.isShow = isShowController
    this.config = window[O2_AMBIENT_CONFIG]
    this.otherConfig = new OtherConfig()
    this.initBaseGUI()
    this.initTextureGUI()
    Control.setBackgroundColor(this.otherConfig.backgroundColor)
  }

  initBaseGUI () {
    const config = this.config
    const otherConfig = this.otherConfig
    const gui = new dat.GUI()
    gui.add(otherConfig, 'message').name('配置面板')
    gui.add(otherConfig, 'play').name('播放 / 暂停')
    gui.add(config, 'particleNumber', 3, 100, 1).name('粒子数量').onFinishChange(val => {
      window[O2_AMBIENT_INIT]()
    })
    gui.addColor(otherConfig, 'backgroundColor').name('背景颜色').onFinishChange(val => {
      Control.setBackgroundColor(val)
    })
    if (!this.isShow) gui.close()
    this.gui = gui
    this.setGUIzIndex(2)
  }

  initTextureGUI () {
    const gui = this.gui
    const textures = this.config.textures
    const texturesFolder = gui.addFolder('纹理')
    let index = 0
    forEach(textures, (texture, key) => {
      const textureController = texturesFolder.add(textures, key).name(`纹理${index++}`)
      textureController.onFinishChange(val => {
        window[O2_AMBIENT_INIT]()
      })
    })
    texturesFolder.open()

    this.texturesFolder = texturesFolder
  }

  setGUIzIndex (zIndex) {
    this.gui.domElement.parentElement.style.zIndex = zIndex
  }

  static setBackgroundColor (color) {
    document.body.style.backgroundColor = color
  }
}

/* eslint-disable no-new */
new Control()
