/*
 * @Author: jsxin
 * @Date: 2021-01-21 13:54:54
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-29 20:54:05
 * @Description: props定义文件
 */

 export interface TableItem {
   id: string,
   name: string
 }

 export interface PropsData{
   types: TableItem[]
   currentId: number,
   onChange: (index:number) => void
 }