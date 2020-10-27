console.log('loading tag in iframe');

console.log('IFRAME> check array filter ', [1,2,3].filter(a=>a))

console.log('IFRAME> check Node.childNodes ', window.parent.document.querySelector('body').childNodes);

let s = "asdasd";
console.log('IFRAME> check Date.now ', Date.now());
console.log('IFRAME> check String.toLocaleUpperCase ', "abcde".toLocaleUpperCase());
console.log('IFRAME> check String.toLocaleUpperCase ', s.toLocaleUpperCase());

window.parent.addEventListener("mousemove", function (e) {
    console.log('IFRAME> mousemove event',e)
  });