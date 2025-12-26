let worker
export const runEslint = async (monaco) => {
  let baseUrl = `${import.meta.env.VITE_ALI_OSS}/workers/`
  const text = await (await fetch(`${baseUrl}eslint.worker.js`)).text()
  const blob = new Blob([text], { type: 'application/javascript;module' });
  const workerUrl = URL.createObjectURL(blob);
  worker = new Worker(workerUrl, { type: 'classic' })
  worker.onmessage = function (event) {
    const { markers, version } = event.data;
    const editor = monaco.editor.getEditors()[0]
    const model = editor.getModel();
    // 判断当前model的versionId与请求时是否一致
    if (model && model.getVersionId() === version) {
      monaco.editor.setModelMarkers(model, 'ESLint', markers);
    }
  };
}

export const registerEslint = editor => {
  const model = editor.getModel();
  const lint = () => {
    worker.postMessage({
      code: model.getValue(),
      version: model.getVersionId(),
    });
  }
  model.onDidChangeContent(_.debounce(lint, 500));
  lint()
}