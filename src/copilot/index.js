import { getSettings } from "../utils"
import { initCodeium } from "./codeium"
import { registerCompletion } from 'monacopilot';

export const registerCopilot = async (monaco, editor,language) => {
  const { copilot = '' } = getSettings()
  if (_.isEmpty(copilot)) return
  registerCompletion(monaco, editor, {
    trigger: 'onIdle',
    maxContextLines: 5000,
    allowFollowUpCompletions: true,
    technologies: ['dayjs', 'vue2.7', 'tailwindcss', 'element-ui', 'lodash','echarts','vant2'],
    language,
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