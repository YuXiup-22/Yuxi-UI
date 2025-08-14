export type stringifield<T> = {
  [k in keyof T]: string;
};
export const tokenToCSSVar = <T extends Record<string, any>>(
  token: T,
  prefixCls: string,
) => {
  const themeObject: Record<string, string | number> = {};
  // 避免number类型期望，都转为string
  const tokenVarMap = {} as stringifield<T>;

  for (const key in token) {
    if (Object.prototype.hasOwnProperty.call(token, key)) {
      const value = token[key];
      const kebabKey = camelToKebab(key);
      const varName = `--${prefixCls}-${kebabKey}`;
      tokenVarMap[key] = `var(${varName})`;
      themeObject[varName] = value;
    }
  }
  return { themeObject, tokenVarMap };
};
const camelToKebab = (val: string) => {
  return val
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Handle consecutive capitals (like "HTTPRequest")
    .toLowerCase();
};
