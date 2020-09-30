console.log('overriding !')
String.prototype.toLocaleUpperCase = () => "haha string";
String.prototype.replace = () => "haha replace";
Date.prototype.now = () => "haha date now";
Array.prototype.filter = () => ["haha filter"];
Array.prototype.reduce = () => ["haha reduce"];
Array.prototype.map = () => ["haha map"];

const overrideSettings = {
  NodeFunctions: ["childNodes", "hasChildNodes"],
  constructors: {
    Date: "csDate",
    JSON: "csJSON",
    Array: "csArray",
    String: "csString",
    XMLHttpRequest: "csXHR"
  }
};

function initPureWindow() {
  // Create an iframe that contains untouched JS functions
  const newIframe = document.createElement("iframe");
  newIframe.id = "cs-native-frame";
  newIframe.src = "javascript:void(0)";
  newIframe.style.display = "none";

  document.body.appendChild(newIframe);
  window.CSNativeFrame = newIframe.contentWindow; // get ref to our iframe

  Object.keys(overrideSettings.constructors).forEach(
    key => (window[overrideSettings.constructors[key]] = CSNativeFrame[key])
  );
}

function extendDOMWithCSNativeFunctions() {
  overrideSettings.NodeFunctions.forEach(functionName => {
    const ref =
      Object.getOwnPropertyDescriptor(
        CSNativeFrame.Node.prototype,
        functionName
      ) || {};
    Object.defineProperty(Node.prototype, `cs_${functionName}`, ref);
  });
}

function init() {
  initPureWindow();
  extendDOMWithCSNativeFunctions();
}

init();
