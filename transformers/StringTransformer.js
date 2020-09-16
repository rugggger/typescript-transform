"use strict";

exports.__esModule = true;
var ts = require("typescript");
const nativeString = "nativeString";
var transformer = function (typechecker) {
  return function (context) {
    var visitor = function (node) {
      // change "sdfsdfsdf".toLocaleUpperCase() ->
      //
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isStringLiteral(node.expression.expression)
      ) {
        const methodName = node.expression.name.getText();
        const callArgs = node.arguments;
        const literalString = node.expression.expression.text;
        const args = [ts.createStringLiteral(literalString), ...callArgs];
        return ts.createCall(
          ts.createPropertyAccess(
            ts.createPropertyAccess(
              ts.createPropertyAccess(
                ts.createIdentifier(nativeString),
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

      // change s.toLocaleUpperCase() ->
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        // if has method
        (node.expression.name) &&
        // if the expression is a variable (not another expression)
        (node.expression.expression.text) &&
        // and it evaluates to string
        typechecker.getTypeAtLocation(node.expression.expression)
          .intrinsicName === "string"
      ) {
        const methodName = node.expression.name.getText();
        const callArgs = node.arguments;
        const varName = node.expression.expression.text;

        return ts.createCall(
          ts.createPropertyAccess(
            ts.createPropertyAccess(
              ts.createPropertyAccess(
                ts.createIdentifier(nativeString),
                ts.createIdentifier("prototype")
              ),
              ts.createIdentifier(methodName)
            ),
            ts.createIdentifier("call")
          ),
          undefined,
          [
            ts.createIdentifier(varName),
            ...callArgs
          ]
        )
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
