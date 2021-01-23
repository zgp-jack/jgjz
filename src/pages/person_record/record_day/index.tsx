import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import RecordDayProps from './inter.d'
import { worktime, overtime } from './config'
import WorkTime from '@/pages/person_borrowing/components/work_time/index'
import PickterDate from '@/components/picker_date/index'
import PickerLeader from '@/components/picker_leader/index'
import PickerMark from '@/components/picker_mark/index'
import { getTodayDate } from '@/utils/index'
import './index.scss'

export default function RecordDay({

 }: RecordDayProps) {
  // 是否日期组件
  const [IsPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长组件
  const [IsPickerLeader, setIsPickerLeader] = useState<boolean>(true)
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordAmountPostData>({
    business_type: 2,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    unit_num: '',
    unit: '平方米',
    unit_work_type: '',
    identity: 2,
    work_note: '890',
    worker_id: '1693'
  })
  return (<View>
    <View className="person-record-time">
      <WorkTime worktime={worktime} />
      <WorkTime worktime={overtime} isClose={false} />
    </View>
    {IsPickerDate && <PickterDate date="2021-1-21" DeletePickerDate={() => setIsPickerDate(false)} />}
    {IsPickerLeader && <PickerLeader leader="张三" DeletePickerLeader={() => setIsPickerLeader(false)} />}
    <PickerMark text='这是一个人' />
    <View className="person-record-component">
      <View className="person-record-component-item">今天11月2日</View>
      <View className="person-record-component-item">班组长</View>
      <View className="person-record-component-item">加班时长</View>
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" >确认记工</Button>
    </View>
  </View>)
}