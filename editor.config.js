export default {
  editorConfig: {
    fontSize: 15,
    fontFamily: '1',
    theme: "vs",
    tabSize: 2,
    cursorSmoothCaretAnimation: true, //光标平滑
    roundedSelection: true, // 选中圆角
    //smoothScrolling:true, // 编辑器平滑
    fontLigatures: true,
    formatOnType: true,
    minimap: {
      enabled: false
    },
    EditorAutoClosingEditStrategy: 'auto', // 选中括号闭合
    autoClosingComments: true, // 自动闭合注释
    cursorBlinking: 'smooth',
    overviewRulerBorder: true
  },
  copilot: 'codeium',
  textmate:true,
  aiCode: false
}