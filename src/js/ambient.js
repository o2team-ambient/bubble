import './utils/raf'
import {
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './utils/const'
import Main from './main'

const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

function initAmbient () {
  let main = new Main()
  // 主函数暴露
  window[O2_AMBIENT_MAIN] = main
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient

try {
  let csi = setInterval(() => {
    if (!window[O2_AMBIENT_CONFIG]) return
    clearInterval(csi)
    initAmbient()
  }, 1000)
} catch (e) {
  console.log(e) 
}
