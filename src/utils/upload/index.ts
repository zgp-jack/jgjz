/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:36:30
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 15:03:01
 * @Description: 图片上传文件 所有的图片上传都是 使用该方法
 ! @rules: 1.funtion-name 小驼峰  2.正常情况下直接调用 uploadImgAction 
 */

import Taro from '@tarojs/taro'
import { UPLOADIMGURL } from '@/config/index'
import { UserInfo } from '@/config/store'
import ResultImage from './inter.d'

/**
 * @name: UploadImgAction for jsxin
 * @params url: string 图片上传的接口
 * @default url: string 全局接口统一上传
 * @return Promise<ResultImage>
 * @description 使用相册和拍照两种方式上传图片
*/
export default function uploadImgAction(url: string = UPLOADIMGURL): Promise<ResultImage> {
  return new Promise((resolve) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        appUploadImg(resolve, res, url)
      }
    })
  })
}

/**
 * @name: CameraAndAlbum for jsxin
 * @params url: string 图片上传的接口
 * @default url: string 全局接口统一上传
 * @return Promise<ResultImage>
 * @description 使用自己的UI样式操作文件上传 ActionSheet 然后判断点击的类型打开相应的上传操作 0 相机 1相册
*/
export function cameraAndAlbum(url: string = UPLOADIMGURL): Promise<ResultImage> {
  return new Promise((resolve) => {
    Taro.showActionSheet({
      itemList: ['拍照', '从相册中选择'],
    })
      .then(res => {
        let index = res.tapIndex
        Taro.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: index === 0 ? ['camera'] : ['album'],
          success: function (res) {
            appUploadImg(resolve, res, url)
          },
        })
      })
  })
}

/**
 * @name: AppUploadImg for jsxin
 * @params resolve: promise中成功的回调 res: 选择的图片资源 url: 上传的地址
 * @default url: string 全局接口统一上传
 * @return null
 * @description 将选择的图片资源提交到接口 并将返回给我们上传的数据回调到 调用 方法中
*/
function appUploadImg(resolve, res: any, url: string = UPLOADIMGURL) {
  const userInfo = Taro.getStorageSync(UserInfo)
  Taro.showLoading({ title: '图片上传中' })
  Taro.uploadFile({
    url: url,
    filePath: res.tempFilePaths[0],
    header: {
      userid: userInfo ? userInfo.userId : ''
    },
    name: 'file',
    success(response) {
      let mydata = JSON.parse(response.data)
      Taro.showToast({
        title: mydata.errmsg,
        icon: "none",
        duration: 2000,
      })
      if (mydata.errcode == "ok") {
        resolve(mydata)
      }
    },
    fail: function () {
      Taro.showToast({
        title: "网络错误，上传失败！",
        icon: "none",
        duration: 2000
      })
    },
    complete: function () {
      Taro.hideLoading()
    }
  })
}
