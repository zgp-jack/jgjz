import Taro, { View, Image, Block} from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { PropsData } from './idnex.d'
import './index.scss'

export default function WorkMoneyBorrowing({ list = [], type = 1 }: PropsData) {

/**
* @name: goDetail
* @params id:流水信息id  action: 当前流水类型
* @return void
* @description 点击流水跳转到对应的详情修改页
*/
  const goDetail = (id: number, action: number) => {
    action == 3 && Taro.navigateTo({ url: `/pages/business/borrow/index?id=${id}` })
    action == 4 && Taro.navigateTo({url: `/pages/business/borrow/index?id=${id}`})
    action == 5 && Taro.navigateTo({ url: `/pages/business/expenditure/index?id=${id}` })
  }
  return (
    list.map(item=>(
      <Block key={item.id}>
        <View className='bokkeeping-list-container'>
          <View className='bokkeeping-list-item' onClick={() => goDetail(item.id,item.business_type)}>
            <View className='bokkeeping-list-left'>
              <View className='bokkeeping-list-title'>{item.worker_name}</View>
              <View className='bokkeeping-list-des'>{type == 3 ? "工钱" : (type == 4 ? "借支" : "支出")}</View>
              {item.is_note && <View className='bokkeeping-list-remarks'>备注：{item.note}</View>}
            </View>
            <View className='bokkeeping-list-right'>
              <View className='bokkeeping-list-count'>
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
