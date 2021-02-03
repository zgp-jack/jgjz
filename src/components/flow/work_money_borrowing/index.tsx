import Taro from '@tarojs/taro'
import {View, Image, Block} from '@tarojs/components'
import {IMGCDNURL} from '@/config/index'
import {PropsData} from './index.d'
import './index.scss'
import {observer, useLocalStore} from '@tarojs/mobx'
import AccountBookInfo from "@/store/account";
import User from "@/store/user";

function WorkMoneyBorrowing({ list = [], type = 1}: PropsData) {
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const {accountBookInfo} = _accountBookInfo
  const identity = accountBookInfo.identity
  /**
   * @name: goDetail
   * @params id:流水信息id  action: 当前流水类型 3: 工钱 4: 借支 5: 支出
   * @return void
   * @description 点击流水跳转到对应的详情修改页
   */
  const goDetail = (id: number, action: number) => {
    let url: string = ''

    if (accountBookInfo.identity == 1) {
      if (action === 3) {
        url = `/pages/work_team_business/money/index?id=${id}`
      } else if (action === 4) {
        url = `/pages/work_team_business/borrow/index?id=${id}`
      } else {
        url = `/pages/work_team_business/expenditure/index?id=${id}`
      }
    } else {
      if (action === 3) {
        url = `/pages/business/money/index?id=${id}`
      } else if (action === 4) {
        url = `/pages/business/borrow/index?id=${id}`
      } else {
        url = `/pages/business/expenditure/index?id=${id}`
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
                  {identity == 1 && <View className='bokkeeping-list-title'>{item.worker_name}</View>}
                  {identity == 2 && <View className='bokkeeping-list-title'>{type == 3 ? '工钱' : (type == 4 ? '借支' : '支出')}</View>}
                  {identity == 1 && <View className='bokkeeping-list-des'>{type == 3 ? '工钱' : (type == 4 ? '借支' : '支出')}</View>}
                  {identity == 2 && <View className='bokkeeping-list-des'>{item.group_leader_name ? ('班组长：' + item.group_leader_name) : ''}</View>}
                </View>
                <View className='bokkeeping-list-right'>
                  <View className='bokkeeping-list-count'>
                    <View className='bokkeeping-list-money-text'>¥{item.money || '0.00'}</View>
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

export default observer(WorkMoneyBorrowing)
