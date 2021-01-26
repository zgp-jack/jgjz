/*
 * @Author: jsxin
 * @Date: 2021-01-23 09:33:27
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 09:42:19
 * @Description: 创建 个人 班组 配置项
 */
import { CreateConfigList } from './index.d'
import { IMGCDNURL } from '@/config/index'

const createConfig: CreateConfigList[] =[
  {
    id: 2,
    type: '个人',
    tips: '适合给个人记',
    img: `${IMGCDNURL}gl/id-personal.png`
  },
  {
    id: 1,
    type: '班组',
    tips: '适合给多人记',
    img: `${IMGCDNURL}gl/id-team.png`
  }
]

export default createConfig