/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:15:01
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-25 19:21:15
 * @Description: 存放所有的API请求接口
 ! @rules: 1. 导出的接口名 小驼峰  2.注释: 功能模块名 + 接口概述 3.功能模块相同的接口放在一起
 */


// ! 记工本
// 记工本-获取归档列表
export const userGetWorkNotes: string = `work-notes/get-file`
// 记工本-获取记工本（全部）
export const userGetAllWorkNotes: string = `work-notes/get`

// ! 记工
// 记工-获取首页流水数据
export const useGetIndexBusiness: string = `business/get-index-business`
// 记工-获取流水列表
export const userGetBusinessLists: string = `business/get-business`
// 记工-记工接口
export const userAddBorrow: string = `business/add`
// 记工-获取单个流水记录
export const userGetBusinessInfo: string =  `business/get-one/`
// 记工-删除单个流水记录
export const userDelBusinessInfo: string = `business/delete`
// 记工-修改单个流水记录
export const userEditBusinessInfo: string = `business/update/`

// ! 记账类别
// 记账类别-获取已有类别
export const userGetExpendType: string = `expend-type/get`
// 记账类别-新增
export const userAddExpendType: string = `expend-type/add`
// 记账类别-修改
export const userEditExpendType: string = `expend-type/update`
// 记账类别-删除
export const userDelExpendType: string = `expend-type/delete`

// ! 计量类别
// 记账类别-获取已有类别
export const userGetUnitWorkType: string = `UnitWorkType/get`
// 记账类别-新增
export const userAddUnitWorkType: string = `UnitWorkType/add`
// 记账类别-修改
export const userEditUnitWorkType: string = `UnitWorkType/update`
// 记账类别-删除
export const userDelUnitWorkType: string = `UnitWorkType/delete`

// ! 计量单位
export const userGetUnit: string = `unit/get`

// ! 登录注册
// 登录-获取验证码
export const userGetCode: string = `code/get`
// 登录-验证码登录
export const userGetMemberCodeLogin: string = `member/member-code-login`

// ! 意见反馈
// 意见反馈-添加意见反馈
export const addFeedback: string = `feedback/add`

// ! 通讯录
// 获取全部工友
export const addressBookAll: string = `workers/get`
//获取某个账本中的工友
export const addressBookNote: string = `workers/get-note-workers`
// 添加工人
export const workersAdd: string = `workers/add`
//初始化记工界面
export const initRemember: string = 'business/get-one/'
// 修改工人
export const updateWordkerInfo: string = `workers/update/`

//获取记工本
export const workNote: string = 'work-notes/get?id=1&co=23'

//获取账本流水统计
export const getCountUrl: string = 'business/get-count'

//删除工人
export const deleteWorker: string = 'workers/delete/'

//记工本添加工人
export const addNoteWorkersUrl: string = 'workers/add-note-workers'

//记工本离场
export const deleteNoteWorkersUrl: string = 'workers/delete-note-workers'

//账本中已选中的工友数据
export const getNoteWorkersUrl: string = 'workers/get-note-workers/'


// !流水列表
// 获取流水
export const flowList: string = 'business/get-business/'

//获取记账类别
export const rememberType: string = 'UnitWorkType/get'

//获取记工本
export const getWorkNotes: string = 'work-notes/get'

//新建记工本
export const addWorkNotes: string = 'work-notes/add'

//修改记工本
export const editWorkNotes: string = 'work-notes/edit-work-note'

// 获取单个记工本工友
export const WorkerList: string = 'workers/get-note-workers/'

// 离场某个工友
export const removeWorker: string = 'workers/delete-note-workers/'


