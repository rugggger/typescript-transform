
var ts = require("typescript");

module.exports.getType = type => {
  if (type && type.symbol && type.symbol.name) {
    return type.symbol.name;
  } else if (
    type &&
    type.literalType &&
    type.literalType.symbol &&
    type.literalType.symbol.name
  ) {
    return type.literalType.symbol.name;
  } else if (typeof type.value === "string" || type.intrinsicName === "string")
    return "String";

  return null;
};

module.exports.constructSafeCall = (node, visitor, context, newIdentifier) => {
  const methodName = node.expression.name.getText();
  const callArgs = ts.visitNode(node.arguments, visitor);
  const expression = ts.visitNode(node.expression.expression, visitor, context);

  return ts.createCall(
    ts.createPropertyAccess(
      ts.createPropertyAccess(
        ts.createPropertyAccess(
          ts.createIdentifier(newIdentifier),
          ts.createIdentifier("prototype")
        ),
        ts.createIdentifier(methodName)
      ),
      ts.createIdentifier("call")
    ),
    undefined,
    [expression, ...callArgs]
  );
};


module.exports.dontTransform = (node)=>{
  let fullText = "";
  let comments;
  try {
    node.getText();
    fullText = node.getFullText();
    comments = ts.getLeadingCommentRanges(fullText, 0);
  }
  catch(e){
  }

  if (!comments) {return false;}
  return comments.some(comment => {
    const commentText = fullText.slice(comment.pos, comment.end);
    return commentText.indexOf('@ts-dont-transform')!==-1
  });
  

}