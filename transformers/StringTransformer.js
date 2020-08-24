"use strict";

exports.__esModule = true;
var ts = require("typescript");
const { isConditionalExpression } = require("typescript");
const stringNative = "native.String";
const overriddenProperties = ["toLocaleUpperCase"];
var transformer = function (typechecker) {
  return function (context) {
    var visitor = function (node) {
      if (ts.isSourceFile(node)) {
        return ts.visitEachChild(node, visitor, context);
      }
      if (ts.isPropertyAccessExpression(node)) {
        const type = typechecker.getTypeAtLocation(node.expression);
        if (type.intrinsicName === "string") {
          const stringVar = node.expression.getText();
          return ts.createPropertyAccess(
            ts.createNew(
              ts.createIdentifier(stringNative),
              undefined,
              [ts.createIdentifier(stringVar)]
            ),
            ts.createIdentifier("toLocaleUpperCase")
          )
          
        }
      }

    
      if (
        ts.isStringLiteral(node) &&
        !ts.isImportDeclaration(node.parent) && // dont change import from "react-js"
        !ts.isCallExpression(node.parent) // don't change console.log("test");
      ) {
        //  console.log('string literal', node.text);
        const text = node.getText().split('"').join("");
        if (text === "__contentsquare_frame") {
          return;
        }
        //if (text==="none") {return}

        // return ts.createNew(
        //   ts.createIdentifier(stringNative),
        //   undefined,
        //   [ts.createStringLiteral(text)]
        // )
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
