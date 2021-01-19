import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Textarea, Image, Button } from '@tarojs/components'
import './index.scss'

export default function Feedback() {

  // 意见
  const [textarea, setTextarea] = useState<string>('');
  const handleTextarea = (e:any)=>{
    let val: string = e.detail.value;
    setTextarea(val);
  }
  return (
      <View className='feedback-box'>
          <View className="feedback-wechat">
            <Text className="feedback-introduce">为了提高沟通效率，建议您添加平台微信14928255610</Text>
            <Text className="click-copy">点击复制</Text>
          </View>
          <View className="feedback-item">
            <View className="feedback-item-title">请留下你的意见或建议</View>
            <Textarea className="feedback-content-textarea" placeholder="如果反馈意见被采纳，平台将赠送您2~10个鱼泡网积分" value={textarea} maxlength={100} onInput={e => handleTextarea(e)} />
            <View className="feedback-item-title">上传图片</View>
            <View className="feedback-upimages-box">
                <Image className="feedback-upimg" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 
            </View>
            <View className="identity-tag-deail">好评</View>
            <Button className="feedback-push-btn">提交</Button>
          </View>
      </View>
  )
}
