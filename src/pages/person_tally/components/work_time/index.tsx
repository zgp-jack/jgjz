import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

function WorkTime(){
    return (
        <View className="person-record-worktime">
            <Text className="worktime-text">上班时长</Text>
            <View className="worktime worktime-active">1个工</View>
            <View className="worktime">半个工</View>
            <View className="worktime">休息</View>
            <View className="worktime worktime-select">
                <Text className="worktime-select-time">0小时</Text>
            </View>
        </View>
    )
}
export default observer(WorkTime)