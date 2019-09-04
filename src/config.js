import { O2_AMBIENT_CONFIG } from './js/utils/const'
// import NO_COLOR from './images/34cafbecea6d24c062ea5177adbb42d1.png'
// import NO_COLOR_2 from './images/92da6c3db10b3984491a6089f58da2bb.png'
// import PINK from './images/be99ef64f6b6421f545305755de8ded8.png'
// import BLUE from './images/ca177c09eb82f45c6d42ce00c2f48450.png'
// import PURPLE from './images/ccb033e4aac4e872e39927a1603306af.png'

const NO_COLOR = '//storage.jd.com/o2images/34cafbecea6d24c062ea5177adbb42d1.png'
const NO_COLOR_2 = '//storage.jd.com/o2images/92da6c3db10b3984491a6089f58da2bb.png'
const PINK = '//storage.jd.com/o2images/be99ef64f6b6421f545305755de8ded8.png'
const BLUE = '//storage.jd.com/o2images/ca177c09eb82f45c6d42ce00c2f48450.png'
const PURPLE = '//storage.jd.com/o2images/ccb033e4aac4e872e39927a1603306af.png'

window[O2_AMBIENT_CONFIG] = {
  particleNumber: 30,
  size: 150,
  textures: [
    NO_COLOR,
    NO_COLOR_2,
    PINK,
    BLUE,
    PURPLE
  ]
}
