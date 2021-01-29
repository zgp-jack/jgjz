
import { View, Block } from '@tarojs/components'
import { PropsData } from './index.d'
import './index.scss'

export default function WorkCountDay({ types = [], currentId = 1, onChange }: PropsData) {
  return (
    <View className='record-work-head-table'>
      {types.map((item, Oindex) => (
        <Block key={item.id}>
          <View className={currentId == Number(item.id) ? 'record-table-item record-work-checked' : 'record-table-item'} data-id={item.id} onClick={() => onChange(Oindex)}>{item.name}</View>
        </Block>
      ))}
    </View>
  )
}
