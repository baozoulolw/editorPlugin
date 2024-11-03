import { INITIAL, Registry, parseRawGrammar, StackElement } from 'vscode-textmate';
import { loadWASM, createOnigScanner, createOnigString, OnigScanner, OnigString } from 'vscode-oniguruma';
//import { loadWASM } from "onigasm";
let isLoadedWASM = false
class LanguageProvider {
  monaco
  registry
  wasm
  disposes = []
  grammars
  lib
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
      //await loadWASM(await this.loadVSCodeOnigurumWASM());
      //loadWASM('https://baozoulolw.oss-cn-chengdu.aliyuncs.com/codeSet/data/onigasm/onig.wasm')
      this.lib = loadWASM(await this.loadVSCodeOnigurumWASM()).then(() => {
        return {
          createOnigScanner(patterns) { return new OnigScanner(patterns); },
          createOnigString(s) { return new OnigString(s); }
        };
      });
      //await loadWASM(this.wasm);
      isLoadedWASM = true;
    }
    const registry = new Registry({
      onigLib: this.lib,
      loadGrammar: async (scopeName) => {
        const key = Object.keys(this.grammars).find((k) => this.grammars[k].scopeName === scopeName);
        const grammar = this.grammars[key];
        if (grammar) {
          const res = await (await fetch(grammar.tm)).text();
          console.log(res)
          const type = grammar.tm.substring(grammar.tm.lastIndexOf('.') + 1);
          return parseRawGrammar(res,'example.json');
        }
        return Promise.resolve(null);
      },
    });

    this.registry = registry;

    this.bindLanguage();
  }

  async loadVSCodeOnigurumWASM() {
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

  bindLanguage() {
    for (const [languageId] of Object.entries(this.grammars)) {
      const item = this.grammars[languageId];
      if (item.extra) {
        this.monaco.languages.register(item.extra);
      }
      const dispose = this.monaco.languages.onLanguage(languageId, async () => {
        await this.registerLanguage(languageId);
      });
      this.disposes.push(dispose);
    }
  }

  async registerLanguage(languageId) {
    const { tokensProvider, configuration } = await this.fetchLanguageInfo(languageId);

    if (configuration !== null) {
      this.monaco.languages.setLanguageConfiguration(languageId, configuration);
    }

    if (tokensProvider !== null) {
      this.monaco.languages.setTokensProvider(languageId, tokensProvider);
    }
  }

  async fetchLanguageInfo(languageId) {
    const [configuration, tokensProvider] = await Promise.all([
      this.getConfiguration(languageId),
      this.getTokensProvider(languageId),
    ]);

    return { configuration, tokensProvider };
  }

  // 获取语法配置JSON文件
  async getConfiguration(languageId) {
    const grammar = this.grammars[languageId];
    if (grammar.cfg) {
      const res = await (await fetch(grammar.cfg)).json();
      return res;
    }
    return Promise.resolve(null);
  }

  // 获取TextMate配置JSON文件
  async getTokensProvider(languageId) {
    const scopeName = this.getScopeNameFromLanguageId(languageId);
    const grammar = await this.registry.loadGrammar(scopeName);

    if (!grammar) return null;

    return {
      getInitialState() {
        return INITIAL;
      },
      tokenizeEncoded(line, state) {
        const tokenizeLineResult2 = grammar.tokenizeLine2(line, state);
        const { tokens, ruleStack: endState } = tokenizeLineResult2;
        return { tokens, endState };
      },
    };
  }
  getScopeNameFromLanguageId(languageId) {
    for (const [key, value] of Object.entries(this.grammars)) {
      if (key === languageId) {
        return value.scopeName;
      }
    }
    throw new Error(`can not find scopeName with languageId: ${languageId}`);
  }


}

export default LanguageProvider