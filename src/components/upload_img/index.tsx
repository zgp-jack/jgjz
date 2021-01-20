import { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import uploadImgAction from '@/utils/upload'
import ImgsState, { UploadImgProps } from './inter.d'
import msg from '@/utils/msg'
import './index.scss'

export default function UploadImg({
  maxLength = 4,
  imglist = [],
  onUpload = () => {}
}: UploadImgProps) {

  // 图片数据保存 
  const [imgs, setImgs] = useState<ImgsState[]>(imglist)

  // 用户上传图片
  const userUplodImg = () => {
    uploadImgAction().then(res => {
      if(res.errcode == 'ok'){
        let imgData: ImgsState = {
          url: res.url,
          httpurl: res.httpurl
        }
        // 设置组件数据
        let _imgs: ImgsState[] = [...imgs, imgData]
        setImgs(_imgs)
        // 更新调用者数据
        let imgStr: string = _imgs.map(item => item.url).join('')
        onUpload(imgStr)
      }else{
        msg(res.errmsg)
      }
    })
  }

  // 用户删除图片
  const userDeleteImg = (i: number) => {
    let _imgs = [...imgs]
    _imgs.splice(i, 1)
    setImgs(_imgs)
    // 更新调用者数据
    let imgStr: string = _imgs.map(item => item.url).join(',')
    onUpload(imgStr)
  }

  return (
    <View className='upload-img-container clearfix'>

      {imgs.map((item,index) => (
        <View className='upload-img-item' key={item.url}>
          <Image className='upload-img' src={item.httpurl}></Image>
          <View className='upload-img-remove' onClick={() => userDeleteImg(index)}></View>
        </View>
      ))}

      {imgs.length < maxLength &&
      <View className='upload-img-item' onClick={() => userUplodImg()}>
        <Image className='upload-img' src={`${IMGCDNURL}common/upload-img.png`}></Image>
      </View>}

    </View>
  )
}