/*
 * @Author: jsxin
 * @Date: 2021-01-20 17:15:51
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 14:21:16
 * @Description: 记工 - 分类 数据
 */

import { action, observable } from 'mobx'
import ClassifyItem from './inter.d'
import { objDeepCopy } from '@/utils/index'

export class ClassifyType {
  /** 所有字段集合 */
  @observable
  types: ClassifyItem[] = []
  /** 是否已经初始化 */
  @observable
  status: boolean = false

  /**  
   * @name: increment 
   * @params item: ClassifyItem 添加方法新增数据
   * @return this.types
   * @description 将新数据添加到当前状态机
  */
  @action.bound
  addClassifyType = (item: ClassifyItem) => {
    this.types = [item, ...this.types]
  }

  /**
   * @name: delClassifyType
   * @params index: number 当前需要删除的索引
   * @return this.types
   * @description 从状态机中删除当前项数组
  */
  @action.bound
  delClassifyType = (index: number) => {
    let types = JSON.parse(JSON.stringify(this.types))
    types.splice(index, 1)
    this.types = [...types]
  }

  /**
   * @name: initClassifyType
   * @params data: ClassifyItem[] 请求接口回来的所有数据
   * @description 初始化状态机 初始化之后将标识改变 这样就不会重复请求
  */
  @action.bound
  initClassifyType = (data: ClassifyItem[]) => {
    this.types = [...data]
    this.status = true
  }

  /**
   * @name: editClassifyType
   * @params i:number 修改数据的索引 data: ClassifyItem 修改的数据
   * @description 修改数据
  */
  @action.bound
  editClassifyType = (i:number ,data: ClassifyItem) => {
    let types = JSON.parse(JSON.stringify(this.types))
    types[i] = data
    this.types = types
  }
}

export default new ClassifyType()