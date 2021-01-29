/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:00:27
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-29 18:18:08
 * @Description: 项目缓存文件，所有缓存key存放文件 
 ! @rules: 1.key 为大驼峰 值为小驼峰 2.注释在上方
 */

// 用户信息
export const UserInfo: string = 'userInfo'
// 区分老版本用户
export const OldVersionLimit: string = 'oldVersionLimit'
// 最后进入的记工本信息
export const LastJoinAccountBookInfo: string = 'lastJoinAccountBookInfo'
// 个人记工天-历史班组长信息
export const PersonlWorkdayHistoryGroupLeader: string = 'personlWorkdayHistoryGroupLeader'
// 个人记工钱-历史班组长信息
export const PersonlMoneyHistoryGroupLeader: string = 'personlMoneyHistoryGroupLeader'

// 个人记工量-历史班组长信息
export const PersonlAmountHistoryGroupLeader: string = 'personlAmountHistoryGroupLeader'
// 个人记工量-历史分项信息
export const PersonlAmountHistoryClassitifySubitem: string = 'personlAmountHistoryClassitifySubitem'

// 个人记借支-历史班组长信息
export const PersonlBorrowHistoryGroupLeader: string = 'personlBorrowHistoryGroupLeader'
// 个人记借支-历史分类信息
export const PersonlBorrowHistoryClassifyType: string = 'personlBorrowHistoryClassifyType'

// 个人记支出-历史班组长信息
export const PersonlExpenditureHistoryGroupLeader: string = 'personlExpenditureHistoryGroupLeader'
// 个人记支出-历史分类信息
export const PersonlExpenditureHistoryClassifyType: string = 'personlExpenditureHistoryClassifyType'

// 班组记工量-历史分项信息
export const GroupAmountHistoryClassitifySubitem: string = 'groupAmountHistoryClassitifySubitem'
// 班组记借支-历史分类信息
export const GroupBorrowHistoryClassitifyType: string = 'groupBorrowHistoryClassitifyType'
// 班组记支出-历史分类信息
export const GroupExpenditureHistoryClassitifyType: string = 'groupExpenditureHistoryClassitifyType'

/*班组借支分类*/
export const teamBorrowType: string = 'teamBorrowType'

/*班组支出分类*/
export const teamExpenditureType: string = 'teamExpenditureType'

// 个人记工-历史记录成功页面 （比如上次用户记录工天，下次默认进入工天，上次成功记录工量，下次在首页默认进入记工量）
export const PersonlLastSuccessRecordPage: string = 'personlLastSuccessRecordPage'
// 个人记账-历史记录成功页面
export const PersonlLastSuccessAccountPage: string = 'personlLastSuccessAccountPage'
// 班组记工-历史记录成功页面
export const GroupLastSuccessRecordPage: string = 'groupLastSuccessRecordPage'
// 班组记账-历史记录成功页面
export const GroupLastSuccessAccountPage: string = 'groupLastSuccessAccountPage'
