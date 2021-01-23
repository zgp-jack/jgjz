/*
 * @Author: lcmxkg
 * @Date: 2021-01-18 15:29:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 15:53:46
 * @Description: 记工本信息
 */

import { action, observable } from 'mobx'
import AccountBookInfoType from './inter.d'

export class AccountBookInfo {
  /** 记工本信息 */
  @observable
  accountBookInfo: AccountBookInfoType = {
    id: 0,
    name: '',
    identity: '',
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
  }
}

export default new AccountBookInfo()