"use strict";

const transformerUtils = require("./transformerUtils");

function typeIsArray(type) {
  return transformerUtils.getType(type) === 'Array'
}

exports.__esModule = true;
const { ClassificationTypeNames } = require("typescript");
var ts = require("typescript");
const nativeArray = "csArray";
var transformer = function (typechecker) {
  return function (context) {
    var visitor = function (node) {
      if (ts.isSourceFile(node)) return ts.visitEachChild(node, visitor, context);
    
      if (transformerUtils.dontTransform(node)) {
        return node;
      }
  
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression)
      ) {
        const type = typechecker.getTypeAtLocation(node.expression.expression);
        if (typeIsArray(type)) {
          return transformerUtils.constructSafeCall(node,visitor,context,nativeArray);
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
