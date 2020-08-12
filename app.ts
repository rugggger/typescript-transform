import Compiler from "./src/compiler";
import { getPureWindow, extendDOMWithCSNativeFunctions } from "./src/getPureWindow";

let n = getPureWindow();
extendDOMWithCSNativeFunctions();


  (function(){
    var Date = native.Date;

  let source = ``;

  let compiler = new Compiler(source);
  //compiler.compileTransformer();

  console.log('check array filter ', [1,2,3].filter(a=>a))
  console.log('check Node.childNodes ', document.querySelector('body').childNodes);
  console.log('check Date.now ', Date.now());


  })()
