/*
 * @Author: 老王
 * @Date: 2021年01月20日10:26:35
 * @LastEditors: 老王
 * @LastEditTime: 2021年01月20日10:26:43
 * @Description: 工友录文件夹下面的所有的接口存放文件
 */
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
  work_note:string
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
  addClick:Function,
}

// 添加工友弹窗确定 的值
export interface ADD_CONFIRM_DATA {
  name:string,
  tel:string
}
// 添加工友 给后台传的参数
export interface ADD_PERSON_PARAMS extends ADD_CONFIRM_DATA {
  name_color:string
}