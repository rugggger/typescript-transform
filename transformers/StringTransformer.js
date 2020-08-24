"use strict";

exports.__esModule = true;
var ts = require("typescript");
const stringNative = "native.String";
var transformer = function (typechecker) {
  return function (context) {
    var visitor = function (node) {
      if (ts.isPropertyAccessExpression(node)) {
        const type = typechecker.getTypeAtLocation(node.expression);
        if (type.intrinsicName === "string") {
          const propertyIdentifier = node.name.getText();
          const stringVar = node.expression.getText();
          return ts.createPropertyAccess(
            ts.createNew(ts.createIdentifier(stringNative), undefined, [
              ts.createIdentifier(stringVar),
            ]),
            ts.createIdentifier(propertyIdentifier)
          );
        }
      }
      return ts.visitEachChild(node, visitor, context);
    };
    return function (node) {
      return ts.visitNode(node, visitor);
    };
  };
};

var transformerFactory = function (program) {
  const typeChecker = program.getTypeChecker();
  return transformer(typeChecker);
};
exports["default"] = transformerFactory;
