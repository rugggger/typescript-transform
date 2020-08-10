export function getPureWindow() {
    // Create an iframe we can retrieve
    var iframName = "__contentsquare_frame";
    var iframe:any = null;
    (iframe = document.createElement("iframe")).name = iframName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var native = window.frames[iframName]; // get ref to our iframe
    window["native"] = native;
    console.log("created native ", native);
    return native;
  }
  