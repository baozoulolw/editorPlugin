const awaitPageRender = async () => {
  let selector = '.design-container .header-box>span:nth-child(2)'
  let dom = document.querySelector(selector)
  while (!dom) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    dom = document.querySelector(selector)
  }
  return dom
}

import App from './App.vue'

const render = (el) => {
  new Vue({
    render: h => h(App)
  }).$mount('#self_dialog')
}

const renderHeader = async (dom) => {
  dom.className = dom.className + ' head-right'
  const app = document.createElement('div');
  app.setAttribute('id', 'self_dialog')
  dom.insertBefore(app, dom.firstChild);
  render(app)
}

export const initPage = async () => {
  const dom = await awaitPageRender()
  renderHeader(dom)
}
