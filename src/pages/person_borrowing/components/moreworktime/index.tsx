import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import MoreWorkTimeProps from './inter.d'
import './index.scss'


export default function MoreWorkTime({
  isMoreWork = true,
  WorktimeCancle,
  set
}:MoreWorkTimeProps){
    // 更多加班数据
    let moreworktimedata:number[] = [];
    for(let i=0.5;i<=24;i+=0.5){
        moreworktimedata.push(i);
    }
    // 选择的加班时间
    const [selectedTime, setselectedTime] = useState<number>(0)
    return (
      <View className="moreworktime" onClick={WorktimeCancle}>
        <View className={classnames({
          "moreworktime-content": true,
          "no-over-time-content": !isMoreWork
        })} onClick={(e) => {e.stopPropagation()}}>
            <View className="moreworktime-btn">
              <Text className="moreworktime-cancle">{'　　'}</Text>
              <Text className={classnames({
                "moreworktime-title": true,
                "ismorework": !isMoreWork
              })}>{isMoreWork?'选择上班时长':'加班时长'}</Text>
              <View className="person-record-overtime" onClick={WorktimeCancle} >
                <Text className="overtime-icon"></Text>
              </View>
            </View>
            <View className="moreworktime-list">
              {moreworktimedata.map((item) => 
                <View className = {classnames({
                    "moreworktime-item": true,
                    "worktime-active": selectedTime === item
                })} key={`ids${item}`} onClick={() => { set(item); setselectedTime(item); WorktimeCancle() }}>{item}小时</View>
              )}
            </View>
        </View>
        {!isMoreWork && <View className="no-over-time" >
          <View className="no-over-time-btn" onClick={() => { set(0);WorktimeCancle()}}>无加班</View>
        </View>}
      </View>
    )
}