import Taro, { useState, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button, Picker } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import ContentInput from '@/components/picker_input'
import PickerMark from '@/components/picker_mark'
import PickerUnit from '@/components/picker_unit'
import PickerSubitem from '@/components/picker_subitem'
import RecordAmountPostData, { PropsData } from './inter.d'
import AccountBookInfo from '@/store/account'
import { GroupAmountHistoryClassitifySubitem, GroupLastSuccessRecordPage, GroupAmountHistoryUnitId } from '@/config/store'
import { handleRecordSuccessSaveDate } from '@/utils/index'
import msg, { showActionModal } from '@/utils/msg'
import userAddRecordAction from '../api'
import classifyItem from '@/store/classify/inter.d'
import './index.scss'


function RecordAmoumt({ workerId, type, businessTime }: PropsData) {
  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const { accountBookInfo } = localStore
  // 获取历史分类数据
  let classifySubiteminfo: classifyItem = Taro.getStorageSync(GroupAmountHistoryClassitifySubitem);
  // 获取历史单位数据
  let UnitInfo: number = Taro.getStorageSync(GroupAmountHistoryUnitId) || 1
  // 是否显示备注输入框
  const [showMark, setShowMark] = useState<boolean>(false)
  // 是否显示分项组件
  const [isPickerSubitem, setIsPickSubitem] = useState<boolean>(!!classifySubiteminfo)
  // 是否显示选择分项
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 记工量提交数据
  const [postData, setPostData] = useState<RecordAmountPostData>({
    business_type: type,
    work_note: accountBookInfo.id,
    business_time: businessTime,
    note: '',
    unit_num: '',
    unit: 0,
    unit_work_type: '',
    identity: accountBookInfo.identity,
    worker_id: workerId
  })
  // 分项数据
  const [typeData, setTypeData] = useState<classifyItem>(classifySubiteminfo ? classifySubiteminfo : { id: '', name: '' })
  
 

  
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
      unit: postData.unit ? postData.unit : 1,
      identity: accountBookInfo.identity,
      business_type: type,
      unit_num: postData.unit_num ? postData.unit_num : '0',
      unit_work_type: isPickerSubitem ? typeData.id : '',
      worker_id: workerId
    }
    if (postData.unit_num) {
      if (!params.worker_id){
        msg('请选择工人')
        return
      }
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        if (isPickerSubitem && typeData.id) {
          Taro.setStorageSync(GroupAmountHistoryClassitifySubitem, typeData)
        } else {
          Taro.removeStorageSync(GroupAmountHistoryClassitifySubitem)
        }
        Taro.setStorageSync(GroupAmountHistoryUnitId, params.unit)
        Taro.setStorageSync(GroupLastSuccessRecordPage, params.business_type)
        showActionModal({
          msg: res.message,
          success: function () {
            Taro.redirectTo({
              url: '/pages/work_team_record/team_record/index'
            })
          }
        })
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
      typeData.id == '0' ? setIsPickSubitem(true) : setIsPickSubitem(false);
    }
  }
  
  // 用户获取分项数据
  const userSetSubitem = (data, type) => {
    type && (type.id == typeData.id) && Taro.removeStorageSync(GroupAmountHistoryClassitifySubitem)
    setTypeData(data);
    userUpdatePostData(data.id == '0' ? '' : data.id, 'unit_work_type')
  }

  return (<View>
    <ContentInput title='工量' maxLength={3} value={postData.unit_num} change={userUpdatePostData} type="unit_num" />
    <PickerUnit selected={UnitInfo - 1} set={(data) => { userUpdatePostData(data.id, 'unit'); setShowMark(true) }} setIsPickerMark={setShowMark} />
    {isPickerSubitem &&
      <PickerSubitem
        value={typeData}
        close={() => { setIsPickSubitem(false); setTypeData({ id: '', name: '' });setShowMark(true) }}
        onOptionClose={() => {userTapRightTopCloseBtn(); setShowMark(true)}}
        set={(data, type) => {userSetSubitem(data, type); setShowMark(true)}}
        show={showTypePicker}
        setShow={(bool: boolean) => setShowTypePicker(bool)}
        isRecord={true}
      />
    }
    {showMark && <PickerMark text={postData.note as string} set={(data) => userUpdatePostData(data, 'note')} />}
    <View className="person-record-component">
      {!isPickerSubitem && <View className="person-record-component-item" onClick={() => { setIsPickSubitem(true); setShowTypePicker(true);setShowMark(false) }}>分项</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordAmoumt)
