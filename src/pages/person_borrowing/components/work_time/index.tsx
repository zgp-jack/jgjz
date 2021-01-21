import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import MoreWorkTime from '../moreworktime/index'
import WorkTimeProps from './inter.d'
import classnames from 'classnames'
import './index.scss'

export default function WorkTime({
  worktime = [{ id: 0, text: "1个工" }, { id: 1, text: "半个工" }, { id: 2, text: "休息"}],
  isClose = true
}: WorkTimeProps) {
  // 选中id
  const [selectTime, setSelectTime] = useState<number>(0)
  // 是否关闭 更多
  const [IsMorkTime, setIsMorkTIme] = useState<boolean>(false)
  return (
    <View className={classnames({
      "person-record-worktime person-record-overtime": true,
      "overtime-text": isClose === false
    })}>
      <Text className="worktime-text">{isClose?'上班时长':'加班时长'}</Text>
      {worktime.map((item) => (
        <View className={classnames({
          "worktime": true,
          "worktime-active": selectTime === item.id
        })} key={item.id} onClick={() => setSelectTime(item.id)} >{item.text}</View>
      ))}
      <View className={classnames({
        "worktime worktime-select": true,
        "worktime-active": worktime.length === selectTime
      })} onClick={() => { setSelectTime(worktime.length); setIsMorkTIme(true)}}>
        <Text className="worktime-select-time">0小时</Text>
      </View>
      {!isClose && <Text className="overtime-icon"></Text>}
      {IsMorkTime && <MoreWorkTime WorktimeCancle={() => setIsMorkTIme(false) } />}
    </View>
  )
}
