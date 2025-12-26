export default {
  editorConfig: {
    fontSize: 15,
    fontFamily: '1',
    theme: "monokai-Monokai-Pro-Filter-Spectrum",
    tabSize: 2,
    cursorSmoothCaretAnimation: true, //光标平滑
    roundedSelection: true, // 选中圆角
    //smoothScrolling:true, // 编辑器平滑
    fontLigatures: true,
    formatOnType: true,
    minimap: {
      enabled: false,
      autohide: true
    },
    EditorAutoClosingEditStrategy: 'auto', // 选中括号闭合
    autoClosingComments: true, // 自动闭合注释
    cursorBlinking: 'smooth',
    overviewRulerBorder: true
  },
  copilot: '/com/deepSeek',
  textmate: true,
  aiCode: false,
  useVim: false,
  annotationConfig: {
    author: '王浩然'
  },
  syncDownload: false
}