import { View, Text, Image, Input } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { SEARCH_PROPS } from '../../index.d'
import './index.scss'

export default function TestComponent(props: SEARCH_PROPS) {
  const { addClick } = props
  return (
    <View className="search">
      {/* <View className="search_type1">
        <Text className="people_num">工友工30人</Text>
        <View className="add">
          <View className="add_botton">
            <Text>添加工友</Text>
          </View>
        </View>
      </View> */}
      <View className="search_type2">
        <View className="input_box">
          <Image className="input_box_img" src={`${IMGCDNURL}ws/search.png`} ></Image>
          <Input className="input_box_input" type="text" placeholder="请输入名字或者手机号码查询"></Input>
        </View>
        <View className="add">
          <View className="add_botton" onClick={()=>addClick()}>
            <Text>添加工友</Text>
          </View>
        </View>
      </View>
    </View>
  )
}