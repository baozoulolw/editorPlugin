import { unsafeWindow } from "$";
import { init } from "./core/editor";
import { setLoading } from "./utils";
import { initPage } from "./pages/init";
import { initSettings } from "./core/editor";
import './style.css'
import 'virtual:uno.css'

if (unsafeWindow.location.hash.startsWith('#/widgetPage')) {
  while(!unsafeWindow.vueThis){
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  setLoading()
  initSettings()
  unsafeWindow.require(["vs/editor/editor.main"], monaco => init(monaco))
  initPage()
}
