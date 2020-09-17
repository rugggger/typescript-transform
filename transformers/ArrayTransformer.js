"use strict";

function getType(type) {
  if (type && type.symbol && type.symbol.name) {
    return type.symbol.name;
  } else if (
    type &&
    type.literalType &&
    type.literalType.symbol &&
    type.literalType.symbol.name
  ) {
    return type.literalType.symbol.name;
  }
  return null;
}
exports.__esModule = true;
const { ClassificationTypeNames } = require("typescript");
var ts = require("typescript");
const nativeArray = "nativeArray";
var transformer = function (typechecker) {
  return function (context) {
    var visitor = function (node) {
      // 1. First check: chained expression
      // if it's array.filter().join().map() then I want to change only the first part
      // meaning 
      // if property access is a call expression - ignore and dont change
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isCallExpression(node.expression.expression)

      ) {
        return ts.visitEachChild(node, visitor, context);
        
      }

      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression)
      ) {
        const type = typechecker.getTypeAtLocation(node.expression.expression);
        const typeNameS = getType(type);
        if (typeNameS === "Array") {
          const methodName = node.expression.name.getText();
          const callArgs = node.arguments;
          const identifier = node.expression.expression.getText();
          console.log("type ", typeNameS);
          return ts.createCall(
            ts.createPropertyAccess(
              ts.createPropertyAccess(
                ts.createPropertyAccess(
                  ts.createIdentifier(nativeArray),
                  ts.createIdentifier("prototype")
                ),
                ts.createIdentifier(methodName)
              ),
              ts.createIdentifier("call")
            ),
            undefined,
            [ts.createIdentifier(identifier), ...callArgs]
          );
        }
      }

      // literal
      // can remove it
      if (
        ts.isCallExpression(node) && false &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isArrayLiteralExpression(node.expression.expression)
      ) {
        const methodName = node.expression.name.getText();
        const callArgs = node.arguments;
        const literalArray = node.expression.expression.elements;
        const args = [ts.createArrayLiteral(literalArray), ...callArgs];
        return ts.createCall(
          ts.createPropertyAccess(
            ts.createPropertyAccess(
              ts.createPropertyAccess(
                ts.createIdentifier(nativeArray),
                ts.createIdentifier("prototype")
              ),
              ts.createIdentifier(methodName)
            ),
            ts.createIdentifier("call")
          ),
          undefined,
          args
        );
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
