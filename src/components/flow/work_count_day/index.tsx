import Taro from '@tarojs/taro'
import {View, Image, Block} from '@tarojs/components'
import {IMGCDNURL} from '@/config/index'
import {observer, useLocalStore} from '@tarojs/mobx'
import AccountBookInfo from "@/store/account";
import {PropsData} from './index.d'
import './index.scss'

function WorkCountDay({list = [], type = 1}: PropsData) {
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const { accountBookInfo } = _accountBookInfo
  const identity = accountBookInfo.identity
  /**
   * @name: goDetail
   * @params id:流水信息id  action: 当前流水类型 1: 记工天 2: 记工量
   * @return void
   * @description 点击流水跳转到对应的详情修改页
   */
  const goDetail = (id: number, action: number) => {
    let url: string = ''
    if (accountBookInfo.identity == 1) {
      if (action === 1) {
        url = `/pages/work_team_business/workday/index?id=${id}`
      } else {
        url = `/pages/work_team_business/amount/index?id=${id}`
      }
    } else {
      if (action === 1) {
        url = `/pages/business/workday/index?id=${id}`
      } else {
        url = `/pages/business/amount/index?id=${id}`
      }
    }

    Taro.navigateTo({url})
  }
  return (
    <Block>
      {list.map(item => (
        <Block key={item.id}>
          <View className='bokkeeping-list-container'>
            <View className='bokkeeping-list-item' onClick={() => goDetail(item.id, item.business_type)}>
              <View className="bokkeeping-list-item-box">
                <View className='bokkeeping-list-left'>
                  {identity == 1 && <View className='bokkeeping-list-title'>{item.worker_name}</View> }
                  {identity == 2 && <View className='bokkeeping-list-title'>{type == 1 ? '工天' : '工量'}</View>}
                  {identity == 1 && <View className='bokkeeping-list-des'>{type == 1 ? '工天' : '工量'}</View>}
                  {identity == 2 && <View className='bokkeeping-list-des'>{item.group_leader_name ? ('班组长：' + item.group_leader_name) : ''}</View>}
                </View>
                <View className='bokkeeping-list-right'>
                  <View className='bokkeeping-list-count'>
                    {type == 2 ? <View className='bokkeeping-list-count-work'>{(item.unit_num ? item.unit_num : 0) + item.unit}</View> :
                      <View className='bokkeeping-list-count-work'>上班：{item.work_time ? item.work_time + '个工' : ''}{item.work_time_hour ? item.work_time_hour + '小时' : ''}{(!item.work_time && !item.work_time_hour) ? '休息' : ''}</View>}
                    {item.overtime && <View className='bokkeeping-list-count-work'>加班：{item.overtime}小时</View>}
                  </View>
                  <Image className='bokkeeping-list-count-image' src={`${IMGCDNURL}common/arrow-right.png`}></Image>
                </View>
              </View>
              {item.is_note && <View className='bokkeeping-list-remarks'>备注：{item.note}</View>}

            </View>

          </View>
        </Block>))}
    </Block>
  )
}

export default observer(WorkCountDay)
