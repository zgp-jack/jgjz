import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button, Input} from '@tarojs/components'
import './index.scss'
import HeaderList from './config'
import classnames from 'classnames'

interface Params {
    reNewPwd: ParamsItem,
}
  
interface ParamsItem {
    text: string,
    hidden: boolean
}
export default function Index(){
  // 当前高亮key
  const [id, setId] = useState<string>(HeaderList[0].id)
    // 用户切换二手状态
    const userChangePublishedItem = (key: string) => {
      setId(key)
    }
  //提交的数据
  const [paramsData, setParamsData] = useState<Params>({
    reNewPwd: {
      text: '',
      hidden: true
    },
  })

  const changeInputType = (type: string) => {
    paramsData[type].hidden = !paramsData[type].hidden
    setParamsData({ ...paramsData })
  }
  const enterRePass = (type: string, value: string) => {
    paramsData[type].text = value;
    setParamsData({ ...paramsData })
  }
  return (
    <View className='login-box'>
        <Image className="close-login-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/close-login.png"></Image>
        <Image className="logo-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/logo.png"></Image>
        <View className="login-type">
            {HeaderList.map(item => (
            <View
                onClick={() => userChangePublishedItem(item.id)}
                className={classnames({
                'login-type-title': true,
                'login-active': id === item.id
                })}
            >
                <Text className='published-item-title'>{item.title}</Text>
            </View>
            ))}
        </View>
        {id == "paddcode" &&
        <View className="login-form">
            <View className="login-form-item">
                <Image className="login-phone-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/phone.png"></Image> 
                <Input className="input-item-text" placeholder="请输入手机号码" type="number" maxLength={11} />
            </View>
            <View className="login-form-item">
                <Image className="login-passcode" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/pass-code.png"></Image> 
                <Input className="input-item-text" placeholder="请输入验证码" type="number" maxLength={6} />
                <Text className="get-code">获取验证码</Text>
            </View> 
        </View>}

        {id == "paddwork" &&
        <View className="login-form">
            <View className="login-form-item">
                <Image className="login-phone-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/phone.png"></Image> 
                <Input className="input-item-text" placeholder="请输入手机号码" type="number" maxLength={11} />
            </View>
            <View className="login-form-item">
                <Image className="login-passlock" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/pass-lock.png"></Image> 
                <Input className="input-item-text" placeholder="请输入密码" type="number" maxLength={6} password={paramsData.reNewPwd.hidden} onInput={(e: any) => enterRePass('reNewPwd', e.target.value)}/>
                <Text className={classnames({
                    'login-eyes-clone': true,
                    'login-eyes-open': !paramsData.reNewPwd.hidden
                    })}
                    onClick={() => { changeInputType('reNewPwd') }}></Text>
            </View> 
        </View>}

        <Button className="login-push-btn">登录</Button>
    </View>
  )
}
