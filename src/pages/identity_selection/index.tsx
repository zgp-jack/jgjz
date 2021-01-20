import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default function Index() {
    return (
        <View className='identity-selection-box'>
            <Image className="identity-back-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/left-arrow.png"></Image> 
            <View className="identity-book-item">
                <View className="identity-selection-title">欢迎使用鱼泡记工账本</View>
                <View className="identity-selection-deail">首次进入请选择您常用的记工方式</View>

                <View className="identity-flex">
                    <View className="identity-selection-type">
                      <Image className="identity-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 
                      <View className="identity-tag-title">个人记工</View>
                      <View className="identity-tag-deail">适合给自己记</View>
                    </View>

                    <View className="identity-selection-type">
                      <Image className="identity-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 
                      <View className="identity-tag-title">班组记工</View>
                      <View className="identity-tag-deail">适合给多人记</View>
                    </View>
                </View>
            </View>
        </View>
    )
}
