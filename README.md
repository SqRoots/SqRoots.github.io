# 个人主页



- 域名：lixuan.me
- 网站使用 [vuepress](https://vuepress.vuejs.org/) 和 [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 构建生成




## 一、非主题约定

### 1.1 撰写规范

==不含图片文档组织方式==

- 每篇文章一个 markdown 文件
- 如果包含非图片附件，存放在公共目录中 `/docs/.vuepress/public/`

==包含图片文档组织方式==

- 每篇文章一个目录
  - 目录名称 `文章标题，可以使用中文`
  - 文档名称 `index.md`

- 图片附件，存放在当前文章所在的子目录 `./assets/`
- 其他附件，存放在公共目录中 `/docs/.vuepress/public/`

==frontmatter 至少要包含以下3个字段==

```yaml
title: 文章标题
createTime: 2026-04-12 14:22:37
permalink: /to/your-custom-url/
```

### 1.2 自定义组件

#### JSXGraph 绘图组件

```html
<JSXGraph width="500px" height="450px"
  axis grid
  :keepAspectRatio="false"
  :boundingbox="[-1, 13, 9, -1]"
  :code="`
    // 点
    const A = board.create('point', [0,12], {name:'A'})
    const B = board.create('point', [0,0], {name:'B'})
    const C = board.create('point', [8,0], {name:'C'})
    const D = board.create('point', [2,9], {name:'D'})
    const E = board.create('point', [0,9], {name:'E'})
    const F = board.create('point', [2,0], {name:'F'})
    // 线段
    board.create('segment', [A,B])
    board.create('segment', [B,C])
    board.create('segment', [C,A])
    // 多边形
    board.create('polygon', [D,E,B,F])
    // 文本
    board.create('text', [0,11, '3'])
    board.create('text', [5,0, '6'])
  `"
/>
```

### 1.3 自定义插件

| 功能                                          | 插件                   |
| --------------------------------------------- | ---------------------- |
| AI生成的，支持frontmater中的cover使用相对路径 | relativeCoverPlugin.ts |

## 二、主题说明

### 2.1 安装

```sh
pnpm i
```

### 2.2 常用命令

```sh
# 启动开发服务
pnpm docs:dev
# 构建生产包
pnpm docs:build
# 本地预览生产服务
pnpm docs:preview
# 更新 vuepress 和主题
pnpm dlx vp-update
```

### 2.3 部署到 GitHub Pages

主题已创建 github actions: `.github/workflows/docs-deploy.yml`，你还需要在 github 仓库中进行以下设置：

- [ ] `settings > Actions > General`，拉到页面底部，在 `Workflow permissions` 下，勾选 `Read and write permissions`，并点击保存按钮

- [ ] `settings > Pages`, 在 `Build and deployment` 中，`Source` 选择 `Deploy from a branch`, `Branch` 选择 `gh-pages`，并点击保存按钮
  (首次创建可能没有 `gh-pages`分支，你可以先完成上面的设置后，推送一次代码到主分支，等待 `github actions` 完成后再进行设置)

- [ ] 修改 `docs/.vuepress/config.ts` 中的 `base` 选项：
  - 如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。
  - 如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

如需要自定义域名，请查看 [Github Pages 文档](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

### 2.4 文档

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
