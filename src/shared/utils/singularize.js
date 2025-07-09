export const singularize = (str) =>
  str.endsWith("s") ? str.slice(0, -1) : str;
