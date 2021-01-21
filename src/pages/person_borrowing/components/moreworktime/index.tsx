import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import MoreWorkTimeProps from './inter.d'
import './index.scss'


export default function MoreWorkTime({WorktimeCancle}:MoreWorkTimeProps){
    // 更多加班数据
    let moreworktimedata:number[] = [];
    for(let i=0.5;i<=24;i+=0.5){
        moreworktimedata.push(i);
    }
    // 选择的加班时间
    const [selectedTime, setselectedTime] = useState<number>(0)
    // 用户选择加班时间
    const userSelectTime = (item) => {
        setselectedTime(item);
    }
    return (
        <View className="moreworktime">
            <View className="moreworktime-content">
                <View className="moreworktime-btn">
                    <Text className="moreworktime-cancle" onClick={WorktimeCancle}>取消</Text>
                    <Text className="moreworktime-title">选择上班时长</Text>
                    <Text className="moreworktime-confim">确定</Text>
                </View>
                <View className="moreworktime-list">
                    {moreworktimedata.map((item) => 
                        <View className = {classnames({
                            "moreworktime-item": true,
                            "worktime-active": selectedTime === item
                        })} key={`ids${item}`} onClick={() => userSelectTime(item)}>{item}小时</View>
                    )}
                </View>
            </View>
        </View>
    )
}