# room3d

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



#### 1、目录
- `pages/customMade` 定制页

#### 定制页组件划分
1) 3d 展示
- 缩放
- 旋转
- 点击编辑区
- 展示编辑区

2) 2d 编辑
- 图片
- 文字

[地址](https://batch.niudingwang.net/webview)
sdk 编译
```js
tsc -watch
```

#### 参考
[mobileSelect](https://github.com/onlyhom/mobileSelect.js)


#### 前端需求文档
首次加载-酒瓶信息(读)
- 模型oss url
- 材质oss url
- 完整贴图 oss url
- 除去所有编辑区的贴图 oss url

编辑酒瓶-图片(读)
- 编辑区对应的备选素材
- 编辑区的信息:
  - 相对坐标(x, y)
  - 宽高(w, h)
  - 类型: 文字(text)/图片(image)
  - 名字
  - id

编辑酒瓶-文字(读)
- 字体
- 颜色

保存编辑信息-图片/文字(写)
- 编辑区的图片

保存最终结果(写)
- 完整贴图图片


