import { View, Text, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { SELECTD_PROPS } from '../../index.d'
import './index.scss'

export default function Selectd(props: SELECTD_PROPS) {
  const { selectd, deletePerson } = props
  return (
    <View className="selectd">
      <View className="selectd_right">
        <Text>已选择</Text>
        <Text>{selectd && selectd.length}个工友</Text>
      </View>
      <View className="selectd_left">
        {selectd && selectd.length && selectd.map(item=>(
          <View className="selected_left_box" key={item.id} onClick={() => deletePerson(item)}>
            <Text className="selected_left_text" >{item.name}</Text>
            <Image className="selected_left_img" src={`${IMGCDNURL}ws/delete.png`}></Image>
          </View>
        ))}
      </View>
    </View>
  )
}