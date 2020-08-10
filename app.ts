import Compiler from "./src/compiler";
import { getPureWindow } from "./src/getPureWindow";

let n = getPureWindow();



  let source = `
  let c = new SomeClass('somevalue');
  let a = [3];
  let b = new Array(5,6);
  const two = 2;
  const four = 4;
  `;

  let compiler = new Compiler(source);
  //compiler.printTypescript('export class Icecream {flavor: string;}');
  //compiler.compileTransformer();

  console.log('check array filter ', [1,2,3].filter(a=>a))
  console.log('check Node.childNodes ', document.querySelector('body').childNodes)
