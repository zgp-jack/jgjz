/*
 * @Author: jsxin
 * @Date: 2021-01-21 13:44:17
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 13:46:55
 * @Description: 常用助手函数
 */

/**
 * @name: objDeepCopy for jsxin
 * @params source: T 要被拷贝的对象
 * @return new source<T>
 * @description 对象深拷贝
*/
export function objDeepCopy(source: any): any {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  }
  return sourceCopy;
}