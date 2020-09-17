import Compiler from "./src/compiler";
import {
  getPureWindow,
  extendDOMWithCSNativeFunctions,
} from "./src/getPureWindow";

let n = getPureWindow();
extendDOMWithCSNativeFunctions();

declare var native;

(function () {
  var Date = native.Date;

  let source = `
  const s = "this string doesnt need to change";
 // console.log(s);
  let a = "this string needs a pure constructor";
  console.log(a.toUpperCase());
  `;

  //let compiler = new Compiler(source);
  //compiler.compileTransformer();

  console.log(
    "check array filter ",
    [1, 2, 3].filter((a) => a)
  );

  console.log(
    "check Node.childNodes ",
    document.querySelector("body").childNodes
  );

  let s = "asdasd";
  console.log("check Date.now ", Date.now());
  console.log("check String.toLocaleUpperCase ", "abcde".toLocaleUpperCase());
  console.log("check String.toLocaleUpperCase ", s.toLocaleUpperCase());
  console.log("check String.substr ", "a*bc*de".substr(2,3));
  console.log("check s.substr ", s.substr(2,3));
  console.log("check s.substr ", s.substr(2,3).split(""));
  interface iY {
    name: string
  }
  let arrTyped: iY[] = [
    {name:"yar"},  {name:"se"}
  ]

   const arr = [1,2,300,4000];
   let arr2 = [1,2,300]
  console.log(arrTyped.filter(a => a.name === "yar"));
  console.log(arr.filter(a => a> 100));
  console.log(arr2.filter(a => a> 100));
   console.log([1000,2000,3].filter(a => a> 100));

   let arr3 = ["i","t","w","o","r","k","s"]
   console.log(arr3.filter(a =>a !=="b").map(a=> `(${a})`).join('---'));
  // console.log('set listeners')
  // window.addEventListener("mousemove", function (e) {
  //   console.log('app.ts mousemove event',e)
  // });
})();
