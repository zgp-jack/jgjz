/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:10:01
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 11:49:25
 * @Description: 常用的小程序路径 
 ! @rules: 1. a页面 = APAGE   2.命名 全大写   3.pages/subpackage 页面前面必须加 /
 */

import { ADDRESSBOOKTYPE_ALONE, ADDRESSBOOKTYPE_GROUP, ADDRESSBOOKTYPE_LEAVE } from '@/config/index'

// 首页
export const INDEXPAGE: string = '/pages/index/index'
// 通讯录页面
export const ADDRESSBOOKPAGE: string = '/pages/address_book/index'
// 通讯录页面-个人
export const ADDRESSBOOKALONEPAGE: string = `${ADDRESSBOOKPAGE}?type=${ADDRESSBOOKTYPE_ALONE}`
// 通讯录页面-班组
export const ADDRESSBOOKGROUPPAGE: string = `${ADDRESSBOOKPAGE}?type=${ADDRESSBOOKTYPE_GROUP}`
// 通讯录页面-离场
export const ADDRESSBOOKLEAVEPAGE: string = `${ADDRESSBOOKPAGE}?type=${ADDRESSBOOKTYPE_LEAVE}`
