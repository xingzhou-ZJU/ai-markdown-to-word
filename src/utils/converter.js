/**
 * Markdown 转 Word 文档工具
 */

import { md2docx } from "@m2d/md2docx";

/**
 * 将 Markdown 转换为 Word 文档 (Blob)
 * @param {string} markdown - Markdown 文本内容
 * @param {object} options - 转换选项
 * @returns {Promise<Blob>} - Word 文档 Blob
 */
export async function convertToWord(markdown, options = {}) {
  const defaultOptions = {
    // 默认字体配置（中文字符）
    defaultFont: {
      name: "Microsoft YaHei",
      family: "sans-serif"
    },
    // 标题样式
    heading: {
      font: "Microsoft YaHei"
    },
    // 代码字体
    code: {
      font: "Consolas, Monaco, 'Courier New', monospace"
    },
    ...options
  };

  try {
    const docxBlob = await md2docx(markdown, defaultOptions);
    return docxBlob;
  } catch (error) {
    console.error("转换失败:", error);
    throw new Error(`文档转换失败: ${error.message}`);
  }
}

/**
 * 下载 Word 文档
 * @param {Blob} blob - Word 文档 Blob
 * @param {string} filename - 文件名
 */
export function downloadDocx(blob, filename = "document.docx") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 生成文件名（带时间戳）
 * @param {string} prefix - 文件名前缀
 * @returns {string} - 完整文件名
 */
export function generateFilename(prefix = "document") {
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .slice(0, 19);
  return `${prefix}_${timestamp}.docx`;
}

/**
 * 显示加载状态
 * @param {boolean} show - 是否显示
 */
export function showLoading(show = true) {
  const loadingEl = document.getElementById("loading");
  if (loadingEl) {
    loadingEl.style.display = show ? "flex" : "none";
  }
}

/**
 * 导出 Markdown 为 Word 文档（主函数）
 * @param {string} markdown - Markdown 文本内容
 * @param {string} filename - 文件名（可选）
 */
export async function exportToWord(markdown, filename) {
  if (!markdown || markdown.trim() === "") {
    alert("请输入内容后再导出");
    return false;
  }

  showLoading(true);

  try {
    const blob = await convertToWord(markdown);
    const finalFilename = filename || generateFilename("AI文档");
    downloadDocx(blob, finalFilename);
    return true;
  } catch (error) {
    alert(`导出失败: ${error.message}`);
    return false;
  } finally {
    showLoading(false);
  }
}

/**
 * 导出 Markdown 为 PDF 文档
 * 注意：PDF 导出使用浏览器打印功能，用户可选择"另存为 PDF"
 * @param {string} markdown - Markdown 文本内容
 */
export function exportToPDF(markdown) {
  if (!markdown || markdown.trim() === "") {
    alert("请输入内容后再导出");
    return false;
  }

  // 将 Markdown 转换为 HTML 用于打印
  const htmlContent = convertMarkdownToHTML(markdown);

  // 创建新窗口用于打印
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>文档打印</title>
      <style>
        body {
          font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: #1e293b;
        }
        h1, h2, h3, h4, h5, h6 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-weight: 600;
          line-height: 1.25;
        }
        h1 { font-size: 2em; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        h3 { font-size: 1.25em; }
        p { margin: 12px 0; }
        ul, ol { margin: 12px 0; padding-left: 28px; }
        li { margin: 6px 0; }
        code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: Consolas, Monaco, monospace;
          font-size: 0.9em;
        }
        pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 16px 0;
        }
        pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        blockquote {
          border-left: 4px solid #2563eb;
          padding-left: 16px;
          margin: 16px 0;
          color: #64748b;
          font-style: italic;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
        }
        table th, table td {
          border: 1px solid #e2e8f0;
          padding: 10px 14px;
          text-align: left;
        }
        table th {
          background: #f8fafc;
          font-weight: 600;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .math-formula {
          font-family: "Times New Roman", serif;
          font-style: italic;
          padding: 8px;
          background: #f8fafc;
          border-radius: 4px;
        }
        .mermaid-diagram {
          text-align: center;
          margin: 20px 0;
        }
        @media print {
          body { max-width: 100%; }
          h1 { page-break-before: auto; }
          h1, h2, h3 { page-break-after: avoid; }
          table, pre, img { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `);
  printWindow.document.close();

  // 等待内容加载后打开打印对话框
  setTimeout(() => {
    printWindow.print();
  }, 250);

  return true;
}

/**
 * 简单的 Markdown 转 HTML（用于预览和打印）
 * @param {string} markdown - Markdown 文本
 * @returns {string} - HTML 内容
 */
function convertMarkdownToHTML(markdown) {
  let html = markdown;

  // 转义 HTML 特殊字符
  html = html.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // 行内代码
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // 标题
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // 粗体和斜体
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // 删除线
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // 引用
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

  // 水平线
  html = html.replace(/^---$/gm, "<hr>");
  html = html.replace(/^\*\*\*$/gm, "<hr>");

  // 无序列表
  html = html.replace(/^[\*\-] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)\n(?!<li>)/g, "$1</ul>\n");
  html = html.replace(/(?<!<\/ul>\n)(<li>)/g, "<ul>$1");

  // 有序列表
  html = html.replace(/^\d+\. (.+)$/gm, "<oli>$1</oli>");
  html = html.replace(/(<oli>.*<\/oli>)\n(?!<oli>)/g, "$1</ol>\n");
  html = html.replace(/(?<!<\/ol>\n)(<oli>)/g, "<ol>$1");
  html = html.replace(/<oli>(.+?)<\/oli>/g, "<li>$1</li>");

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');

  // 段落
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // 清理空段落
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/<p>(<h[1-6]>)/g, "$1");
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ol>)/g, "$1");
  html = html.replace(/(<\/ol>)<\/p>/g, "$1");
  html = html.replace(/<p>(<pre>)/g, "$1");
  html = html.replace(/(<\/pre>)<\/p>/g, "$1");
  html = html.replace(/<p>(<blockquote>)/g, "$1");
  html = html.replace(/(<\/blockquote>)<\/p>/g, "$1");
  html = html.replace(/<p>(<hr>)<\/p>/g, "$1");

  // LaTeX 公式（简单处理，实际需要 MathJax 或 KaTeX）
  html = html.replace(/\$\$([^$]+)\$\$/g, '<div class="math-formula">$$$1$$</div>');
  html = html.replace(/\$([^$]+)\$/g, '<span class="math-formula">$1</span>');

  // Mermaid 图表标记
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, '<div class="mermaid-diagram">$1</div>');

  return html;
}

/**
 * 简单的 Markdown 转 HTML（用于实时预览）
 * @param {string} markdown - Markdown 文本
 * @returns {string} - HTML 内容
 */
export function renderPreview(markdown) {
  return convertMarkdownToHTML(markdown);
}
