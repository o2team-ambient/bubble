/*
 * 控制面板
 */

import dat from 'dat.gui'
import { getParameterByName } from './components/utils'
import forEach from 'lodash/forEach'
const isLoop = getParameterByName('loop')
const isShowController = getParameterByName('controller')
console.log(isShowController, isLoop)

// 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
class OtherConfig {
  constructor () {
    this.backgroundColor = '#6b92b9'
    this.play = function () {
      window.O2_AMBIENT_MAIN && window.O2_AMBIENT_MAIN.toggle()
    }
  }
}

class Control {
  constructor () {
    this.isShow = isShowController
    this.config = window.O2_AMBIENT_CONFIG
    this.otherConfig = new OtherConfig()
    this.initBaseGUI()
    this.initTextureGUI()

    document.body.style.backgroundColor = this.otherConfig.backgroundColor
  }

  initBaseGUI () {
    const config = this.config
    const otherConfig = this.otherConfig
    const gui = new dat.GUI()
    gui.domElement.parentElement.style.zIndex = 2
    gui.add(config, 'message').name('配置面板')
    gui.add(otherConfig, 'play').name('播放 / 暂停')
    gui.add(config, 'fps', 30, 60, 5).name('帧率').onFinishChange(val => {
      window.O2_AMBIENT_INIT()
    })
    gui.add(config, 'particleNumber', 3, 100).name('粒子数量').onFinishChange(val => {
      window.O2_AMBIENT_INIT()
    })
    gui.addColor(otherConfig, 'backgroundColor').name('背景颜色').onFinishChange(val => {
      document.body.style.backgroundColor = val
    })
    gui.add(config, 'className').name('CSS 类名').onFinishChange(val => {
      // todo: 验证
      window.O2_AMBIENT_INIT()
    })
    gui.add(config, 'parent').name('父元素').onFinishChange(val => {
      // todo: 验证
      if (val.trim() === '') return 'body'
      try {
        if (document.querySelector(val) === null) {
          alert('找不到指定的父元素')
          return
        }
      } catch (err) {
        alert('指定的父元素不正确')
        return
      }
      window.O2_AMBIENT_INIT()
    })
    if (!this.isShow) gui.close()
    this.gui = gui
  }

  initTextureGUI () {
    const gui = this.gui
    const textures = this.config.textures
    const texturesFolder = gui.addFolder('纹理')
    let index = 0
    forEach(textures, (texture, key) => {
      const textureController = texturesFolder.add(textures, key).name(`纹理${index++}`)
      textureController.onFinishChange(val => {
        window.O2_AMBIENT_INIT()
      })
    })
    texturesFolder.open()

    this.texturesFolder = texturesFolder
  }
}

/* eslint-disable no-new */
new Control()
