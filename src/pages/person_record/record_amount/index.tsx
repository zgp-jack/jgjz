import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import PickerUnit from '@/components/picker_unit'
import PickerSubitem from '@/components/picker_subitem'
import RecordAmountPostData from './inter.d'
import { getTodayDate } from '@/utils/index'
import userAddRecordAction from '../api'
import './index.scss'


export default function RecordAmoumt() {

  // 是否显示分项组件
  const [isPickerSubitem, setIsPickSubitem] = useState<boolean>(false)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 记工量提交数据
  const [postData, setPostData] = useState<RecordAmountPostData>({
    business_type: 2,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    unit_num: '',
    unit: '平方米',
    unit_work_type:'',
    identity: 2,
    work_note: '890',
    worker_id: '1693'
  })
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
  // 用户关闭 分类组件
  const ColsePickerType = () => {
    setIsPickSubitem(false)
  }
  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setIsPickerLeader(false)
  }
  return (<View>
    <ContentInput title='工量' value={postData.unit_num} change={userUpdatePostData} type="unit_num" />
    <PickerUnit value={postData.unit} set={(data) => userUpdatePostData(data.id,'unit')} />
    {isPickerSubitem &&
      <PickerSubitem
        value={postData.unit_work_type}
        close={() => setIsPickSubitem(false)}
        set={(data) => { userUpdatePostData(data.id, 'unit_work_type') }}
      />
    }
    {isPickerDate && <PickerDate date={postData.business_time} DeletePickerDate={DeletePickerDate} change={(val) => userUpdatePostData(val, 'business_time')} />}
    {isPickerLeader && <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />}
    <PickerMark text={'Hello world!'} set={(val) => userUpdatePostData(val, 'note')} />
    <View className="person-record-component">
      {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{postData.business_time}</View>}
      {!isPickerLeader && <View className="person-record-component-item" onClick={() => setIsPickerLeader(true)}>班组长</View>}
      {!isPickerSubitem && <View className="person-record-component-item" onClick={() => { setIsPickSubitem(true); }}>{postData.unit_work_type ? postData.unit_work_type : '分项'}</View>}
    </View>
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}