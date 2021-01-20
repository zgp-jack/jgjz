import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Textarea, Image, Button } from '@tarojs/components'
import FeedbackData from './inter.d'
import Star from  './components/star'
import UploadImg from '@/components/upload_img'
import { IMGCDNURL } from '@/config/index'
import starConfig from './components/star/config'
import './index.scss'

export default function Feedback() {
  // 微信号
  const [wechat, setWechat] = useState<string>('1535434634')
  // 提交表单数据
  const [postData, setPostData] = useState<FeedbackData>({
    note: '',
    img: '',
    type: starConfig.length - 1
  })

  // 输入意见反馈内容
  const handleTextarea = (e:any)=>{
    let val: string = e.detail.value;
    let newPostData: FeedbackData = {...postData}
    newPostData.note = val
    setPostData(newPostData);
  }
  
  // 用户点击✨
  const useTapStar = (i: number) => {
    let newPostData: FeedbackData = { ...postData }
    newPostData.type = i
    setPostData(newPostData);
  }

  // 用户上传图片
  const userChangeImgs = (str: string) => {
    let newPostData: FeedbackData = { ...postData }
    newPostData.img = str
    setPostData(newPostData);
  }

  // 用户提交数据
  const userPostFeedback = () => {
    console.log(postData)
  }

  return (
      <View className='feedback-box'>
          <View className="feedback-wechat">
            <Text className="feedback-introduce">为了提高沟通效率，建议您添加平台微信{wechat}</Text>
            <Text className="click-copy">点击复制</Text>
          </View>

          <View className="feedback-item">
            <View className="feedback-item-title">请留下你的意见或建议</View>
            <Textarea className="feedback-content-textarea" placeholder="如果反馈意见被采纳，平台将赠送您2~10个鱼泡网积分" value={postData.note} onInput={e => handleTextarea(e)} />
            <View className="feedback-item-title">上传图片</View>
            <View className="feedback-upimages-box">
              <UploadImg onUpload={userChangeImgs} />
            </View>

            <Star num={postData.type} onStar={(i: number) => useTapStar(i)} />

            <Button className="feedback-push-btn" onClick={() => userPostFeedback()}>提交</Button>
          </View>
      </View>
  )
}
