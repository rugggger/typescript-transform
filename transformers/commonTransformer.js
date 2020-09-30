"use strict";

exports.__esModule = true;
const ts = require("typescript");
const functionsToReplace = {
  Date: "csDate",
  JSON: "csJSON",
  XMLHttpRequest: "csXHR"
};

const transformer = function (context) {
  const visitor = function (node) {
    const parentExpression = node.parent && node.parent.expression;

    for (const funcName in functionsToReplace) {
      if (
        ts.isIdentifier(node) &&
        node.text === funcName &&
        parentExpression &&
        parentExpression.text !== "CSNativeFrame"
      ) {
        return ts.createIdentifier(functionsToReplace[funcName]);
      }
    }

    return ts.visitEachChild(node, visitor, context);
  };
  return function (node) {
    return ts.visitNode(node, visitor);
  };
};

exports["default"] = transformer;
