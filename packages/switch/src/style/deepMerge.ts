/** 深度合并对象,并返回一个新对象
 * @param {object} target -目标对象
 * @param {object} source -源对象
 * @returns {object} 返回新对象
 */
export const myDeepMerge = (
  target: Record<any, any>,
  ...sources: Array<Record<any, any>>
): Record<any, any> => {
  // 避免修改原对象
  const output = JSON.parse(JSON.stringify(target));
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          // 目标和源的key都是对象，则深度合并，否则直接后者覆盖前者
          if (key in output && isObject(output[key])) {
            output[key] = myDeepMerge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        } else {
          output[key] = source[key];
        }
      });
    }
  }
  return output;
};
/**
 * 判断是否是纯对象
 * @param {any} value
 * @returns {boolean}
 */
const isObject = (value: any) => {
  return value && typeof value === 'object' && !Array.isArray(value);
};
