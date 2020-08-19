"use strict";

exports.__esModule = true;
var ts = require("typescript");
const { isConditionalExpression } = require("typescript");
const stringNative = "native.String";
var transformer = function (context) {
  var visitor = function (node) {

    // "some string" => new String("some string")
    if (ts.isStringLiteral(node) &&
       !ts.isImportDeclaration(node.parent) && // dont change import from "react-js"
       !ts.isCallExpression(node.parent)  // don't change console.log("test");
    ) {
         console.log('string literal', node.text);
         const text = node.getText().split('"').join('');
         if (text==="__contentsquare_frame") {return}
         //if (text==="none") {return}

        return ts.createNew(
          ts.createIdentifier(stringNative),
          undefined,
          [ts.createStringLiteral(text)]
        )
        
      }

    return ts.visitEachChild(node, visitor, context);
  };
  return function (node) {
    return ts.visitNode(node, visitor);
  };
};

exports["default"] = transformer;
