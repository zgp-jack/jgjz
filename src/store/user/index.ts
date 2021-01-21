/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:29:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 15:29:17
 * @Description: 用户信息管理器
 */
 
import { action, observable } from 'mobx'
import UserInfo from './inter.d'

export class User {
  /** 是否已经初始化 */
  @observable
  user: UserInfo = {
    token: '',
    userId: 0,
    login: false,
  }

  /**  
   * @name: increment 
   * @params data: User 当前 用户信息
   * @return this.user
   * @description 设置当前用户信息
  */
  @action
  setUserInfo = (user: UserInfo) => {
    this.user = user
  }
}

export default new User()