import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import RecordDayPostData, { WorkTimeType } from './inter.d'
import PickerDate from '@/components/picker_date/index'
import PickerLeader from '@/components/picker_leader/index'
import PickerMark from '@/components/picker_mark/index'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import { AddressBookConfirmEvent } from '@/config/events'
import msg, { showBackModal } from '@/utils/msg'
import { getTodayDate } from '@/utils/index'
import userAddRecordAction from '../api'
import classifyItem from '@/store/classify/inter.d'
import { ADDRESSBOOKALONEPAGE } from '@/config/pages'
import WorkDayComponent from '@/components/work_day'
import './index.scss'

function RecordDay() {
  // 记工天 是否选中上班更多
  const [isWrok, setIsWork] = useState<boolean>(true)
  // 是否选中加班更多
  const [isOver, setIsOver] = useState<boolean>(true)
  // 上班时长的数据
  const [workTime, setWorkTime] = useState<WorkTimeType>({value: '1', text: '一个工'})
  // 加班时长的数据
  const [overTime, setOverTime] = useState<WorkTimeType>({ value: '0', text: '无加班' })
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordDayPostData>({
    business_type: 1,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    identity: 2,
    work_time: '1',
    work_time_hour: '0',
    overtime: '',
  })
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>({
    id: '',
    name: ''
  })
  // 日期文本显示年月日
  useEffect(() => {
    let date = postData.business_time
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
  }, [postData.business_time])
  // 注册事件 监听班组长的选择
  useEffect(() => {
    // 监听到了 班组长的回调 然后设置班组长的信息
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      setGroupLeader({ id: data.id, name: data.name })
      setIsPickerLeader(true)
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])
  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const { accountBookInfo } = localStore
  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }
  // 用户点击 班组长 圆角按钮 选择
  const userTapGroupLeaderBtn = () => {
    if (groupLeader.id) {
      setIsPickerLeader(true)
    } else {
      Taro.navigateTo({ url: ADDRESSBOOKALONEPAGE })
    }
  }
  // 提交借支数据
  const userPostAcion = () => {
    let params: RecordDayPostData = {
      business_type: 1,
      identity: 2,
      work_time: isWrok ? workTime.value : '',
      work_time_hour: !isWrok ? workTime.value : '',
      overtime: !isOver ? overTime.value : '',
      business_time: postData.business_time,
      group_leader: isPickerLeader ? groupLeader.id : '',
      note: postData.note,
      work_note: accountBookInfo.id
      
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }
  // 改变加班/上班 值
  const useChangeWorkTime = (data,type:string,typeValue?:string) => {
    if (typeValue == 'work'){
      setWorkTime(data)
      setIsWork(type === 'first' ? true : false)
    }else{
      setOverTime(data)
      setIsOver(type === 'first' ? true : false)
    }
  }
  return (<View>
    <View className="person-record-time">
      <WorkDayComponent 
        change={(data,type) => useChangeWorkTime(data,type,'work')}
        value={workTime}
        isSelect={!isWrok}
        type='work'
      />
      <WorkDayComponent
        title = {'加班时间'}
        change={(data, type) => useChangeWorkTime(data, type,'over')}
        value={overTime}
        isSelect={!isOver}
        type='over'
      />
    </View>
    {isPickerDate && <PickerDate
      date={postData.business_time}
      DeletePickerDate={() => setIsPickerDate(false)}
      change={(val) => userUpdatePostData(val, 'business_time')}
      dateText={dateText}
    />}
    {isPickerLeader && <PickerLeader leader={groupLeader.name} DeletePickerLeader={() => setIsPickerLeader(false)} />}
    <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')} />
    <View className="person-record-component">
      {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={() => userTapGroupLeaderBtn()}>班组长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={userPostAcion} >确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordDay)