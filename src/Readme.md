#### 页面构成
pages/[pagename]
index.tsx   项目页面结构、js逻辑
index.scss  项目的样式文件
inter.d.ts  页面所有的接口声明
api         当前页面的接口请求
components/ 页面独立组件
    ↑...

#### 页面注释
###### inter.d.ts
~~~
// 数据请求 返回数据类型
export interface ARTICLEAPIRESULT<T> {
  /** 数据列表 */
  content: T,
  /** 是否首页 */
  first: boolean,
  /** 是否最后一页 */
  last: boolean,
  /** 当前页列表数量 */
  size: number,
  /** 当前页码 */
  totalPages: number
}
~~~
###### function/mobx
~~~
/**  
  * @name: myfun fro axin
  * @params a: number b:number @default a: 1, b: 1
  * @return (a + b): number
  * @description 返回两个数字的合
 */
const myfun = (a: number = 1, b: number = 1):number => {}
~~~

#### 项目别名
'@/hooks': hooks存放地
'@/components': 项目公共组件
'@/config': config配置项
'@/store': mobx状态机
'@/images': 静态图片资源 
'@/models': 静态数据资源
'@/styles': 静态样式、公共样式资源
'@/utils': 项目函数地址、api、request、v...
'@/pages': 项目页面地址
'@/subpackage': 项目分包地址

