/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:29:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 15:29:17
 * @Description: 记工mokx
 */
 
import { action, observable } from 'mobx'
import AccountBookInfo from './inter.d'

export class AccountBookAction {
  /** 是否已经初始化 */
  @observable
  accountBooks: AccountBookInfo = {
    id: 0,
    name: '',
    type: ''
  }

  /**  
   * @name: increment 
   * @params data: AccountBookAction 当前 用户信息
   * @return this.accountBooks
   * @description 设置当前用户信息
  */
  @action
  setAccountBoookInfo = (accountBooks: AccountBookInfo) => {
    this.accountBooks = accountBooks
  }
}

export default new AccountBookAction()