"use strict";

const getType = require('./getType');

function typeIsArray(type) {
  return getType(type) === 'Array'
}
function constructSafeCall(node,visitor,context){
  const methodName = node.expression.name.getText();
  const callArgs = 
   ts.visitNode(node.arguments, visitor);
  const expression = 
  ts.visitNode(node.expression.expression, visitor, context);

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
    [expression, ...callArgs]
  );
}
exports.__esModule = true;
const { ClassificationTypeNames } = require("typescript");
var ts = require("typescript");
const nativeArray = "csArray";
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
        const type = typechecker.getTypeAtLocation(node.expression.expression);
        if (typeIsArray(type)) {
          return constructSafeCall(node,visitor,context);
          const h = 'h'
        }
      }
        
      if (
        ts.isCallExpression(node)  &&
        ts.isPropertyAccessExpression(node.expression)
      ) {
        const type = typechecker.getTypeAtLocation(node.expression.expression);
        if (typeIsArray(type)) {
          return constructSafeCall(node,visitor,context);
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
