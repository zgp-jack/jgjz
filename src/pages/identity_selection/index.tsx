import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default function Index() {
    return (
        <View className='identity-selection'>
            <Image className="identity-back-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/left-arrow.png"></Image> 
            <View className="identity-book-item">
                <Text className="">欢迎使用鱼泡记工账本</Text>
                <Text className="">首次进入请选择您常用的记工方式</Text>

                <View className="">
                    <View className="">
                      <Image className="identity-gong-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 
                      <View className="">个人记工</View>
                      <View className="">适合给自己记</View>
                    </View>

                    <View className="">
                      <Image className="identity-gong-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 
                      <View className="">班组记工</View>
                      <View className="">适合给多人记</View>
                    </View>
                </View>
            </View>
        </View>
    )
}
