import * as ts from "typescript";


class Compiler {

    overriddenProperties = ['childNodes'];
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


      IFunctionTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
        return context => {
          const visit: ts.Visitor = node => {
         
            if (ts.isSourceFile(node)) {
              console.log('source statement !', node);
              const text = `
              // self invoked function begin
                (function(){
                  var Date = native.date;
                  ${node.getText()}
                })()
                // self invoked function end
                `
              ;
        
              return ts.createSourceFile(
                node.fileName,
                text,    
                node.languageVersion,
                true,
                3
              )
            }

            return ts.visitEachChild(node, child => visit(child), context);
          };
      
          return node => ts.visitNode(node, visit);
        };
      }
      propertyTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
        return context => {
          const visit: ts.Visitor = node => {

            if (ts.isPropertyAccessExpression(node) && 
             //this.overriddenProperties.includes(node.name)
            ts.isIdentifier(node.name) && 
            this.overriddenProperties.includes(node.name.getText())
            ) {
              console.log('property access ', node, ' and ', node.getText())
              return ts.createPropertyAccess(
                node.expression,
                ts.createIdentifier("cs_childNodes")
              )
              
             
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
    transformers: { before: [
      this.IFunctionTransformer(),
      this.numberTransformer(),
       this.propertyTransformer()] }
  });
  
  console.log(result.outputText)
      }
}

export default Compiler;