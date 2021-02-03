import Taro, {useState, useEffect, eventCenter} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import PickerMark from '@/components/picker_mark/index'
import {observer, useLocalStore} from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import msg, { showActionModal } from '@/utils/msg'
import {handleRecordSuccessSaveDate} from '@/utils/index'
import WorkDayComponent from '@/components/work_day'
import { GroupLastSuccessRecordPage } from '@/config/store'
import userAddRecordAction from '../api'
import RecordDayPostData, {WorkTimeType, PropsData} from './inter.d'

import './index.scss'

function RecordDay({workerId, type, businessTime}: PropsData) {
  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const {accountBookInfo} = localStore
  // 是否显示备注框
  const [showMark, setShowMark] = useState<boolean>(true)
  // 记工天 是否选中上班更多
  const [isWrok, setIsWork] = useState<boolean>(true)
  // 是否选中加班更多
  const [isOver, setIsOver] = useState<boolean>(true)
  // 上班时长的数据
  const [workTime, setWorkTime] = useState<WorkTimeType>({value: '1', text: '一个工'})
  // 加班时长的数据
  const [overTime, setOverTime] = useState<WorkTimeType>({value: '', text: '无加班'})
  const [isMoreTime, setIsMoreTime] = useState<boolean>(false)
  // 是否显示加班时间
  const [isOverTime, setIsOverTime] = useState<boolean>(false);
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordDayPostData>({
    business_type: type,
    business_time: businessTime,
    note: '',
    identity: accountBookInfo.identity,
    work_time: '1',
    work_time_hour: '0',
    overtime: '',
    worker_id: workerId,
    work_note: accountBookInfo.id
  })

  // 日期文本显示年月日
  useEffect(() => {
    let date = postData.business_time
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
  }, [postData.business_time])


  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = {...postData}
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    let params: RecordDayPostData = {
      business_type: type,
      identity: accountBookInfo.identity,
      work_time: isWrok ? workTime.value : '',
      work_time_hour: !isWrok ? workTime.value : '',
      overtime: (!isOver && isOverTime) ? overTime.value : '',
      business_time: businessTime,
      note: postData.note,
      work_note: accountBookInfo.id,
      worker_id: workerId
    }
    if(params.worker_id == ''){
      msg('请选择工人！')
      return
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        handleRecordSuccessSaveDate(params.business_time)
        showActionModal({
          msg: res.message,
          success: function () {
            Taro.redirectTo({
              url: '/pages/work_team_record/team_record/index'
            })
          }
        })
        Taro.setStorageSync(GroupLastSuccessRecordPage, params.business_type)
      } else {
        msg(res.message)
      }
    })
  }
  // 改变加班/上班 值
  const useChangeWorkTime = (data, type: string, typeValue?: string) => {
    if (typeValue == 'work') {
      setWorkTime(data)
      setIsWork(type === 'first' ? true : false)
    } else {
      setOverTime(data)
      setIsOver(type === 'first' ? true : false)
    }
  }
  const onOverTime = () => {
    setIsOverTime(true);
    setIsMoreTime(true);
  }


  const closeMoreTime = () => {
    if (!overTime.value){
      setIsOverTime(false);
    }
  }
  
  
  return (<View>
    <View className="person-record-time">
      <WorkDayComponent
        change={(data, type) => useChangeWorkTime(data, type, 'work')}
        value={workTime}
        isSelect={!isWrok}
        type='work'
      />
      {isOverTime && <WorkDayComponent
        title={'加班时长'}
        change={(data, type) => { useChangeWorkTime(data, type, 'over'); setShowMark(true)}}
        value={overTime}
        isSelect={!isOver}
        type='over'
        isClose={true}
        close={() => { setOverTime({ value: '', text: '无加班' }); setIsOverTime(false); setShowMark(true)}}
        isMoreTime={isMoreTime}
        closeMoreTime={closeMoreTime}
      />}
    </View>
    {showMark && <PickerMark text={postData.note as string} set={(val) => userUpdatePostData(val, 'note')} />}
    <View className="person-record-component">
      {!isPickerDate &&
      <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>}
      {!isOverTime && <View className="person-record-component-item" onClick={() => {onOverTime();setShowMark(false)}}>加班时长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={userPostAcion}>确认记工</Button>
    </View>
  </View>)
}

export default observer(RecordDay)
