import Taro, { useState, Config } from '@tarojs/taro'
import { View, Text, Textarea, Button } from '@tarojs/components'
import FeedbackData from './inter.d'
import Star from  './components/star'
import UploadImg from '@/components/upload_img'
import msg, { showBackModal } from '@/utils/msg'
import userGetFeedbackAction from './api'
import { copyWechat, callPhone } from '@/utils/index'
import './index.scss'

export default function Feedback() {
  // 微信号
  const [wechat, setWechat] = useState<string>('xyrz3205')
  // 提交表单数据
  const [postData, setPostData] = useState<FeedbackData>({
    note: '',
    img: '',
    type: -1,
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
    newPostData.type = i + 1
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
    if (!postData.note) {
      msg('请填写反馈内容')
      return false
    }
    if(postData.type < 0){
      msg('请选择评价等级')
      return false
    }
    userGetFeedbackAction(postData).then(res =>{
      if(res.code == 0){
        showBackModal(res.message)
      }else{
        msg(res.message)
      }
    })
  }

  return (
      <View className='feedback-box'>
          <View className="feedback-wechat">
        <View className="feedback-introduce">低版本数据丢失或错误以及其他问题可添加客服微信：<Text onClick={() => callPhone(wechat)}>{wechat}</Text></View>
            <Text className="click-copy" onClick={() => copyWechat(wechat)}>点击复制</Text>
          </View>

          <View className="feedback-item">
            <View className="feedback-item-title">请留下你的意见或建议</View>
            <Textarea className="feedback-content-textarea" maxlength={400} placeholder="如果反馈意见被采纳，平台将赠送您2~10个鱼泡网积分" value={postData.note} onInput={e => handleTextarea(e)} />
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

Feedback.config = {
  navigationBarTitleText: '意见反馈'
} as Config
