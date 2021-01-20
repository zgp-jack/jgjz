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