import { unsafeWindow } from "$";
import { init } from "./core/editor";
import './style.css'
import 'virtual:uno.css'

if (unsafeWindow.location.hash.startsWith('#/widgetPage')) {
  unsafeWindow.require(["vs/editor/editor.main"], monaco => init(monaco))
}
