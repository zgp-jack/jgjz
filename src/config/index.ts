/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:00:19
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 20:12:24
 * @Description: 项目配置项文件、全局配置项
 ! @rules: 1.key 为全大写  2.注释在上方
 */

// * 测试站
export const DEVREQUESTURL: string = 'http://appjg.superinyang.com/api/'
// * 预发布
export const PREREQUESTURL: string = 'http://book.release.kkbbi.com/api/'
// * 正式站
export const PROREQUESTURL: string = 'https://app.cdmgkj.cn/api/'
// * 当前程序使用的请求地址
export const REQUESTURL: string = DEVREQUESTURL
// * 默认上传图片
export const UPLOADIMGURL: string = `https://newyupaomini.54xiaoshuo.com/index/upload/`
// * 阿里云CDN域名
export const ALIYUNCDN: string = 'http://jgjz.oss-cn-beijing.aliyuncs.com'
// * 阿里云小程序图片路径
export const ALIYUNCDNMINIIMG: string = '/new_mini/images/'
// * 阿里云CDN图片域名
export const IMGCDNURL: string = ALIYUNCDN + ALIYUNCDNMINIIMG
// * 公司默认客服电话
export const SERVERPHONE: string = '400-838-1888'
// * 小程序当前版本号
export const VERSION: string = '1.0.0'
// * 小程序token标识
export const MINITOKEN: string = 'ios'

