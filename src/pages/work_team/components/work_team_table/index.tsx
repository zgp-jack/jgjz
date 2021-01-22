
import { View, Image, Block } from '@tarojs/components'
import { PropsData } from './index.d'
import './index.scss'

export default function WorkCountDay({ types = [], index = 0, onChange }: PropsData) {
  return (
    <View className='record-work-head-table'>
      {types.map((item, Oindex) => (
        <Block key={item.id}>
          <View className={index == Oindex ? 'record-table-item record-work-checked' : 'record-table-item'} data-id={item.id} onClick={() => onChange(Oindex)}>{item.name}</View>
        </Block>
      ))}
    </View>
  )
}
