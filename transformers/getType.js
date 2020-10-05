

module.exports = (type) => {
    if (type && type.symbol && type.symbol.name) {
        return type.symbol.name;
      } else if (
        type &&
        type.literalType &&
        type.literalType.symbol &&
        type.literalType.symbol.name
      ) {
        return type.literalType.symbol.name;
      } else if (
        (typeof type.value === 'string') ||
        ( type.intrinsicName === 'string')
      ) return 'String'
    
      return null;

}