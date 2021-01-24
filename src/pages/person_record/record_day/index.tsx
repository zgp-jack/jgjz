import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import RecordDayPostData from './inter.d'
import { worktime, overtime } from './config'
import WorkTime from '@/pages/person_borrowing/components/work_time/index'
import PickerDate from '@/components/picker_date/index'
import PickerLeader from '@/components/picker_leader/index'
import PickerMark from '@/components/picker_mark/index'
import { getTodayDate } from '@/utils/index'
import userAddRecordAction from '../api'
import './index.scss'

export default function RecordDay({ workerId = '', type = 1, work_note = '', identity = 1 }) {
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(true)
  // 是否显示加班组件
  const [isPickerOverTime, setIsPickerOverTime] = useState<boolean>(true)
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordDayPostData>({
    business_type: type,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    identity: identity,
    work_note: work_note,
    worker_id: workerId,
    work_time: '1',
    work_time_hour: '0',
    overtime: ''
  })
  useEffect(()=>{
    let params = { ...postData};
    params.worker_id = workerId;
    params.business_type = type;
    params.work_note = work_note;
    params.identity = identity;
    setPostData(params)
  }, [workerId, type, work_note, identity])
  // 日期文本显示年月日
  useEffect(() => {
    let date = postData.business_time
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
  }, [postData.business_time])
  // 用户更新数据
  const userUpdatePostData = (val: string, type: string,value?:string,typeString?:string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    typeString && (postdata[typeString] = value);
    setPostData(postdata)
  }
  // 提交借支数据
  const userPostAcion = () => {
    userAddRecordAction(postData).then((res) => {
      
    })
  }
  // 设置获取值
  const setTime = (item:number,isClose:boolean) => {
    if (isClose) {
      if (item == 0) {
        userUpdatePostData('1', 'work_time', '0', 'work_time_hour')
      } else if (item == 1) {
        userUpdatePostData('0.5', 'work_time', '0', 'work_time_hour')
      } else if(item == 2){
        userUpdatePostData('0', 'work_time', '0','work_time_hour')
      }
    } else {
      userUpdatePostData('0', 'overtime')
    }
  }
  // 设置更多值
  const setMoreTime = (item:string,isClose:boolean) => {
    if (isClose) {
      userUpdatePostData(item, 'work_time_hour', '0', 'work_time');
    } else {
      userUpdatePostData(item, 'overtime')
    }
  }
  return (<View>
    <View className="person-record-time">
      <WorkTime set={(id) => setTime(id, true)} setTime={(value) => setMoreTime(value,true)} worktime={worktime} />
      {isPickerOverTime && <WorkTime close={() => setIsPickerOverTime(false)} setTime={(value) => setMoreTime(value, false)} set={(value) => setTime(value,false)} worktime={overtime} isClose={false} />}
    </View>
    {isPickerDate && <PickerDate
      date={postData.business_time}
      DeletePickerDate={() => setIsPickerDate(false)}
      change={(val) => userUpdatePostData(val, 'business_time')}
      dateText={dateText}
    />}
    {isPickerLeader && <PickerLeader leader="张三" DeletePickerLeader={() => setIsPickerLeader(false)} />}
    <PickerMark text={'Hello world!'} set={(val) => userUpdatePostData(val, 'note')} />
    <View className="person-record-component">
      {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={() => setIsPickerLeader(true)}>班组长</View>}
      {!isPickerOverTime && <View className="person-record-component-item" onClick={() => setIsPickerOverTime(true)}>加班时长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={userPostAcion} >确认记工</Button>
    </View>
  </View>)
}