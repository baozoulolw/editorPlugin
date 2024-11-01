import { INITIAL, Registry, parseRawGrammar, StackElement } from 'vscode-textmate';
import { createOnigScanner, createOnigString, loadWASM } from 'vscode-oniguruma';

const init = monaco => {

}
const loadRegistry = async() => {
  if (!isLoadedWASM) {
    await loadWASM(await this.loadVSCodeOnigurumWASM());
    isLoadedWASM = true;
  }
  const registry = new Registry({
    onigLib: Promise.resolve({
      createOnigScanner,
      createOnigString,
    }),
    loadGrammar: async (scopeName) => {
      const key = Object.keys(this.grammars).find((k) => this.grammars[k].scopeName === scopeName);
      const grammar = this.grammars[key as keyof typeof this.grammars];
      if (grammar) {
        const res = await http(`${grammar.tm}`);
        const type = grammar.tm.substring(grammar.tm.lastIndexOf('.') + 1);
        return parseRawGrammar(res, `example.${type}`);
      }
      return Promise.resolve(null);
    },
  });
}

public async loadVSCodeOnigurumWASM() {
  const response = await fetch(this.wasm);
  const contentType = response.headers.get('content-type');
  if (contentType === 'application/wasm') {
    return response;
  }
  // Using the response directly only works if the server sets the MIME type 'application/wasm'.
  // Otherwise, a TypeError is thrown when using the streaming compiler.
  // We therefore use the non-streaming compiler :(.
  return await response.arrayBuffer();
}
