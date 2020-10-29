var ts = require("typescript");

function getSymbolType(type) {
  if (type && type.symbol && type.symbol.name) {
    return type.symbol.name;
  }
  return null;
}
function getLiteralType(type) {
  if (
    type &&
    type.literalType &&
    type.literalType.symbol &&
    type.literalType.symbol.name
  ) {
    return type.literalType.symbol.name;
  }
  if (typeof type.value === "string" || type.intrinsicName === "string")
    return "String";
}
module.exports.getType = type => {
  return getSymbolType(type) || getLiteralType(type) || null;
};

module.exports.constructSafeCall = (node, visitor, context, newIdentifier) => {
  const methodName = node.expression.name.getText();
  if (methodName === "call") {
    return node;
  }
  const callArgs = ts.visitNodes(node.arguments, visitor);
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

module.exports.dontTransform = node => {
  if (ts.isSourceFile(node) && node.fileName.indexOf("dont_transform")!==-1) {
    return true;
  }
  let fullText = "";
  let comments;
  try {
    fullText = node.getFullText();
    comments = ts.getLeadingCommentRanges(fullText, 0);
  } catch (e) {}

  if (!comments) {
    return false;
  }
  return comments.some(comment => {
    const commentText = fullText.slice(comment.pos, comment.end);
    return commentText.indexOf("@ts-dont-transform") !== -1;
  });
};
