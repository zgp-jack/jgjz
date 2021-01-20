/*
 * @Author: jsxin
 * @Date: 2021-01-20 10:55:08
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 11:14:07
 * @Description: 图片上传接口
 */

// 图片上传 保存数据 http+local
export default interface ImgsState {
  /** 提交数据地址 */ 
  url: string,
  /** 网络图片地址 */ 
  httpurl: string
}

// 上传图片组件参数
export interface UploadImgProps {
  /** 上传图片最大数量  */ 
  maxLength?: number
  /** 默认图片数据 */ 
  imglist?: ImgsState[],
  /** 用户修改/上传图片 */
  onUpload: (str: string) => void
}