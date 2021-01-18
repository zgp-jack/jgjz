import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button, Input} from '@tarojs/components'
import './index.scss'

export default function Index(){
  return (
    <View className='login-box'>
        <Image className="close-login-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/close-login.png"></Image>
        <Image className="logo-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/logo.png"></Image>
        <View className="login-type">
            <Text className="login-type-title login-type-title-left login-active">验证码登录</Text>
            <Text className="login-type-title">账号登录</Text>
        </View>

        <View className="login-form">
            <View className="login-form-item">
                <Image className="login-phone-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/phone.png"></Image> 
                <Input className="input-item-text" placeholder="请输入手机号码" type="number" maxLength={11} />
            </View>
            <View className="login-form-item">
                <Image className="login-passcode" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/pass-code.png"></Image> 
                <Input className="input-item-text" placeholder="请输入验证码" type="number" maxLength={6} />
                <Text className="">获取验证码</Text>
            </View> 
        </View>

        <View className="login-form">
            <View className="login-form-item">
                <Image className="login-phone-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/phone.png"></Image> 
                <Input className="input-item-text" placeholder="请输入手机号码" type="number" maxLength={11} />
            </View>
            <View className="login-form-item">
                <Image className="login-passlock" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/pass-lock.png"></Image> 
                <Input className="input-item-text" placeholder="请输入密码" type="number" maxLength={6} />
                <Image className="login-eyes-open" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/eyes-open.png"></Image> 
                <Image className="login-eyes-clone" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/eyes-clone.png"></Image> 
            </View> 
        </View>

        <Button className="login-push-btn">登录</Button>
    </View>
  )
}
