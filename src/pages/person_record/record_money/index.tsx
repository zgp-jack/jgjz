import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button, Picker } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import RecordMoneyPostData from './inter.d'
import { observer, useLocalStore } from '@tarojs/mobx'
import { AddressBookConfirmEvent } from '@/config/events'
import AccountBookInfo from '@/store/account'
import {getTodayDate, handleRecordSuccessSaveDate} from '@/utils/index'
import { ADDRESSBOOKALONEPAGE } from '@/config/pages'
import { PersonlMoneyHistoryGroupLeader, PersonlLastSuccessRecordPage } from '@/config/store'
import msg, { showBackModal } from '@/utils/msg'
import userAddRecordAction from '../api'
import { validNumber } from '@/utils/v'
import classifyItem from '@/store/classify/inter.d'
import './index.scss'

function RecordMoney() {
  // 获取历史班组长数据
  let leaderInfo: classifyItem = Taro.getStorageSync(PersonlMoneyHistoryGroupLeader)
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(!!leaderInfo)
  // 记工钱提交数据
  const [postData, setPostData] = useState<RecordMoneyPostData>({
    business_type: 3,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    money: '',
    identity: 2,
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

  // 提交借支数据
  const userPostAcion = () => {
    let params: RecordMoneyPostData = {
      group_leader: isPickerLeader ? groupLeader.id : '',
      note: postData.note,
      work_note: accountBookInfo.id,
      business_type: 3,
      business_time: postData.business_time,
      money: postData.money,
      identity: 2,
    }
    if (postData.money) {
      if (!validNumber(params.money)) {
        msg('请输入正确的金额')
        return
      }
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        if (isPickerLeader && groupLeader.id) {
          Taro.setStorageSync(PersonlMoneyHistoryGroupLeader, groupLeader)
        } else {
          Taro.removeStorageSync(PersonlMoneyHistoryGroupLeader)
        }
        Taro.setStorageSync(PersonlLastSuccessRecordPage, params.business_type)
        showBackModal(res.message)
        handleRecordSuccessSaveDate(params.business_time)
      } else {
        msg(res.message)
      }
    })
  }
  // 用户点击 班组长 圆角按钮 选择
  const userTapGroupLeaderBtn = () => {
    if (groupLeader.id) {
      setIsPickerLeader(true)
    } else {
      Taro.navigateTo({ url: ADDRESSBOOKALONEPAGE })
    }
  }
  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭 班组组件
  const DeletePickerLeader = () => {
    setGroupLeader({ id: '', name: '' })
    setIsPickerLeader(false)
  }


  // 用户更新时间选择器
  const userChangePicker = (e) => {
    let value = e.detail.value
    userUpdatePostData(value, 'business_time')
  }

  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
    {isPickerDate && <PickerDate
      date={postData.business_time}
      DeletePickerDate={DeletePickerDate}
      change={(val) => userUpdatePostData(val, 'business_time')}
      dateText={dateText}
    />}
    {isPickerLeader && <PickerLeader leader={groupLeader} DeletePickerLeader={DeletePickerLeader} />}
    <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')} />
    <View className="person-record-component">
      {!isPickerDate && 
        <Picker mode='date' value={postData.business_time} onChange={(e) => userChangePicker(e)} end={getTodayDate()} onCancel={() => setIsPickerDate(false)} >
          <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>
      </Picker>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={() => userTapGroupLeaderBtn()}>班组长</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordMoney)
