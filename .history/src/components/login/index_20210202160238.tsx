import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button, Input, Block } from '@tarojs/components'
import loginConfig, { codeWay, passWay } from './config'
import { IMGCDNURL } from '@/config/index'
import classnames from 'classnames'
import useCode from '@/hooks/code'
import msg from '@/utils/msg'
import userGetCodeLoginAction from './api'
import { isPhone } from '@/utils/v'
import { UserInfo, OldVersionLimit } from '@/config/store'
import { observer, useLocalStore } from '@tarojs/mobx'
import User from '@/store/user';
import AccountBookInfo from "@/store/account";
import { UserGetCodeLoginParams, LoginProps } from './inter.d'
import getWorkNotes from '../../pages/account_book_list/api'
import './index.scss'

function Login({
  show = false,
  setShow
}: LoginProps) {
  const _userInfo = useLocalStore(() => User)
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const { setUserInfo } = _userInfo
  const { setAccountBoookInfo } = _accountBookInfo
  /** 当前高亮key */
  const [id, setId] = useState<string>(loginConfig[0].id)
  /** 是否显示密码 */
  const [showPass, setSHowPass] = useState<boolean>(false)
  /** 用户切换登录方式 */
  const userChangePublishedItem = (key: string) => {
    setId(key)
    setParamsData({ ...paramsData, type: key })
  }
  /** 使用自定义验证码hooks */
  const { text, userGetCode } = useCode()

  /** 用户输入表单信息 */
  const userEnterForm = (e: any, type: string) => {
    let value: string = e.detail.value
    let newData = { ...paramsData }
    newData[type] = value
    setParamsData(newData)
  }

  // 提交的数据
  const [paramsData, setParamsData] = useState({
    tel: '',
    code: '',
    pass: '',
    type: ''
  })
  /** 用户登录 */
  const userLoginAction = () => {
    if (!isPhone(paramsData.tel)) {
      msg('请输入正确的手机号码')
      return
    }
    let params: UserGetCodeLoginParams = {
      tel: paramsData.tel,
      type: paramsData.type
    }
    if (id == codeWay) {
      if (!paramsData.code) {
        msg('请输入验证码')
        return
      }
      params.code = paramsData.code
    } else {
      if (!paramsData.pass) {
        msg('请输入密码')
        return
      }
      params.pass = paramsData.pass
    }
    userGetCodeLoginAction(params).then(res => {
      if (res.code == 0) {
        // 设置用户信息
        let userInfo = {
          token: res.data.token,
          userId: res.data.yupao_id,
          login: true,
        }
        // 将用户信息缓存本地
        Taro.setStorageSync(UserInfo, userInfo)
        // 储存mobx
        setUserInfo(userInfo)
        getUserNotesList()
        msg(res.message)
      } else if (res.code == 203) {/**老用户跳旧版*/
        let oldVersionLimit = true
        // 将老用户缓存本地
        Taro.setStorageSync(OldVersionLimit, oldVersionLimit)
        //关闭弹窗
        setShow && setShow(false);
      } else {
        msg(res.message)
      }
    })
  }

  // 获取用户记工本列表
  const getUserNotesList = () => {
    getWorkNotes().then(res => {
      if(res.code === 0){
        let mydata = res.data
        if(mydata.length){
          // 储存mobx
          setAccountBoookInfo(mydata[0])
          //关闭弹窗
          setShow && setShow(false);
        }else{
          Taro.redirectTo({
            url: '/pages/identity_selection/index?type=1'
          })
        }
      }
    })
  }

  return (
    <Block>
      {show &&
        <View className='login-box'>
          <Image className="close-login-icon" src={`${IMGCDNURL}gl/close-login.png`} onClick={() => setShow && setShow(false)}></Image>
          <Image className="logo-icon" src={`${IMGCDNURL}gl/logo.png`} ></Image>

          <View className="login-type">
            {loginConfig.map(item => (
              <View
                key={item.id}
                onClick={() => userChangePublishedItem(item.id)}
                className={classnames({
                  'login-type-title': true,
                  'login-active': id === item.id
                })}>
                <Text className='published-item-title'>{item.title}</Text>
              </View>
            ))}
          </View>

          <View className="login-form">
            <View className="login-form-item">
              <Image className="login-phone-icon" src={`${IMGCDNURL}gl/phone.png`} ></Image>
              <Input className="input-item-text" placeholder="请输入手机号码" type="number" maxLength={11} onInput={(e) => userEnterForm(e, 'tel')} />
            </View>

            {id === codeWay &&
              <View className="login-form-item">
                <Image className="login-passcode" src={`${IMGCDNURL}gl/pass-code.png`} ></Image>
                <Input className="input-item-text" placeholder="请输入验证码" type="number" maxLength={6} onInput={(e: any) => userEnterForm(e, 'code')} />
                <Text className="get-code" onClick={() => userGetCode(paramsData.tel)}>{text}</Text>
              </View>}

            {id === passWay &&
              <View className="login-form-item">
                <Image className="login-passlock" src={`${IMGCDNURL}gl/pass-lock.png`} ></Image>
                <Input className="input-item-text" placeholder="请输入密码" password={!showPass} onInput={(e: any) => userEnterForm(e, 'pass')} />
                <Text className={classnames({
                  'login-eyes-clone': !showPass,
                  'login-eyes-clone login-eyes-open': showPass
                })}
                  onClick={() => setSHowPass(!showPass)}></Text>
              </View>}
          </View>
          <View className="login-tips">未注册手机验证后自动注册</View>
          <Button className="login-push-btn" onClick={() => userLoginAction()}>登录/注册</Button>
        </View>}
    </Block>
  )
}

export default observer(Login)