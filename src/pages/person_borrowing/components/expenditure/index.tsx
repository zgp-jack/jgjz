import { useState } from '@tarojs/taro'
import { View, Button } from  '@tarojs/components'
import ContentInput from '@/components/picker_input/index'
import PickerType from '@/components/picker_type'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import ExpenditurePostData from './inter.d'
import './index.scss'

export default function Expenditure(){
  // 支出提交数据
  const [postData, setPostData] = useState<ExpenditurePostData>({
    expend_type: 4,
    business_type: '',
    date: '',
    group_id: '',
    note: '',
    money: '0.00'
  })

  // 是否显示分类组件
  const [IsPickerType, setIsPickType] = useState<boolean>(true)
  // 是否显示日期组件
  const [IsPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [IsPickerLeader, setIsPickerLeader] = useState<boolean>(true)

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: ExpenditurePostData = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    console.log(postData)
  }

  // 用户关闭 分类组件
  const ColsePickerType = () => {
    setIsPickType(false)
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
      {IsPickerType && <PickerType value="水电费" ColsePickerType={ColsePickerType} />}
      {IsPickerDate && <PickerDate date={'2021-01-20'} DeletePickerDate={DeletePickerDate} />}
      {IsPickerLeader && <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />}
      <PickerMark text={'Hello world!'} />
      <View className="person-record-component">
          {!IsPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>2021-01-20</View>}
          {!IsPickerLeader && <View className="person-record-component-item" onClick={() => setIsPickerLeader(true)}>班组长</View>}
          {!IsPickerType && <View className="person-record-component-item" onClick={() => setIsPickType(true)}>分类</View>}
      </View>
      <View className="person-record-btn">
        <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
      </View>
    </View>
  )
}