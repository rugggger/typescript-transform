
// This function creates an iframe which will server as our reference 
// for pure native js functions
// We will save the reference on the main window and access it by window.native
module.exports.getPureWindow = function() {
    // Create an iframe we can retrieve
    var iframName = "__contentsquare_frame";
    const newIframe = document.createElement("iframe");
    newIframe.name = iframName;
    newIframe.style.display = "none";
    document.body.appendChild(newIframe);
    var native = window.frames[iframName]; // get ref to our iframe
    window["native"] = native;
    window["nativeArray"] = native.Array;
    window["nativeString"] = native.String;
    return native;
  }
  
  // in this function we are extending some DOM objects whose methods may have been overridden
  // with pure versions of these methods.
  // we prefix our pure methods with 'cs_'
  // and the TypeScript Transformer will replace all occurences of the methods 
  // we specifiy with our pure versions
 module.exports.extendDOMWithCSNativeFunctions = function(){
    Object.defineProperty(Node.prototype, "cs_childNodes", 
    Object.getOwnPropertyDescriptor(native.Node.prototype, "childNodes")
    );
    
  }