import { action, observable } from 'mobx'

export class CounterStore{
  /** 数字统计值 */ 
  @observable
  counter: number = 10

  /**  
   * @name: increment 
   * @params num: number 需要增加的数值 @default 1
   * @return this.counter
   * @description 将数值 + num 并更新当前数值
  */
  @action
  increment = (num: number = 1) => {
    this.counter += num
  }

  /**
   * @name: decrement
   * @return this.counter
   * @description 将数值递增1
  */
  @action
  decrement = () => {
    this.counter--
  }
}

export default new CounterStore()