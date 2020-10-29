import "./src/nativeFunctions/nativeFunctions.js"

import Compiler from "./src/compiler";
import { SomeClass } from "./src/SomeClass.dont_transform";

declare var native;

(function () {


// comment !
//@ts-dont-transform
// do not transform this node
  console.log(
    "check array filter (ts-dont-transform) ",
    [1, 2, 3].filter((a) => a)
  );

  console.log(
    "check Node.childNodes ",
    document.querySelector("body").childNodes
  );
  console.log(
    "check Node.hasChildNodes ",
    document.querySelector("body").hasChildNodes()
  );
  const node = document.querySelectorAll('li')[1];
  console.log(
    "check Node.childNodes 2 ",
    node.childNodes
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
   console.log(arr3.filter(a =>a !=="b").join('---'));
   console.log(
    "testing chained literal array calls",
    ["item1", "itemToFilter", "item2"]
      .filter(item => item !== "itemToFilter")
      .join()
  );
  const arr4 =   ["item1", "itemToFilter", "item2"];
  console.log(
    "testing chained array calls",
    arr4
      .filter(item => item !== "itemToFilter")
      .join()
  );
  arr4.forEach(item=>{
    console.log('check functions as params:',[1,2,3,4].filter(x=>x>1))
  });
  const obj = {
    test: 1,
    test2:2 ,
    test3: 3
  }
  console.log('object keys join', Object.keys(obj).join())

  const someClass = new SomeClass(4);
  console.log(someClass.getNumbers());
  // console.log('set listeners')
  // window.addEventListener("mousemove", function (e) {
  //   console.log('app.ts mousemove event',e)
  // });
})();
