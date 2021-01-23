import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import RecordMoneyPostData from './inter.d'
import { getTodayDate } from '@/utils/index'
import userAddRecordAction from '../api'
import './index.scss'

export default function RecordMoney() {
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 记工钱提交数据
  const [postData, setPostData] = useState<RecordMoneyPostData>({
    business_type: 3,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    money: '',
    identity: 2,
    work_note: '890',
    worker_id: '1693'
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
    let postdata: any = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    userAddRecordAction(postData).then((res) => {
      debugger
    })
  }
  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭 班组组件
  const DeletePickerLeader = () => {
    setIsPickerLeader(false)
  }
  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
    {isPickerDate && <PickerDate 
      date={postData.business_time} 
      DeletePickerDate={DeletePickerDate} 
      change={(val) => userUpdatePostData(val, 'business_time')}
      dateText={dateText} 
    />}
    {isPickerLeader && <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />}
    <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')} />
    <View className="person-record-component">
      {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={() => setIsPickerLeader(true)}>班组长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}