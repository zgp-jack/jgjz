import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button, Picker } from '@tarojs/components'
import RecordDayPostData, { WorkTimeType } from './inter.d'
import PickerDate from '@/components/picker_date/index'
import PickerLeader from '@/components/picker_leader/index'
import PickerMark from '@/components/picker_mark/index'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import { AddressBookConfirmEvent } from '@/config/events'
import { PersonlLastSuccessRecordPage, PersonlWorkdayHistoryGroupLeader } from '@/config/store'
import msg, { showBackModal,showActionModal } from '@/utils/msg'
import { getTodayDate,handleRecordSuccessSaveDate } from '@/utils/index'
import userAddRecordAction from '../api'
import classifyItem from '@/store/classify/inter.d'
import { ADDRESSBOOKALONEPAGE, INDEXPAGE } from '@/config/pages'
import WorkDayComponent from '@/components/work_day'
import './index.scss'

function RecordDay({type}:{type: string}) {
  // 获取历史班组长数据
  let leaderInfo: classifyItem = Taro.getStorageSync(PersonlWorkdayHistoryGroupLeader)
  // 记工天 是否选中上班更多
  const [isWrok, setIsWork] = useState<boolean>(true)
  // 是否选中加班更多
  const [isOver, setIsOver] = useState<boolean>(true)
  // 上班时长的数据
  const [workTime, setWorkTime] = useState<WorkTimeType>({value: '1', text: '一个工'})
  // 加班时长的数据
  const [overTime, setOverTime] = useState<WorkTimeType>({value: '', text: ''})
  // 设置更多时间组件显示
  const [isMoreTime, setIsMoreTime] = useState<boolean>(false)
  // 是否显示加班时间
  const [isOverTime, setIsOverTime] = useState<boolean>(false);
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(!!leaderInfo)
  // 是否显示备注
  const [isPickerMark, setIsPickerMark] = useState<boolean>(true)
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordDayPostData>({
    business_type: 2,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    identity: 2,
    work_time: '1',
    work_time_hour: '0',
    overtime: '',
  })
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>(leaderInfo ? leaderInfo : {
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
      setGroupLeader({id: data.id, name: data.name})
      setIsPickerLeader(true)
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])

  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const {accountBookInfo} = localStore

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = {...postData}
    postdata[type] = val
    setPostData(postdata)
  }
  // 用户点击 班组长 圆角按钮 选择
  const userTapGroupLeaderBtn = () => {
    if (groupLeader.id) {
      setIsPickerLeader(true)
    } else {
      Taro.navigateTo({url: ADDRESSBOOKALONEPAGE})
    }
  }
  // 提交借支数据
  const userPostAcion = () => {
    let params: RecordDayPostData = {
      business_type: 1,
      identity: 2,
      work_time: isWrok ? workTime.value : '',
      work_time_hour: !isWrok ? workTime.value : '',
      overtime: (!isOver && isOverTime) ? overTime.value : '',
      business_time: postData.business_time,
      group_leader: isPickerLeader ? groupLeader.id : '',
      note: postData.note,
      work_note: accountBookInfo.id

    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        if (isPickerLeader && groupLeader.id) {
          Taro.setStorageSync(PersonlWorkdayHistoryGroupLeader, groupLeader)
        } else {
          Taro.removeStorageSync(PersonlWorkdayHistoryGroupLeader)
        }
        Taro.setStorageSync(PersonlLastSuccessRecordPage, params.business_type)
        handleRecordSuccessSaveDate(params.business_time)
        if(type == '1'){
          showActionModal({
            msg: res.message,
            success: () => Taro.reLaunch({ url: INDEXPAGE })
          })
        }else{
          showBackModal(res.message)
        }
      } else {
        msg(res.message)
      }
    })
  }
  // 改变加班/上班 值
  const useChangeWorkTime = (data, type: string, typeValue?: 'work' | 'over') => {
    if (typeValue == 'work') {
      setWorkTime(data)
      setIsWork(type === 'first' ? true : false)
    } else {
      setOverTime(data)
      setIsOver(type === 'first' ? true : false)
      setIsMoreTime(false)
    }
  }
  // 点击圆角加班时间
  const userTapOverTimeBtn = () => {
    setIsPickerMark(false)
    setIsMoreTime(true)
    setIsOverTime(true)
  }
  const closeMoreTime = () => {
    if (!overTime.value) {
      setIsOverTime(false)
      setIsMoreTime(false)
    }
  }

  // 用户关闭加班组件
  const userCloseOverTimePcker = () => {
    setOverTime({value: '', text: ''});
    setIsOver(true);
    setIsOverTime(false)
  }

  // 用户更新时间选择器
  const userChangePicker = (e) => {
    let value = e.detail.value
    userUpdatePostData(value, 'business_time')
  }

  return (<View>
    <View className="person-record-time">
      <WorkDayComponent
        change={(data, type) => useChangeWorkTime(data, type, 'work')}
        value={workTime}
        isSelect={!isWrok}
        type='work'
        setIsPickerMark={setIsPickerMark}
      />
      {isOverTime && <WorkDayComponent
        title={'加班时长'}
        change={(data, type) => useChangeWorkTime(data, type, 'over')}
        value={overTime}
        isSelect={!isOver}
        type='over'
        isClose={true}
        close={() => userCloseOverTimePcker()}
        isMoreTime={isMoreTime}
        closeMoreTime={() => closeMoreTime()}
        setIsPickerMark={setIsPickerMark}
      />}
    </View>
    {isPickerDate && <PickerDate
      date={postData.business_time}
      DeletePickerDate={() => setIsPickerDate(false)}
      change={(val) => userUpdatePostData(val, 'business_time')}
      dateText={dateText}
    />}
    {isPickerLeader && <PickerLeader leader={groupLeader} DeletePickerLeader={() => {
      setGroupLeader({id: '', name: ''});
      setIsPickerLeader(false)
    }}/>}
    {isPickerMark && <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')}/>}
    <View className="person-record-component">
      {!isPickerDate &&
      <Picker mode='date' value={postData.business_time} onChange={(e) => userChangePicker(e)} end={getTodayDate()} onCancel={() => setIsPickerDate(false)} >
        <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>
      </Picker>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={() => userTapGroupLeaderBtn()}>班组长</View>}
      {!isOverTime && <View className="person-record-component-item" onClick={() => userTapOverTimeBtn()}>加班时长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={userPostAcion}>确认记工</Button>
    </View>
  </View>)
}

export default observer(RecordDay)
