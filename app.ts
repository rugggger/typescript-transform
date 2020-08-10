import Compiler from "./src/compiler";
import { getPureWindow, extendDOMWithCSNativeFunctions } from "./src/getPureWindow";

let n = getPureWindow();
extendDOMWithCSNativeFunctions();


  let source = `
  console.log(
    document.querySelector('body').childNodes);
let a = document.querySelector('body');
console.log(a.childNodes)


  `;

  let compiler = new Compiler(source);
  //compiler.printTypescript('export class Icecream {flavor: string;}');
  compiler.compileTransformer();

  console.log('check array filter ', [1,2,3].filter(a=>a))
  console.log('check Node.childNodes ', document.querySelector('body').childNodes)
