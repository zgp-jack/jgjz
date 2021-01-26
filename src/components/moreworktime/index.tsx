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
      <View className="moreworktime" onClick={WorktimeCancle}>
        <View className={classnames({
          "moreworktime-content": true,
          "no-over-time-content": hasOverBtn
        })} onClick={(e) => {e.stopPropagation()}}>
            <View className="moreworktime-btn">
              <Text className="moreworktime-cancle">{'　　'}</Text>
              <Text className={classnames({
                "moreworktime-title": true,
                "ismorework": hasOverBtn
              })}>{`选择${title}`}</Text>
              <View className="person-record-overtime" onClick={WorktimeCancle} >
                <Text className="overtime-icon"></Text>
              </View>
            </View>
            <View className="moreworktime-list">
              {data.map((item) => 
                <View className = {classnames({
                  "moreworktime-item": true,
                  "worktime-active": isSelect && (item.value === value)
                })} key={item.value} onClick={() => { set(item, 'end'); WorktimeCancle() }}>{item.text}</View>
              )}
            </View>
        </View>
        {hasOverBtn && <View className="no-over-time" >
          <View className="no-over-time-btn" onClick={() => { set(notOver,'first');WorktimeCancle()}}>{notOver.text}</View>
        </View>}
      </View>
    )
}