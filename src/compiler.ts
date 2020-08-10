import * as ts from "typescript";


class Compiler {

    constructor(private source:string){}

    compile(){
        let result = ts.transpileModule(this.source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
        console.log(result);
    }

    printTypescript(text: string) {
        let sourceFile = ts.createSourceFile(
          'afilename.ts', text,
          ts.ScriptTarget.ES2015,
          false,
        );
        console.log(JSON.stringify(sourceFile.statements, null, '\t'));
      }


    arrayTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
        return context => {
          const visit: ts.Visitor = node => {
             // console.log('check node ', node);
            if (ts.isExpressionStatement(node)) {
                console.log('EXPRESSION');
            }  
            // new Array(3,4,5)
            if (ts.isNewExpression(node)) {
                console.log('NEW EXPRESSION ', node);
                console.log('is iden ', ts.isIdentifier(node.expression))
                const clone = ts.getMutableClone(node);
               // clone.typeArguments
                const s = ts.createExpressionStatement(node)
                return node;
            //    const classNode = ts.createClassExpression(
            //        undefined, 'foo', undefined, undefined,[]);
            //     return classNode;
              

            
              
               
            }
            if (ts.isIdentifier(node)) {
                console.log('identifier is ',node);
                return node;
            }
            if (ts.isVariableDeclaration(node)) {
                console.log('variable declration');
                if (node.initializer && ts.isExpressionStatement(node.initializer)) {
                    console.log('expression is ', node.initializer);
                }
                if (node.initializer && ts.isVariableStatement(node.initializer)) {
                    console.log('expression is ', node.initializer);
                }

            };
          
            if (ts.isArrayTypeNode(node)) {
                console.log('type ');
                console.log('parent ', node.parent)
            } 
           
            if (ts.isArrayLiteralExpression(node) 
            
            ) {
                const test = ts.createNew(
                    ts.createIdentifier("Array"),
                    undefined,
                    node.elements
                );
                
               
             // node.expression = "native.Array";
                console.log('isArrayLiteralExpression');

               
                return ts.updateArrayLiteral(
                    node,
                    [...node.elements, ts.createLiteral("4")]
                )
                //console.log(node.expression.getText());
                // return ts.updateClassExpression(
                //     node,
                //     undefined,
                //     'Class',
                //     undefined,
                //     undefined,
                //     node._memberExpressionBrand
                // )
         
                
                
            }  
            if (ts.isArrayLiteralExpression(node)) {
                console.log('array is ', node);
                
              return node;
            }
            return ts.visitEachChild(node, child => visit(child), context);
          };
      
          return node => ts.visitNode(node, visit);
        };
      }
    numberTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
        return context => {
          const visit: ts.Visitor = node => {
            if (ts.isNumericLiteral(node)) {//console.log('literal ',node);
              return ts.createStringLiteral(node.text);
            }
            return ts.visitEachChild(node, child => visit(child), context);
          };
      
          return node => ts.visitNode(node, visit);
        };
      }

      compileTransformer(){


let result = ts.transpileModule(this.source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
    transformers: { before: [this.numberTransformer(), this.arrayTransformer()] }
  });
  
  console.log(result.outputText)
      }
}

export default Compiler;