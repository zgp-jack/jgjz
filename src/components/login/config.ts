import { LoginConfig } from './inter.d'

// 验证码登录方式
export const codeWay: string = 'code'
// 密码登录方式
export const passWay: string = 'pass'
  
const loginConfig: LoginConfig[] = [
  {
    title: '验证码登录',
    id: codeWay
  },
  {
    title: '账号登录',
    id: passWay
  }
]

export default loginConfig