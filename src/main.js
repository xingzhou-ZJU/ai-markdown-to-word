/**
 * AI 内容转 Word 文档工具 - 主应用
 */

import "./styles.css";
import { exportToWord, exportToPDF, renderPreview } from "./utils/converter.js";

// 示例内容
const sampleContent = `# AI 内容转 Word 文档示例

这是一份演示文档，展示了如何将 AI 生成的内容（来自 DeepSeek、豆包、ChatGPT、Claude 等）转换为格式完美的 Word 文档。

## 1. 基础文本格式

### 1.1 文本样式

支持**粗体文本**、*斜体文本*、***粗斜体***和~~删除线~~。

### 1.2 列表

无序列表：
• 第一项内容
• 第二项内容
• 第三项内容

有序列表：
1. 步骤一：准备内容
2. 步骤二：编辑格式
3. 步骤三：导出文档

## 2. LaTeX 数学公式

### 2.1 行内公式

质能方程是 $E = mc^2$，这是爱因斯坦最著名的公式。

勾股定理：$a^2 + b^2 = c^2$

### 2.2 块级公式

二次方程求根公式：

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

微积分基本定理：

$$\\int_a^b f(x)dx = F(b) - F(a)$$

欧拉公式（最美数学公式）：

$$e^{i\\pi} + 1 = 0$$

### 2.3 物理公式

牛顿第二定律：

$$F = ma$$

万有引力定律：

$$F = G\\frac{m_1m_2}{r^2}$$

### 2.4 化学方程式

光合作用反应：

$$6CO_2 + 6H_2O \\xrightarrow{\\text{光能}} C_6H_{12}O_6 + 6O_2$$

水的电解：

$$2H_2O \\xrightarrow{\\text{电解}} 2H_2 + O_2$$

## 3. Mermaid 流程图

### 3.1 流程图

\`\`\`mermaid
graph TD
    A[开始] --> B{判断条件}
    B -->|条件成立| C[执行操作A]
    B -->|条件不成立| D[执行操作B]
    C --> E[结束]
    D --> E
    E --> F[完成]
\`\`\`

### 3.2 时序图

\`\`\`mermaid
sequenceDiagram
    participant 用户
    participant AI助手
    participant 文档系统

    用户->>AI助手: 发送问题
    AI助手->>文档系统: 生成内容
    文档系统-->>AI助手: 返回结果
    AI助手-->>用户: 显示答案
\`\`\`

### 3.3 甘特图

\`\`\`mermaid
gantt
    title 项目进度计划
    dateFormat  YYYY-MM-DD
    section 需求分析
    需求调研       :a1, 2024-01-01, 7d
    需求评审       :a2, after a1, 3d
    section 设计阶段
    系统设计       :b1, after a2, 10d
    设计评审       :b2, after b1, 2d
    section 开发阶段
    前端开发       :c1, after b2, 15d
    后端开发       :c2, after b2, 15d
    section 测试阶段
    集成测试       :d1, after c1, 7d
    用户验收       :d2, after d1, 5d
\`\`\`

## 4. 表格

### 4.1 比较表格

| 功能 | 支持情况 | 说明 |
|------|---------|------|
| LaTeX 公式 | ✅ 完全支持 | 行内和块级公式 |
| Mermaid 图表 | ✅ 完全支持 | 流程图、时序图等 |
| 中文支持 | ✅ 完全支持 | 微软雅黑字体 |
| 表格 | ✅ 完全支持 | GitHub 风格表格 |
| 代码高亮 | ✅ 完全支持 | 多种编程语言 |

### 4.2 数据统计

| 平台 | 兼容性 | 公式支持 | 图表支持 |
|------|--------|---------|---------|
| DeepSeek | 🟢 优秀 | ✅ | ✅ |
| 豆包 | 🟢 优秀 | ✅ | ✅ |
| ChatGPT | 🟢 优秀 | ✅ | ✅ |
| Claude | 🟢 优秀 | ✅ | ✅ |

## 5. 代码块

### JavaScript 示例

\`\`\`javascript
// 计算斐波那契数列
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 输出前 10 项
for (let i = 0; i < 10; i++) {
    console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}
\`\`\`

### Python 示例

\`\`\`python
import numpy as np

# 创建矩阵并计算特征值
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

eigenvalues = np.linalg.eigvals(matrix)
print(f"特征值: {eigenvalues}")
\`\`\`

## 6. 引用和提示

> 💡 **提示**：您可以从任何 AI 平台复制内容，粘贴到编辑器中，然后一键导出为 Word 文档。

> ⚠️ **注意**：确保您的系统已安装中文字体（如微软雅黑），以获得最佳显示效果。

## 7. 使用流程

1. **复制内容** - 从 DeepSeek/豆包/ChatGPT/Claude 等 AI 平台复制生成的内容
2. **粘贴编辑** - 将内容粘贴到左侧编辑器中
3. **预览确认** - 查看右侧预览效果
4. **导出文档** - 点击"导出 Word 文档"按钮

---

**文档生成时间**：${new Date().toLocaleString("zh-CN")}

**支持的平台**：DeepSeek、豆包、ChatGPT、Claude、Gemini、文心一言、通义千问等所有支持 Markdown 输出的 AI 平台。
`;

// DOM 元素引用
const markdownInput = document.getElementById("markdown-input");
const preview = document.getElementById("preview");
const btnExportWord = document.getElementById("btn-export-word");
const btnExportPdf = document.getElementById("btn-export-pdf");
const btnSample = document.getElementById("btn-sample");
const btnClear = document.getElementById("btn-clear");
const btnCopyMd = document.getElementById("btn-copy-md");

// 初始化应用
function init() {
  // 加载本地存储的内容
  const savedContent = localStorage.getItem("markdown-content");
  if (savedContent) {
    markdownInput.value = savedContent;
    updatePreview();
  }

  // 绑定事件监听器
  bindEvents();
}

// 绑定事件监听器
function bindEvents() {
  // 输入事件 - 实时预览
  markdownInput.addEventListener("input", debounce(() => {
    updatePreview();
    saveToLocal();
  }, 300));

  // 导出 Word
  btnExportWord.addEventListener("click", () => {
    const content = markdownInput.value;
    exportToWord(content);
  });

  // 导出 PDF
  btnExportPdf.addEventListener("click", () => {
    const content = markdownInput.value;
    exportToPDF(content);
  });

  // 加载示例
  btnSample.addEventListener("click", () => {
    if (markdownInput.value && !confirm("当前内容将被替换，是否继续？")) {
      return;
    }
    markdownInput.value = sampleContent;
    updatePreview();
    saveToLocal();
  });

  // 清空内容
  btnClear.addEventListener("click", () => {
    if (!markdownInput.value || confirm("确定要清空所有内容吗？")) {
      markdownInput.value = "";
      updatePreview();
      saveToLocal();
    }
  });

  // 复制 Markdown
  btnCopyMd.addEventListener("click", () => {
    const content = markdownInput.value;
    if (!content) {
      alert("没有可复制的内容");
      return;
    }
    copyToClipboard(content);
    showToast("✅ 已复制到剪贴板");
  });

  // 快捷键支持
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + S 导出 Word
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      const content = markdownInput.value;
      exportToWord(content);
    }
    // Ctrl/Cmd + Enter 导出 PDF
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      const content = markdownInput.value;
      exportToPDF(content);
    }
  });
}

// 更新预览
function updatePreview() {
  const content = markdownInput.value.trim();

  if (!content) {
    preview.innerHTML = '<div class="placeholder">预览区域 - 在左侧输入内容后自动显示</div>';
    return;
  }

  const html = renderPreview(content);
  preview.innerHTML = html;
}

// 保存到本地存储
function saveToLocal() {
  const content = markdownInput.value;
  localStorage.setItem("markdown-content", content);
}

// 复制到剪贴板
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // 降级方案
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

// 显示提示消息
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 添加动画样式
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// 启动应用
init();
