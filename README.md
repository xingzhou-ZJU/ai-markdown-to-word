# AI 内容转 Word 文档工具

<div align="center">

一个专业的在线工具，兼容 DeepSeek、豆包、ChatGPT、Claude 等 AI 平台，支持 LaTeX 数学公式、Mermaid 流程图，完美保留格式排版，一键导出 Word/PDF 文档。

[功能特性](#功能特性) • [快速开始](#快速开始) • [使用说明](#使用说明) • [示例](#示例)

</div>

## 功能特性

-  **AI 平台兼容** - 完美支持 DeepSeek、豆包、ChatGPT、Claude、Gemini、文心一言、通义千问等所有 AI 平台生成的内容
-  **LaTeX 公式** - 完整支持数学、物理、化学公式的行内和块级公式
-  **Mermaid 图表** - 支持流程图、时序图、甘特图等多种图表类型
-  **中文支持** - 自动使用微软雅黑字体，确保中文字符正确显示
-  **格式保留** - 完美保留标题、列表、表格、代码块等所有格式
-  **实时预览** - 输入内容后即时预览渲染效果
-  **本地存储** - 自动保存内容，刷新页面不丢失
-  **快捷键支持** - Ctrl+S 快速导出 Word，Ctrl+Enter 导出 PDF

##  快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在浏览器中自动打开，默认地址：http://localhost:3000

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

##  使用说明

### 基本流程

1. **复制内容** - 从 AI 平台（DeepSeek/ChatGPT/Claude 等）复制生成的内容
2. **粘贴编辑** - 将内容粘贴到左侧编辑器中
3. **预览确认** - 查看右侧实时预览效果
4. **导出文档** - 点击"导出 Word 文档"或"导出 PDF 文档"按钮

### 支持的 Markdown 语法

#### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 文本样式

```markdown
**粗体文本**
*斜体文本*
***粗斜体文本***
~~删除线~~
```

#### 列表

```markdown
无序列表：
• 第一项
• 第二项

有序列表：
1. 第一步
2. 第二步
```

#### LaTeX 公式

```markdown
行内公式：$E = mc^2$

块级公式：
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

#### Mermaid 图表

\`\`\`mermaid
graph TD
    A[开始] --> B{判断}
    B -->|是| C[执行]
    B -->|否| D[跳过]
\`\`\`

#### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
```

#### 代码块

\`\`\`javascript
function hello() {
    console.log("Hello World");
}
\`\`\`

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl/Cmd + S | 导出 Word 文档 |
| Ctrl/Cmd + Enter | 导出 PDF 文档 |


##  技术栈

- **核心库**: [@m2d/md2docx](https://github.com/md2docx/md2docx) - Markdown 转 Word 文档
- **构建工具**: [Vite](https://vitejs.dev/) - 快速的开发服务器
- **前端**: 原生 HTML + CSS + JavaScript - 无框架依赖
- **样式**: 现代响应式设计

##  项目结构

```
workspace/
├── package.json             # 项目配置和依赖
├── vite.config.js           # Vite 配置
├── index.html               # 主页面
├── src/
│   ├── main.js             # 主应用逻辑
│   ├── styles.css          # 样式文件
│   └── utils/
│       └── converter.js    # 转换工具函数
└── README.md              # 项目说明
```


<div align="center">

Made with ❤️ for AI Content Creators

[⬆ 返回顶部](#ai-内容转-word-文档工具)

</div>
