
import { View, Image } from '@tarojs/components'
import './index.scss'

export default function WorkCountDay() {
  return (
    <View className="bokkeeping-list-item">
      <View className="bokkeeping-list-left">
        <View className="bokkeeping-list-title">工钱</View>
        <View className="bokkeeping-list-des">班组长：李四</View>
        <View className="bokkeeping-list-remarks">我是你爹</View>
      </View>
      <View className="bokkeeping-list-right">
        <View className="bokkeeping-list-count">
          <View>上班：1个工</View>
          <View>加班：2小时</View>
        </View>
        <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png"></Image>
      </View>
    </View>
  )
}