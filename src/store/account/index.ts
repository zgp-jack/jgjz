/*
 * @Author: lcmxkg
 * @Date: 2021-01-18 15:29:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 15:36:13
 * @Description: 记工本信息
 */

import { action, observable } from 'mobx'
import AccountBookInfo from './inter.d'

export class AccountBookAction {
  /** 是否已经初始化 */
  @observable
  accountBookInfo: AccountBookInfo = {
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
  setAccountBoookInfo = (accountBook: AccountBookInfo) => {
    this.accountBookInfo = accountBook
  }
}

export default new AccountBookAction()