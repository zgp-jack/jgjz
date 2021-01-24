/*
 * @Author: jsxin
 * @Date: 2021-01-24 09:28:55
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 09:33:05
 * @Description: 个人记工记账流水修改
 */

export default interface PersonlBusinessDetailProps {
  /** 流水id */ 
  id: string,
  /** 类型 type(1)--支出  type(2)--借支  type(3)--工天   type(4)--工钱  type(5)--工量 */
  type: string,
}