import { INITIAL, Registry, parseRawGrammar, StackElement } from 'vscode-textmate';
import { createOnigScanner, createOnigString, loadWASM } from 'vscode-oniguruma';

class LanguageProvider {
  monaco
  registry
  wasm
  disposes = []
  grammars
  constructor(config) {
    this.monaco = config.monaco
    this.wasm = config.wasm
    this.grammars = config.grammars
  }

  getRegistry() {
    return this.registry;
  }

  async loadRegistry() {
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
        const grammar = this.grammars[key];
        if (grammar) {
          const res = await http(`${grammar.tm}`);
          const type = grammar.tm.substring(grammar.tm.lastIndexOf('.') + 1);
          return parseRawGrammar(res, `example.${type}`);
        }
        return Promise.resolve(null);
      },
    });

    this.registry = registry;

    this.bindLanguage();
  }


}