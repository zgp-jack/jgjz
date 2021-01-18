/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:43:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 14:48:43
 * @Description: 图片上传的接口文件
 */

// 图片上传提交接口后 返回的数据类型
export default interface ResultImage {
  /** 接口状态码 */
  errcode: string,
  /** 接口提示信息 */
  errmsg: string,
  /** 需要提交的图片路径-无域名 */
  url: string,
  /** 直接展示到客户端的图片路径 */
  httpurl: string,
}
