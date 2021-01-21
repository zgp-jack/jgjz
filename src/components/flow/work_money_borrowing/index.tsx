import { View, Image, Block} from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import './index.scss'

export default function WorkMoneyBorrowing({ list, type}) {
  return (
    list.map(item=>(
      <Block key={item.id}>
        <View className="bokkeeping-list-container">
          <View className="bokkeeping-list-item">
            <View className="bokkeeping-list-left">
              <View className="bokkeeping-list-title">{item.worker_name}</View>
              <View className="bokkeeping-list-des">{type == 3 ? "工钱" : (type == 4 ? "借支" : "支出")}</View>
              {item.is_note && <View className="bokkeeping-list-remarks">备注：{item.note}</View>}
            </View>
            <View className="bokkeeping-list-right">
              <View className="bokkeeping-list-count">
                <View>¥{item.money}</View>
              </View>
              <Image src={`${IMGCDNURL}common/arrow-right.png`}></Image>
            </View>
          </View>
        </View>
      </Block>
    ))
    
  )
}
