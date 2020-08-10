"use strict";
          
exports.__esModule = true;
var ts = require("typescript");
const overriddenProperties = ["childNodes"];
var transformer = function (context) {
  var visitor = function (node) {
    if (ts.isPropertyAccessExpression(node) && 
        ts.isIdentifier(node.name) && 
        overriddenProperties.includes(node.name.getText())
   ) {
     return ts.createPropertyAccess(
       node.expression,
       ts.createIdentifier(`cs_${node.name.getText()}`)
     )
   }

    return ts.visitEachChild(node, visitor, context);
  };
  return function (node) {
    return ts.visitNode(node, visitor);
  };
};

exports["default"] = transformer;
