"use strict";

exports.__esModule = true;
var ts = require("typescript");
const { isConditionalExpression } = require("typescript");
const stringNative = "native.String";
const overriddenProperties = ["toLocaleUpperCase"];
var transformer = function(typechecker) {

  // console.log('type checker ', typechecker);
  // console.log('node count ', typechecker.getNodeCount());
  // console.log('getIdentifierCount ', typechecker.getIdentifierCount());
  return function (context) {
  //console.log('initialising transformer ', context);
 // console.log('with typechecker ', typechecker);
  var visitor = function (node) {
     if (ts.isSourceFile(node)) {
       return ts.visitEachChild(node, visitor, context);
     }

     const typeCheck = typechecker.getTypeAtLocation(node);
     let type;
     if (typeCheck && typeCheck.intrinsicName) {
       type = typeCheck.intrinsicName;
       console.log('type', type);
     }
    //console.log('checking node ', node.text);
    //console.log('checking node ', node);
   
    //console.log('node type check',typechecker.getTypeAtLocation(node));

    if (ts.isPropertyAccessExpression(node) ){

   //   console.log((typechecker.getTypeAtLocation(node.expression)), );

      // console.log('type arguments ', node.typeArguments);
      // const [type] = node.typeArguments;
      // const [argument] = node.arguments;
      // const fn = ts.createIdentifier('__rtti__generate');
      // const typeName = type.getText();
      // const typeSource = getDescriptor(type, typeChecker);
    }
   // console.log('string node visiting...');
    // "some string" => new String("some string")
    if (ts.isStringLiteral(node) &&
       !ts.isImportDeclaration(node.parent) && // dont change import from "react-js"
       !ts.isCallExpression(node.parent)  // don't change console.log("test");
    ) {
       //  console.log('string literal', node.text);
         const text = node.getText().split('"').join('');
         if (text==="__contentsquare_frame") {return}
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
}

var transformerFactory = function(program) {
  const typeChecker = program.getTypeChecker();
  return transformer(typeChecker);
}
exports["default"] = transformerFactory;
