"use strict";
const transformerUtils = require("./transformerUtils");

exports.__esModule = true;
var ts = require("typescript");
const safeReferences = {
  Array: "csArray",
  String: "csString"
};
const transformer = typechecker => {
  return context => {
    const visitor = node => {
      if (transformerUtils.dontTransform(node)) {
        return node;
      }

      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression)
      ) {
        const type = typechecker.getTypeAtLocation(node.expression.expression);
        const typeName = transformerUtils.getType(type);
        if (safeReferences[typeName]) {
          return transformerUtils.constructSafeCall(
            node,
            visitor,
            context,
            safeReferences[typeName]
          );
        }
      }

      if (
        ts.isIdentifier(node) &&
        Object.keys(safeReferences).includes(node.getText())
      ) {
        return ts.createIdentifier(safeReferences[node.getText()]);
      }

      return ts.visitEachChild(node, visitor, context);
    };
    return node => {
      return ts.visitNode(node, visitor);
    };
  };
};

var transformerFactory = program => {
  const typeChecker = program.getTypeChecker();
  return transformer(typeChecker);
};
exports["default"] = transformerFactory;
