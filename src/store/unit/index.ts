/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 17:15:51
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-21 10:36:36
 * @Description: 计量单位
 */

import { action, observable } from 'mobx'
import UnitType from './inter.d'

export class UnitStore {
  /** 所有字段集合 */
  @observable
  unitdata: UnitType[] = []
  /** 是否已经初始化 */
  @observable
  status: boolean = false

  /**
   * @name: initUnitData
   * @params data: UnitType[] 请求接口回来的所有数据
   * @description 初始化状态机 初始化之后将标识改变 这样就不会重复请求
  */
  @action
  initUnitData = (data: UnitType[]) => {
    this.unitdata = [...data]
    this.status = true
  }
}

export default new UnitStore()