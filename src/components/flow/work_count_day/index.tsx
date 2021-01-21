
import { View, Image, Block } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { PropsData } from './idnex.d'
import './index.scss'

export default function WorkCountDay({ list, type }) {
  console.log("propslist", list)
  return (
      list.map(item=>(
        <Block key={item.id}>
          <View className="bokkeeping-list-container">
            <View className="bokkeeping-list-item">
              <View className="bokkeeping-list-left">
                <View className="bokkeeping-list-title">{item.worker_name}</View>
                <View className="bokkeeping-list-des">{type == 1 ? '工天': (type == 2 ? '工量': '')}</View>
                {item.is_note && <View className="bokkeeping-list-remarks">备注：{item.note}</View>}
              </View>
              <View className="bokkeeping-list-right">
                <View className="bokkeeping-list-count">
                  {type == 2 ? <View>{item.unit_num + item.unit}</View> : <View>上班：{item.work_time}个工</View>}
                  {item.overtime && <View>加班：{ item.overtime }小时</View>}
                </View>
                <Image src={`${IMGCDNURL}common/arrow-right.png`}></Image>
              </View>
            </View>
          </View>
        </Block>
      ))
  )
}