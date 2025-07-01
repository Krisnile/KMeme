# 🚀 KMeme 微信相册小程序

**KMeme** 是一个基于 **Uni-app + uView-Plus + uni-ui** 构建的微信小程序，专为图片上传、浏览、收藏等操作打造，旨在提供简洁流畅的图片管理体验。

👉 项目地址：[https://github.com/Krisnile/KMeme](https://github.com/Krisnile/KMeme)

---

## ✨ 项目特点

* 📱 **跨端开发**：使用 Uni-app，一套代码支持多平台发布。
* 🎨 **高颜值 UI**：集成 uView-Plus 与 uni-ui ，界面美观，交互流畅。
* 📤 **批量上传**：支持多图上传，添加标题、描述与标签。
* 🗂️ **智能管理**：收藏、分类、标签筛选，管理更高效。
* 🧪 **模拟数据**：Mock.js 支持前端独立开发，接口模拟真实流转。

---

## 🧩 核心页面

* `首页`：轮播图 + 相册瀑布流 + 快捷导航
* `图片上传`：批量上传 + 信息填写 + 分类管理
* `相册详情`：瀑布流查看 + 动态标题
* `我的收藏`：支持筛选、统计、取消收藏
* `个人中心`：用户信息 + 设置 + 数据统计
* `图片搜索`：关键词搜索 + 空状态提示

```
pages/
├── add/
│   └── add.vue         # 图片上传与相册分类
├── album/
│   └── album.vue       # 相册详情与瀑布流浏览
├── collect/
│   └── collect.vue     # 收藏管理与筛选
├── index/
│   └── index.vue       # 首页轮播与相册展示
├── mine/
│   └── mine.vue        # 用户信息与设置
└── search/
    └── search.vue      # 关键词搜索与结果展示
```
---

## 🛠 技术栈

* **前端框架**：`Uni-app` (Vue2 / Vue3)
* **组件库**：`uView-Plus`
* **数据模拟**：`Mock.js`
* **样式**：`SCSS` + `uni.scss`
* **请求封装**：基于 `uni.request`，支持 token、错误处理

---

## 📦 快速开始

```bash
# 克隆项目
git clone https://github.com/Krisnile/KMeme.git
cd KMeme

# 安装依赖
npm install

# 在 HBuilderX 中导入项目
# 使用“运行到小程序模拟器”调试
```

> ⚠️ 请确保开启微信开发者工具的“服务端口”，否则模拟器无法启动。

---

## 🌐 API 模拟结构

```
api/
├── mockData/pageApi.js  # 页面模拟数据
├── api.js               # 统一 API 调用
├── http.js              # 请求封装
└── mock.js              # Mock 配置（仅开发环境启用）
```

---

## 📌 部署说明

> 当前为演示项目，实际部署需接入真实后端服务与云存储。

* 替换 `api/http.js` 中的 `baseUrl`
* 接入如 OSS/COS 的图片上传服务
* 提交微信公众平台审核上线

---

## 📈 未来展望

* 评论、点赞、通知等社交互动
* 个性化推荐与高级搜索
* 用户主页与社区功能拓展

---

**欢迎 Star & Fork！一起让 KMeme 更好用！** ⭐
如有问题或建议，欢迎 [Issue](https://github.com/Krisnile/KMeme/issues) 交流～

