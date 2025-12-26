import { getSettings } from "../utils"
import { initCodeium } from "./codeium"
import { registerCompletion } from 'monacopilot';

export const registerCopilot = async (monaco, editor) => {
  const { copilot = '' } = getSettings()
  if (_.isEmpty(copilot)) return
  registerCompletion(unsafeWindow.monaco, editor, {
    trigger: 'onTyping',
    maxContextLines: 5000,
    allowFollowUpCompletions: true,
    technologies: ['dayjs', 'vue2.7', 'tailwindcss', 'element-ui', 'lodash',],
    language: option.language === 'css' ? 'sass' : option.language,
    // Your API endpoint for handling completion requests
    endpoint: `http://localhost:7969/code-completion${copilot}`,
  })
}


export const copilots = [
  { name: 'deepseek-FIM', id: '/fim/deepSeek' },
  { name: 'deepseek-chat', id: '/com/deepSeek' },
  { name: 'mistral', id: '/mistral' },
  { name: '不使用', id: '' },
]