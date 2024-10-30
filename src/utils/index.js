import { unsafeWindow } from "$"
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
