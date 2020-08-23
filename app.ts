import Compiler from "./src/compiler";
import { getPureWindow, extendDOMWithCSNativeFunctions } from "./src/getPureWindow";

let n = getPureWindow();
extendDOMWithCSNativeFunctions();


  (function(){
    var Date = native.Date;

  let source = `
  const s = "this string doesnt need to change";
 // console.log(s);
  let a = "this string needs a pure constructor";
  console.log(a.toUpperCase());
  `;

  let compiler = new Compiler(source);
  compiler.compileTransformer();

  console.log('check array filter ', [1,2,3].filter(a=>a))
  console.log('check Node.childNodes ', document.querySelector('body').childNodes);
  console.log('check Date.now ', Date.now());
  console.log('check String.toLocaleUpperCase ', "abcde".toLocaleUpperCase());
  console.log('check String.toLocaleUpperCase ', new native.String("lkjlkj").toLocaleUpperCase());
  console.log('check String.toLocaleUpperCase ', native.String.prototype.toLocaleUpperCase());

  })()
