import Preloader from 'preloader.js'
import Snow from './components/snow'
import values from 'lodash/values'

let snow = null

function initAmbient () {
  try {
    if (snow) {
      snow.destory()
      snow = null
    }

    const config = window.O2_AMBIENT_CONFIG
    const texturesArr = values(config.textures).filter(texture => texture.trim() !== '')
    const preloader = new Preloader({
      resources: texturesArr,
      concurrency: 4,
    })

    preloader.addProgressListener(function (loaded, length) {
      console.log('loading ', loaded, length, loaded / length)
    })
    preloader.addCompletionListener(function () {
      console.log('load completed')
      /* eslint-disable no-new */
      snow = new Snow({
        textures: texturesArr.map(imgSrc => preloader.get(imgSrc)),
        particleNumber: config.particleNumber,
        fps: config.fps,
        className: config.className,
        parent: document.querySelector(config.parent)
      })

      window.O2_AMBIENT_MAIN = snow
    })

    preloader.start()
  } catch (err) {
    console.log(err)
  }
}

window.O2_AMBIENT_INIT = initAmbient
initAmbient()
