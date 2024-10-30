import { getSettings } from "../utils"
import { initCodeium } from "./codeium"

export const registerCopilot = async (monaco) => {
  const { copilot = 'codeium' } = getSettings()
  if(copilot === 'codeium') {
    initCodeium()
  }

}


export const copilots = [
  {name:'codeium',id:'codeium'}
]