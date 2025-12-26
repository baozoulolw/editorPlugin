import { unsafeWindow } from "$"
import { Clipboard } from "v-clipboard";
let loadingInstance = null
export const getSettings = () => {
  let settings = unsafeWindow.localStorage.getItem(import.meta.env.VITE_STORY_KEY)
  return JSON.parse(settings)
}

export const setSettings = (settings) => {
  unsafeWindow.localStorage.setItem(import.meta.env.VITE_STORY_KEY, JSON.stringify(settings))
}

export const setLoading = (flag = true) => {
  if (flag) {
    if (!loadingInstance) {
      loadingInstance = vueThis.$loading({
        lock: true,
        text: 'Loading'
      })
    }
  } else {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }
}


export const getMonaco = (self = false) => {
  if (self) {
    return monaco
  } else {
    return unsafeWindow.monaco
  }
}

export const getContainerRef = () => {
  return zzUtil.findRef(vueThis, 'preview').$parent.$parent
}

export const copyToClipboard = async (textToCopy) => {
  Clipboard.copy(textToCopy);
}

export const findObjectByKey = (data, targetKey, targetValue) => {
  let result = null;
  let path = [];

  function search(obj, currentPath = []) {
    // 检查当前对象是否符合条件
    if (_.has(obj, targetKey)) {
      if (obj[targetKey] === targetValue) {
        result = obj;
        path = [...currentPath];
        return true;
      }
    }

    // 递归搜索对象属性
    return _.some(_.omitBy(obj,(v,k) => k.startsWith('__')), (value, key) => {
      const newPath = [...currentPath, key];
      
      if (_.isObject(value)) {
        return search(value, newPath);
      }
      if (_.isArray(value)) {
        return _.some(value, (item, index) => search(item, [...newPath, index]));
      }
      return false;
    });
  }

  search(data);
  return result ? { object: result, path } : null;
}

export function removeTemplateTags(code) {
  const lines = code.split('\n');
  if (lines.length <= 2) {
    return '';
  }
  return lines.slice(1, -1).join('\n');
}

export function getCookie(name) {
  const cookies = new URLSearchParams(document.cookie.replaceAll('; ', '&'));
  return cookies.get(name);
}


