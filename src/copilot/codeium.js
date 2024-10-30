import { unsafeWindow } from "$"
import { registerCodeiumProvider } from "@live-codes/monaco-codeium-provider";

export const initCodeium = async () => {
  unsafeWindow.copilotDispose = registerCodeiumProvider(
    unsafeWindow.monaco,
    // optional config
    {
      languageServer: "https://web-backend.codeium.com",
      apiKey: "d49954eb-cfba-4992-980f-d8fb37f0e942",
      onAutocomplete: (acceptedText) => {
        // runs on completion
        //console.log(acceptedText);
      },
      getEditors: () => {
        // return an array of other monaco editors that you want their content to be used for AI context
        // e.g. if the current editor is for JS, return HTML and CSS editors
        return [];
      },
    }
  );
}