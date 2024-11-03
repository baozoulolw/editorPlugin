import { unsafeWindow } from "$";
import { init,injectMonacoLoader } from "./core/editor";
import { initShiki } from "./shiki";

if (unsafeWindow.location.hash.startsWith('#/widgetPage')) {
  //await injectMonacoLoader()
  unsafeWindow.require(["vs/editor/editor.main"], monaco => {
    initShiki(monaco)
    //init(monaco)
  })
}
