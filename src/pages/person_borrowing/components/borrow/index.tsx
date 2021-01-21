import { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '../../../../components/picker_input/index'
import PickerType from '@/components/picker_type'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import BorrowPostData from './inter.d'
import { getTodayDate } from '@/utils/index'
import classifyItem from '@/store/classify/inter.d'
import './index.scss'
import userAddBorrowAction from '@/pages/person_borrowing/api'

export default function Borrow() {

  // 是否显示分类组件
  const [isPickerType, setIsPickType] = useState<boolean>(false)
  // 是否显示选择分类
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(false)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 分类数据
  const [typeData, setTypeData] = useState<classifyItem>({ id: '', name: '' })
  // 借支提交数据
  const [postData, setPostData] = useState<BorrowPostData>({
    expend_type: 4,
    business_type: '',
    business_time: getTodayDate(),
    group_id: '',
    note:  '',
    money: '0.00'
  })

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: BorrowPostData = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    let postDataMock = JSON.parse(JSON.stringify(postData));
    // postDataMock.work_note = '1';
    // postDataMock.identity ='1';
    // postDataMock.worker_id = '1'
    userAddBorrowAction(postDataMock).then((res) => {
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
  // 用户修改日期
  const userChangeDate = (val: string) => {
    let data = { ...postData }
    data.business_time = val
    setPostData({ ...data })
  }
  return (
    <View>
      <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
      {isPickerType &&
        <PickerType
          value={typeData.name}
          close={() => setIsPickType(false)}
          set={(data) => { setTypeData(data); userUpdatePostData(data.name,'business_type')}}
          show={showTypePicker}
          setShow={(bool: boolean) => setShowTypePicker(bool)}
        />
      }
      {isPickerDate && <PickerDate date={postData.business_time} DeletePickerDate={DeletePickerDate} change={(val) => userChangeDate(val)} />}
      {isPickerLeader && <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />}
      <PickerMark text={'Hello world!'} set={(data) => userUpdatePostData(data,'note')} />
      <View className="person-record-component">
          {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>2021-01-20</View>}
          {!isPickerLeader && <View className="person-record-component-item" onClick={() => setIsPickerLeader(true)}>班组长</View>}
          {!isPickerType && <View className="person-record-component-item" onClick={() => setIsPickType(true)}>分类</View>}
      </View>
      <View className="person-record-btn">
        <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
      </View>
    </View>
  )
}
