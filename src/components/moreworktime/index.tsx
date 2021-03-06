import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import MoreWorkTimeProps from './inter.d'
import { WorkTimeType } from '@/components/work_day/inter.d'
import './index.scss'


export default function MoreWorkTime({
  hasOverBtn = false,
  WorktimeCancle,
  set,
  title,
  data = [],
  value = '',
  isSelect = false
}:MoreWorkTimeProps){

  // 默认无加班数据
  const notOver:WorkTimeType ={
    value: '0',
    text: '无加班'
  }
    return (
      <View className="moreworktime" onClick={(e) => { e.preventDefault(); e.stopPropagation(); WorktimeCancle()}}>
        <View className={classnames({
          "moreworktime-content": true,
          "no-over-time-content": hasOverBtn
        })} onClick={(e) => { e.preventDefault()}}>
            <View className="moreworktime-btn">
              <Text className="moreworktime-cancle">{'　　'}</Text>
              <Text className={classnames({
                "moreworktime-title": true,
                "ismorework": false
              })}>{`选择${title}`}</Text>
            <View className="person-record-overtime" onClick={(e) => { e.preventDefault(); e.stopPropagation();WorktimeCancle()}} >
                <Text className="overtime-icon"></Text>
              </View>
            </View>
            <View className="moreworktime-list">
              {data.map((item) => 
                <View className = {classnames({
                  "moreworktime-item": true,
                  "worktime-active": isSelect && (item.value === value)
                })} key={item.value} onClick={(e) => { set(item, 'end');e.preventDefault();e.stopPropagation() }}>{item.text}</View>
              )}
            </View>
        </View>
        {hasOverBtn && <View className="no-over-time" >
          <View className="no-over-time-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); set(notOver,'first');}}>{notOver.text}</View>
        </View>}
      </View>
    )
}