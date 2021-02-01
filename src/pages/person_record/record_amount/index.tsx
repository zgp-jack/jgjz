import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button, Picker } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import PickerUnit from '@/components/picker_unit'
import PickerSubitem from '@/components/picker_subitem'
import RecordAmountPostData from './inter.d'
import AccountBookInfo from '@/store/account'
import { ADDRESSBOOKALONEPAGE } from '@/config/pages'
import { AddressBookConfirmEvent } from '@/config/events'
import { PersonlAmountHistoryGroupLeader, PersonlAmountHistoryClassitifySubitem, PersonlLastSuccessRecordPage, PersonlAmountHistoryUnitId } from '@/config/store'
import { getTodayDate } from '@/utils/index'
import msg, { showBackModal } from '@/utils/msg'
import { validNumber } from '@/utils/v'
import userAddRecordAction from '../api'
import classifyItem from '@/store/classify/inter.d'
import './index.scss'


function RecordAmoumt() {
  // 获取历史班组长数据
  let leaderInfo: classifyItem = Taro.getStorageSync(PersonlAmountHistoryGroupLeader)
  // 获取历史分类数据
  let classifySubiteminfo: classifyItem = Taro.getStorageSync(PersonlAmountHistoryClassitifySubitem);
  // 获取历史单位数据
  let UnitInfo: number = Taro.getStorageSync(PersonlAmountHistoryUnitId) || 1
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否显示分项组件
  const [isPickerSubitem, setIsPickSubitem] = useState<boolean>(!!classifySubiteminfo)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(!!leaderInfo)
  // 是否显示选择分项
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 记工量提交数据
  const [postData, setPostData] = useState<RecordAmountPostData>({
    business_type: 1,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    unit_num: '',
    unit: 0,
    unit_work_type:'',
    identity: 2,
  })
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>(leaderInfo ? leaderInfo : {id: '', name: '' })
  // 分项数据
  const [typeData, setTypeData] = useState<classifyItem>(classifySubiteminfo ? classifySubiteminfo : { id: '', name: '' })
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
  // 提交数据
  const userPostAcion = () => {
    let params: RecordAmountPostData = {
      group_leader: isPickerLeader ? groupLeader.id : '',
      note: postData.note,
      work_note: accountBookInfo.id,
      business_time: postData.business_time,
      unit: postData.unit ? postData.unit : 1,
      identity: accountBookInfo.identity,
      business_type: 2,
      unit_num: postData.unit_num ? postData.unit_num : '0',
      unit_work_type: isPickerSubitem ? typeData.id : '',
    }
    if (postData.unit_num) {
      if (!validNumber(params.unit_num)) {
        msg('请输入正确的工量')
        return
      }
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        if (isPickerSubitem && typeData.id) {
          Taro.setStorageSync(PersonlAmountHistoryClassitifySubitem, typeData)
        } else {
          Taro.removeStorageSync(PersonlAmountHistoryClassitifySubitem)
        }
        if (isPickerLeader && groupLeader.id) {
          Taro.setStorageSync(PersonlAmountHistoryGroupLeader, groupLeader)
        } else {
          Taro.removeStorageSync(PersonlAmountHistoryGroupLeader)
        }
        Taro.setStorageSync(PersonlAmountHistoryUnitId, params.unit)
        Taro.setStorageSync(PersonlLastSuccessRecordPage, params.business_type)
        showBackModal(res.message)
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
  // 用户点击分类组件  右上角关闭 
  const userTapRightTopCloseBtn = () => {
    // 如果没有设置过分类数据
    if (!typeData.id) {
      // 关闭options弹窗
      setShowTypePicker(false)
      // 关闭 分类 选项
      typeData.id == '0' ? setIsPickSubitem(true) : setIsPickSubitem(false);
    }
  }
  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setGroupLeader({ id: '', name: '' })
    setIsPickerLeader(false)
  }
  // 用户获取分项数据
  const userSetSubitem = (data,type) => {
    type && (type.id == typeData.id) && Taro.removeStorageSync(PersonlAmountHistoryClassitifySubitem)
    setTypeData(data); 
    userUpdatePostData(data.id == '0' ? '' : data.id, 'unit_work_type') 
  }

  // 用户更新时间选择器
  const userChangePicker = (e) => {
    let value = e.detail.value
    userUpdatePostData(value, 'business_time')
  }

  return (<View>
    <ContentInput title='工量' maxLength={3} value={postData.unit_num} change={userUpdatePostData} type="unit_num" />
    <PickerUnit selected={UnitInfo-1} set={(data) => userUpdatePostData(data.id,'unit')} />
    {isPickerSubitem &&
      <PickerSubitem
        value={typeData}
        close={() => { setIsPickSubitem(false); setTypeData({ id: '', name: '' })}}
        onOptionClose={() => userTapRightTopCloseBtn()}
        set={(data,type) => userSetSubitem(data,type)}
        show={showTypePicker}
        setShow={(bool: boolean) => setShowTypePicker(bool)}
        isRecord = {true}
      />
    }
    {isPickerDate && <PickerDate
      date={postData.business_time}
      DeletePickerDate={DeletePickerDate}
      change={(val) => userUpdatePostData(val, 'business_time')}
      dateText={dateText}
    />}
    {isPickerLeader && <PickerLeader leader={groupLeader} DeletePickerLeader={DeletePickerLeader} />}
    <PickerMark text={postData.note} set={(data) => userUpdatePostData(data, 'note')} />
    <View className="person-record-component">
      {!isPickerDate && 
      <Picker mode='date' value={postData.business_time} onChange={(e) => userChangePicker(e)} end={getTodayDate()} onCancel={() => setIsPickerDate(false)} >
          <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>
        </Picker>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={userTapGroupLeaderBtn}>班组长</View>}
      {!isPickerSubitem && <View className="person-record-component-item" onClick={() => { setIsPickSubitem(true); setShowTypePicker(true) }}>分项</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordAmoumt)