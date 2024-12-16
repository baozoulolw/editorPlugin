import { unsafeWindow } from "$";

export const registerCommand = async (editor) => {
  registerLint(editor, monaco)
}

/**
 * @description: 注册格式化快捷键
 * @Date: 2024-12-10 10:23:25
 * @Author: 王浩然
 * @param {*} editor
 * @return {*}
 */
const registerLint = (editor) => {
  const monaco = unsafeWindow.monaco
  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Quote,
    () => {
      editor.getAction('editor.action.formatDocument').run()
    }
  )
}