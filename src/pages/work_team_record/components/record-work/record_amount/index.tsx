import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import PickerUnit from '@/components/picker_unit'
import PickerSubitem from '@/components/picker_subitem'
import AccountBookInfo from '@/store/account'
import { ADDRESSBOOKALONEPAGE } from '@/config/pages'
import { AddressBookConfirmEvent } from '@/config/events'
import {getTodayDate, handleRecordSuccessSaveDate} from '@/utils/index'
import msg, { showBackModal, showModal } from '@/utils/msg'
import { GroupLastSuccessRecordPage } from '@/config/store'
import { validNumber } from '@/utils/v'
import classifyItem from '@/store/classify/inter.d'
import RecordAmountPostData, { UnitTpey, PropsData } from './inter.d'
import userAddRecordAction from '../api'
import './index.scss'


function RecordAmoumt({ workerId, type, businessTime }: PropsData) {
  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const { accountBookInfo } = localStore
  // 是否显示分项组件
  const [isPickerSubitem, setIsPickSubitem] = useState<boolean>(false)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 是否显示选择分类
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 记工量提交数据
  const [postData, setPostData] = useState<RecordAmountPostData>({
    business_type: type || 1,
    business_time: businessTime,
    work_note: accountBookInfo.id,
    note: '',
    unit_num: '',
    unit: 0,
    unit_work_type:'',
    identity: Number(accountBookInfo.identity),
    worker_id: workerId
  })
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>({
    id: '',
    name: ''
  })
  // 分项数据
  const [typeData, setTypeData] = useState<classifyItem>({ id: '', name: '' })

  // 注册事件 监听班组长的选择
  useEffect(() => {
    // 监听到了 班组长的回调 然后设置班组长的信息
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      setGroupLeader({ id: data.id, name: data.name })
      setIsPickerLeader(true)
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }
  // 提交数据
  const userPostAcion = () => {
    let params: RecordAmountPostData = {
      note: postData.note,
      work_note: accountBookInfo.id,
      business_time: businessTime,
      unit: postData.unit,
      identity: Number(accountBookInfo.identity),
      business_type: type || 2,
      unit_num: postData.unit_num,
      unit_work_type: isPickerSubitem ? postData.unit_work_type : '',
      worker_id: workerId
    }
    if(params.worker_id == ''){
      msg('请选择工人！')
      return
    }
    if (postData.unit_num) {
      if (!validNumber(params.unit_num)) {
        msg('请输入正确的工量')
        return
      }
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        showModal(res.message)
        Taro.setStorageSync(GroupLastSuccessRecordPage, params.business_type)
        handleRecordSuccessSaveDate(params.business_time)
      } else {
        msg(res.message)
      }
    })
  }
  // 用户点击分类组件  右上角关闭
  const userTapRightTopCloseBtn = () => {
    // 如果没有设置过分类数据
    if (!typeData.id) {
      // 关闭options弹窗
      setShowTypePicker(false)
      // 关闭 分类 选项
      setIsPickSubitem(false)
    }
  }

  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setIsPickerLeader(false)
  }
  return (<View>
    <ContentInput title='工量' value={postData.unit_num} change={userUpdatePostData} type='unit_num' />
    <PickerUnit set={(data) => userUpdatePostData(data.id,'unit')} />
    {isPickerSubitem &&
      <PickerSubitem
        value={typeData}
        close={() => setIsPickSubitem(false)}
        onOptionClose={() => userTapRightTopCloseBtn()}
        set={(data) => { setTypeData(data);userUpdatePostData(data.id, 'unit_work_type') }}
        show={showTypePicker}
        setShow={(bool: boolean) => setShowTypePicker(bool)}
      />
    }
    {isPickerLeader && <PickerLeader leader={groupLeader} DeletePickerLeader={DeletePickerLeader} />}
    <PickerMark text={postData.note as string} set={(data) => userUpdatePostData(data, 'note')} />
    <View className='person-record-component'>
      {!isPickerSubitem && <View className='person-record-component-item' onClick={() => { setIsPickSubitem(true); setShowTypePicker(true) }}>分项</View>}
    </View>
    <View className='person-record-btn'>
      <Button className='person-record-save' onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordAmoumt)
