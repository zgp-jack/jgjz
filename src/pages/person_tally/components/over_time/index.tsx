import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

function OverTime({modify=false}){
    return (
        <View className="person-record-overtime person-record-worktime">
            <Text className="worktime-text">加班时长</Text>
            <View className="worktime">无加班</View>
            <View className="worktime worktime-select worktime-active">
                <Text className="worktime-select-time">24小时</Text>
            </View>
            {!modify && <Text className="overtime-icon"></Text>}
        </View>
    )
}
export default observer(OverTime)