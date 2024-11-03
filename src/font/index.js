import { getSettings } from "../utils"
import { fontList } from "./fontList"

export const getFontName = () => {
  const { editorConfig: { fontFamily } } = getSettings()
  let { value, fontLigatures } = fontList.find(item => item.id === fontFamily)
  return { fontFamily: value, fontLigatures }
}

// 更新字体间隔
export const setFeature = (font = {}) => {
  let dom = document.querySelector(
    ".view-lines.monaco-mouse-cursor-text"
  );
  if (!dom) return
  dom.style["fontFamily"] = font.value;
};