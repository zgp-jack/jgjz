import { View, Text, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import './index.scss'

export default function TestComponent() {
  return (
    <View className="selectd">
      <View className="selectd_right">
        <Text>已选择</Text>
        <Text>3个工友</Text>
      </View>
      <View className="selectd_left">
        {[1,2,3,4,5,6,7,8,9,10].map(item=>(
          <View className="selected_left_box" key={item}>
            <Text className="selected_left_text" >张三</Text>
            <Image className="selected_left_img" src={`${IMGCDNURL}ws/delete.png`} ></Image>
          </View>
        ))}
      </View>

    </View>
  )
}