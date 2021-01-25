import Taro from '@tarojs/taro'
<<<<<<< HEAD
import { View, Image, Block } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { PropsData } from './index.d'
=======
import {View, Image, Block} from '@tarojs/components'
import {IMGCDNURL} from '@/config/index'
import {PropsData} from './idnex.d'
>>>>>>> dev
import './index.scss'

export default function WorkCountDay({list = [], type = 1}: PropsData) {

  /**
   * @name: goDetail
   * @params id:流水信息id  action: 当前流水类型 1: 记工天 2: 记工量
   * @return void
   * @description 点击流水跳转到对应的详情修改页
   */
  const goDetail = (id: number, action: number) => {
    let url: string = ''
    if(action === 1){
      url = `/pages/business/workday/index?id=${id}`
    }else{
      url = `/pages/business/amount/index?id=${id}`
    }
    Taro.navigateTo({ url })
  }
  return (
    <Block>
    {list.map(item => (
      <Block key={item.id}>
        <View className='bokkeeping-list-container'>
          <View className='bokkeeping-list-item' onClick={() => goDetail(item.id, item.business_type)}>
            <View className='bokkeeping-list-left'>
              <View className='bokkeeping-list-title'>{item.worker_name}</View>
              <View className='bokkeeping-list-des'>{type == 1 ? '工天' : (type == 2 ? '工量' : '')}</View>
              {item.is_note && <View className='bokkeeping-list-remarks'>备注：{item.note}</View>}
            </View>
            <View className='bokkeeping-list-right'>
              <View className='bokkeeping-list-count'>
                {type == 2 ? <View>{item.unit_num + item.unit}</View> : <View>上班：{item.work_time}个工</View>}
                {item.overtime && <View>加班：{item.overtime}小时</View>}
              </View>
              <Image src={`${IMGCDNURL}common/arrow-right.png`}></Image>
            </View>
          </View>
        </View>
      </Block>))}
    </Block>
  )
}
