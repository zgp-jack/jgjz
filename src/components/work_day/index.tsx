import Taro,{ useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import { workTimeData, workTimePickerData, overTimeData } from './config'
import MoreWorkTime from '@/components/moreworktime'
import { WorkDayComponentProps } from  './inter.d'
import './index.scss'

export default function WorkDayComponent({
  title = '上班时长',
  type= '',
  value = {value: '', text: ''},
  data = [],
  change,
  isSelect = false,
  isClose = false,
  close
}: WorkDayComponentProps){

  // 是否显示picker
  const [show, setShow] = useState<boolean>(false)

  return (
    <View className={classnames({
      "person-record-worktime person-record-overtime": true,
      "overtime-text": isClose
    })}>
      <Text className="worktime-text">{title}</Text>
      {/* 前面正常显示数据 */}
      {(type && (type == 'work') ? workTimeData : overTimeData).map(item => (
        <View 
        onClick={() => change(item,'first')}
        key={item.value}
        className={classnames({
          "worktime": true,
          "worktime-active": !isSelect&&(item.value == value.value)
        })} >{item.text}</View>
      ))}
      {/* 如果没有type 那就使用数据源 */}
      {!type&&data&&data.map(item => (
        <View
          onClick={() => change(item, 'first')}
          key={item.value}
          className={classnames({
            "worktime": true,
            "worktime-active": item.value == value.value
          })} >{item.text}
        </View>
      ))}
      {/* select 按钮 */}
      <View 
      className={classnames({
        "worktime worktime-select": true,
        "worktime-active": isSelect
      })} 
      onClick={() => setShow(true)}
      >
        <Text className="worktime-select-time">{isSelect ? value.text : '0小时'}</Text>
      </View>
      {isClose && <View className="overtime-icon" onClick={close}></View>}
      {show && 
      <MoreWorkTime
        set={(data,type) => change(data,type) }
        data={type ? workTimePickerData : data}
        value={value.value}
        hasOverBtn={(type == 'over')}
        title={title}
        isSelect={isSelect}
        WorktimeCancle={() => setShow(false)} 
      />}

    </View>
  )
}