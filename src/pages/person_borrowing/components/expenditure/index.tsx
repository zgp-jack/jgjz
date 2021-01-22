import { useState } from '@tarojs/taro'
import { View, Button } from  '@tarojs/components'
import ContentInput from '@/components/picker_input/index'
import PickerType from '@/components/picker_type'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import ExpenditurePostData from './inter.d'
import classifyItem from '@/store/classify/inter.d'
import './index.scss'
import { getTodayDate } from '@/utils/index'
import userAddBorrowAction from '@/pages/person_borrowing/api'

export default function Expenditure(){
  // 支出提交数据
  const [postData, setPostData] = useState<ExpenditurePostData>({
    business_type: 4,
    expend_type: '',
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    money: '0.00',
    identity: 2,
    work_note: '890',
    worker_id: '1693',
  })
  // 分类数据
  const [typeData, setTypeData] = useState<classifyItem>({ id: '', name: ''})
  // 是否显示分类组件
  const [isPickerType, setIsPickType] = useState<boolean>(false)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(false)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 是否显示选择分类
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: ExpenditurePostData = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    userAddBorrowAction(postData).then((res) => {
      debugger
    })
  }

  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setIsPickerLeader(false)
  }

  return (
    <View>
      <ContentInput type="money" title="金额" change={userUpdatePostData} value={postData.money} />
      {isPickerType && 
        <PickerType 
          value={typeData.name} 
          close={() => setIsPickType(false)} 
          set={(data) => { setTypeData(data); userUpdatePostData(data.name, 'expend_type')}} 
          show={showTypePicker} 
          setShow={(bool: boolean) => setShowTypePicker(bool) }
        />
      }
      {isPickerDate && <PickerDate date={postData.business_time} DeletePickerDate={DeletePickerDate} change={(val) => userUpdatePostData(val, 'business_time')} />}
      {isPickerLeader && <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />}
      <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')} />
      <View className="person-record-component">
        {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{postData.business_time}</View>}
        {!isPickerLeader && <View className="person-record-component-item" onClick={() => setIsPickerLeader(true)}>班组长</View>}
        {!isPickerType && <View className="person-record-component-item" onClick={() => { setIsPickType(true); setShowTypePicker(true) }}>{postData.expend_type ? postData.expend_type : '分类'}</View>}
      </View>
      <View className="person-record-btn">
        <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
      </View>
    </View>
  )
}