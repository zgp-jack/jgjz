import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default function ShrinkBar({}){
    return (
        <View>
            <View className="person-record-component">
                <View className="person-record-component-item">今天11月2日</View>
                <View className="person-record-component-item">班组长</View>
                <View className="person-record-component-item">是否可报销</View>
            </View>
        </View>
    )
}