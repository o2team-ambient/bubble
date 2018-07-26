import { O2_AMBIENT_CONFIG } from './js/utils/const'
import NO_COLOR from './images/34cafbecea6d24c062ea5177adbb42d1.png'
import NO_COLOR_2 from './images/92da6c3db10b3984491a6089f58da2bb.png'
import PINK from './images/be99ef64f6b6421f545305755de8ded8.png'
import BLUE from './images/ca177c09eb82f45c6d42ce00c2f48450.png'
import PURPLE from './images/ccb033e4aac4e872e39927a1603306af.png'

window[O2_AMBIENT_CONFIG] = {
  particleNumber: 30,
  size: 150,
  textures: [
    {name: '无色泡泡', url: NO_COLOR},
    {name: '无色泡泡2', url: NO_COLOR_2},
    {name: '粉色泡泡', url: PINK},
    {name: '蓝色泡泡', url: BLUE},
    {name: '紫色泡泡', url: PURPLE}
  ]
}