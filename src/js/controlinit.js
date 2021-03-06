/*
 * 控制面板初始化代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

const loadData = {
  "默认": {
    "0": {...window[O2_AMBIENT_CONFIG]}
  }
}
const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.backgroundColor = '#bddaf7'
      this.bool = false
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  class Control extends Controller {
    constructor () {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.initTextureGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          "remembered": { ...allLoadData.remembered }
        }
      })
      gui.remember(config)
      gui.addCallbackFunc(this.resetCanvas.bind(this))
      typeof config.particleNumber !== 'undefined' && gui.add(config, 'particleNumber', 3, 100, 1)
        .name('粒子数量')
      typeof config.size !== 'undefined' && gui.add(config, 'size', 10, 500, 1)
        .name('旗帜大小')
      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    initTextureGUI () {
      // demo code
      const gui = this.gui
      const config = this.config
      const texturesFolder = gui.addFolder('素材')
      texturesFolder.addGroup(config, 'textures').name('素材列表').onFinishChange(() => {
        this.resetCanvas()
      })
      // textures && textures.forEach((item, idx) => {
      //   const textureController = texturesFolder.add({item: item.url}, 'item').name(item.name)
      //   textureController.onFinishChange(((idx) => {
      //     return (val) => {
      //       if (!textureController.isModified()) return
      //       window[O2_AMBIENT_CONFIG].textures[idx].url = val
      //       this.resetCanvas()
      //     }
      //   })(idx))
      // })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit