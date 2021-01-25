import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import MoreWorkTime from '../moreworktime/index'
import WorkTimeProps, { WorkTime } from './inter.d'
import classnames from 'classnames'
import { worktimedata, overtime } from './config'
import './index.scss'

export default function WorkTime({
  isClose = true,
  setTime,
  set,
  close,
  selected = {id: 0, value: 0}
}: WorkTimeProps) {
  // 选中id
  const [selectTime, setSelectTime] = useState<number>(selected.id)
  // 是否关闭 更多
  const [isMorkTime, setIsMorkTIme] = useState<boolean>(false)
  // 时间值
  const [timeValue, setTimeValue] = useState<number>(selected.value)
  // worktime 值
  const [worktime, setWorkTime] = useState <WorkTime[]>([])
  useEffect(() => {
    isClose ? setWorkTime(worktimedata) : setWorkTime(overtime);
  }, [worktime])
  return (
    <View className={classnames({
      "person-record-worktime person-record-overtime": true,
      "overtime-text": !isClose
    })}>
      <Text className="worktime-text">{isClose?'上班时长':'加班时长'}</Text>
      {(isClose ? worktimedata : overtime).map((item) => (
        <View className={classnames({
          "worktime": true,
          "worktime-active": selectTime === item.id
        })} key={item.id} onClick={() => { set(item.id); setSelectTime(item.id); setTimeValue(0)}} >{item.text}</View>
      ))}
      <View className={classnames({
        "worktime worktime-select": true,
        "worktime-active": worktime.length === selectTime
      })} onClick={() => {setIsMorkTIme(true)}}>
        <Text className="worktime-select-time">{`${timeValue}小时`}</Text>
      </View>
      {!isClose && <Text className="overtime-icon" onClick={close}></Text>}
      {isMorkTime && <MoreWorkTime 
        set={(value) => {
          (isClose || value) ? setSelectTime(worktime.length) : setSelectTime(0);
          setTimeValue(value);
          setTime(value)
        }}
        isMoreWork={isClose} 
        WorktimeCancle={() => setIsMorkTIme(false) } />}
    </View>
  )
}
