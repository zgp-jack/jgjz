/*
 * @Author: 老王
 * @Date: 2021年01月20日10:26:35
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 17:36:31
 * @Description: 工友录文件夹下面的所有的接口存放文件
 */

// 组件参数
export default interface AddressBookProps {
  /** 通讯录类型  alone:个人 leave:离场 group: 班组多选  @default alone */ 
  type?: 'alone' | 'leave' | 'group',
  id:string
}

// 组件确定返回值
export interface AddressBookConfimType {
  /** 工友id */ 
  id: number,
  /** 工友名字 */
  name: string,
}

// 通讯录数据列表
export interface ADDRESS_BOOK_LIST {
  /** 名字首字母拼音 */ 
  name_py:string,
  /** 首字母拼音人员名单 */
  data: PERSON_DATA[]
}

// 字母索引人员名单数据
interface PERSON_DATA {
  /** 通讯录人员id */ 
  id:number,
  /** 通讯录人员姓名 */
  name:string,
  /** 通讯录人员电话 */
  tel:string,
  /** 通讯录人员首字母拼音 */
  name_py:string,
  /** 通讯录人员头像背景颜色 */
  name_color:string,
  /** 人员是否离场 */
  is_deleted:number,
  /** 是否是自己 */
  is_self:number,
  /** 是否在账本中被选中 */
  is_in_work_note:number
  /** 是否选择当前用户 */
  is_check:boolean
}


//获取所有工友的接口 传给后台的参数
export interface GET_WORKERS_ALL_PARAMS {
  //记账本id
  work_note:number
}

//获取所有工友的接口 后台返回值
export interface GET_WORKERS_ALL_RESULT {
  //状态码
  code:number,
  //状态信息
  message:string,
  //工友列表数据
  data: ADDRESS_BOOK_LIST[]
}

//已选中组件的参数
export interface SELECTD_PROPS {
  //已选中的工友数据
  selectd: PERSON_DATA[],
  //删除事件
  deletePerson:Function
}

//搜索组件的参数
export interface SEARCH_PROPS {
  /** 添加工友 */
  addClick:() => void,
  /** 用户搜索行为 */ 
  onSearch?: (val: string) => void,
  /** 用户搜索行为 */
  value?: string,
}

// 添加工友弹窗确定 的值
export interface ADD_CONFIRM_DATA {
  /** worker姓名 */ 
  name:string,
  /** worker电话 */
  tel:string
}

// 修改工友弹窗确定 的值
export interface EDIT_CONFIRM_DATA extends ADD_CONFIRM_DATA {
  /** 当前修改的用户id */ 
  id: number
}


// 修改工友 接口返回值
export interface EDIT_WORKER_RESULT {
  /** 当前修改的用户id */
  name_py: string
}

// 添加工友 给后台传的参数
export interface ADD_PERSON_PARAMS extends ADD_CONFIRM_DATA {
  //头像颜色
  name_color:string
}
//添加工友的返回值
export interface ADD_PERSON_RESULT_DATA {
  //工友id
  worker_id:number,
  name_py:string
}

// 删除工友接口提交参数
interface DeletedParams {
  /** 工友id */ 
  id: number
}
