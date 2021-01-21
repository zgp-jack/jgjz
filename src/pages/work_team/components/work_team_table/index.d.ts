/*
 * @Author: jsxin
 * @Date: 2021-01-21 13:54:54
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 13:54:55
 * @Description: props定义文件
 */

 export interface TableItem {
   id: number,
   name: string
 }

 export interface PropsData{
   types: TableItem[]
   index: number,
   onChange: (index:number) => void
 }