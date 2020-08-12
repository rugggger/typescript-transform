"use strict";

exports.__esModule = true;
var ts = require("typescript");
const arrayNative = "native.Array";
var transformer = function (context) {
  var visitor = function (node) {
    // new Array(1,2,3) => new native.Array(1,2,3)
    if (ts.isIdentifier(node) && 
    node.getText() === "Array") {
      return ts.createIdentifier(arrayNative);
    }
    // [1,2,3] => new native.Array(1,2,3)
    if (ts.isArrayLiteralExpression(node)) {
      return ts.createNew(
          ts.createIdentifier(arrayNative),
          undefined,
          node.elements
      )
    }

    return ts.visitEachChild(node, visitor, context);
  };
  return function (node) {
    return ts.visitNode(node, visitor);
  };
};

exports["default"] = transformer;
