/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:29:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 14:06:21
 * @Description: 用户信息管理器
 */
import Taro from '@tarojs/taro'
import { action, observable } from 'mobx'
import UserInfo from './inter.d'
import { UserInfo as user } from '@/config/store'

// 初始化用户信息
let userInfo: UserInfo = Taro.getStorageSync(user)

export class User {
  /** 用户信息初始化 */
  @observable
  user: UserInfo = userInfo ? userInfo : {
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