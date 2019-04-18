## 使用方法

```
jnpm i @o2team/ambient-bubble --save
```

```javascript
import ATAmbient from '@o2team/ambient-bubble'

ATAmbient({
  particleNumber: 30,
  size: 150,
  textures: [
    {name: '无色泡泡', url: '//storage.jd.com/o2images/34cafbecea6d24c062ea5177adbb42d1.png'},
    {name: '无色泡泡2', url: '//storage.jd.com/o2images/92da6c3db10b3984491a6089f58da2bb.png'},
    {name: '粉色泡泡', url: '//storage.jd.com/o2images/be99ef64f6b6421f545305755de8ded8.png'},
    {name: '蓝色泡泡', url: '//storage.jd.com/o2images/ca177c09eb82f45c6d42ce00c2f48450.png'},
    {name: '紫色泡泡', url: '//storage.jd.com/o2images/ccb033e4aac4e872e39927a1603306af.png'}
  ]
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| particleNumber | `number` | - | 粒子数 |
| size | `number` | - | 粒子尺寸 |
| textures | `array<object>` | - | 粒子素材 |

## 预览地址

https://o2team-ambient.github.io/bubble/dist/?controller=1

## 项目结构

```
├── config                  - 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json               - 组件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.ejs
    ├── index.js            - 主入口文件
    ├── rollup_index.js     - npm 包主入口文件
    ├── config.js           - 控制板参数配置文件（单独打包）
    ├── control.js          - 控制板入口文件（单独打包）
    └── js
        ├── ambient.js      - 动效初始化入口
        ├── controlinit.js  - 控制板自定义代码
        └── utils
            ├── const.js    - 字段常数
            ├── raf.js
            └── util.js
```

> 开发完毕之后，请新建 gh-pages 分支并 push --set-upstream，以获得线上 demo 页。每次更新后，测试完成即可合并至 gh-pages 发布。