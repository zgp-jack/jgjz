import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import RecordDayPostData from './inter.d'
import { worktime, overtime } from './config'
import WorkTime from '@/pages/person_borrowing/components/work_time/index'
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
import './index.scss'

function RecordDay() {
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 是否显示加班组件
  const [isPickerOverTime, setIsPickerOverTime] = useState<boolean>(false)
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordDayPostData>({
    business_type: 1,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    identity: 2,
    work_time: '1',
    work_time_hour: '0',
    overtime: ''
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
  const userUpdatePostData = (val: string, type: string,value?:string,typeString?:string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    typeString && (postdata[typeString] = value);
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
      work_time: postData.work_time,
      work_time_hour: postData.work_time_hour,
      overtime: isPickerOverTime ? postData.overtime:'',
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
  // 设置获取值 加班/上班
  const setTime = (item:number,isClose:boolean) => {
    if (isClose) {
      let arr = ['1','0.5','0']
      userUpdatePostData(arr[item], 'work_time', '0', 'work_time_hour')
    } else {
      userUpdatePostData('0', 'overtime')
    }
  }
  // 设置更多值 加班/上班
  const setMoreTime = (item:string,isClose:boolean) => {
    if (isClose) {
      userUpdatePostData(item, 'work_time_hour', '0', 'work_time');
    } else {
      userUpdatePostData(item, 'overtime')
    }
  }
  return (<View>
    <View className="person-record-time">
      <WorkTime set={(id) => setTime(id, true)} setTime={(value) => setMoreTime(value,true)} />
      {isPickerOverTime && <WorkTime 
        close={() => setIsPickerOverTime(false)} 
        setTime={(value) => setMoreTime(value, false)} 
        set={(value) => setTime(value,false)} 
        isClose={false} />
      }
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
      {!isPickerOverTime && <View className="person-record-component-item" onClick={() => setIsPickerOverTime(true)}>加班时长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={userPostAcion} >确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordDay)