/*
 * @Author: lcmxkg
 * @Date: 2021-01-18 15:29:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 15:38:56
 * @Description: 记工本信息
 */
import Taro from '@tarojs/taro'
import { action, observable } from 'mobx'
import AccountBookInfoType from './inter.d'
import { LastJoinAccountBookInfo } from '@/config/store'

// 获取上一次用户退出的记事本
let accountBook: AccountBookInfoType = Taro.getStorageSync(LastJoinAccountBookInfo)

export class AccountBookInfo {
  /** 记工本信息 */
  @observable
  accountBookInfo: AccountBookInfoType = accountBook ? accountBook : {
    id: 0,
    name: '',
    identity: 1,
    status: 0
  }

  /**  
   * @name: setAccountBoookInfo
   * @params accountBook: AccountBookInfo 当前进入的记工本信息
   * @return this.accountBookInfo
   * @description 设置当前用户信息
  */
  @action
  setAccountBoookInfo = (accountBook: AccountBookInfoType) => {
    this.accountBookInfo = accountBook
    Taro.setStorageSync(LastJoinAccountBookInfo, accountBook)
  }
}

export default new AccountBookInfo()