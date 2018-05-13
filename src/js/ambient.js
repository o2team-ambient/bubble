import Preloader from 'preloader.js'
import './components/modernizr'
import './components/raf'
import Bubble from './components/bubble'
import values from 'lodash/values'
import {
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './components/const'

let bubble = null

function initAmbient () {
  try {
    if (bubble) {
      bubble.destory()
      bubble = null
    }

    const config = window[O2_AMBIENT_CONFIG]
    const texturesArr = values(config.textures).filter(texture => texture.trim() !== '')
    const preloader = new Preloader({
      resources: texturesArr,
      concurrency: 4,
    })

    preloader.addProgressListener(function (loaded, length) {
      // console.log('loading ', loaded, length, loaded / length)
    })
    preloader.addCompletionListener(function () {
      // console.log('load completed')
      /* eslint-disable no-new */
      bubble = new Bubble({
        textures: texturesArr.map(imgSrc => preloader.get(imgSrc)),
        particleNumber: config.particleNumber,
      })

      window[O2_AMBIENT_MAIN] = bubble
    })

    preloader.start()
  } catch (err) {
    console.log(err)
  }
}

window[O2_AMBIENT_INIT] = initAmbient

if (window.Modernizr.requestanimationframe && window.Modernizr.csspointerevents) {
  initAmbient()
}
