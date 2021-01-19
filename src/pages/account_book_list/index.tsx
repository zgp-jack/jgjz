import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

export default function Index() {
    return (
        <View className='account-book-box'>
            <View className="account-book-top">
                <Text className="account-book-project">当前共1个项目</Text>
                <Text className="account-book-add">新建+</Text>
            </View>
            <View className="account-book-personal account-book-item">
                <Text className="account-book-type-personal">个人记工</Text>
                <View className="account-book-tag-box">
                    <View className="account-book-title">
                        <Text className="">默认班主记工记账</Text>
                        <View className="account-book-edit">修改<Image className="account-right-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png"></Image> </View>
                    </View>
                    <View className="account-book-flex">
                        <View className="account-book-align"><Image className="account-gong-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 记工</View>
                        <View className="account-book-align"><Image className="account-zhang-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/record-work-icon.png"></Image>记账</View>
                    </View>
                    <Button className="account-book-btn">进入记工账本</Button>
                </View>
            </View>
            <View className="account-book-team account-book-item">
                <Text className="account-book-type-team">班组记工</Text>
                <View className="account-book-tag-box">
                    <View className="account-book-title">
                        <Text className="">默认班主记工记账</Text>
                        <View className="account-book-edit">修改<Image className="account-right-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png"></Image> </View>
                    </View>
                    <View className="account-book-flex">
                        <View className="account-book-align"><Image className="account-gong-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image>记工</View>
                        <View className="account-book-align"><Image className="account-zhang-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/record-work-icon.png"></Image>记账</View>
                    </View>
                    <Button className="account-book-btn">进入记工账本</Button>
                </View>
            </View>

        </View>
    )
}
