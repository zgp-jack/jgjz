import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import PickerDetail from '@/components/picker_detail'
import PickerType from '@/components/picker_type'
import PickerUnitWara from '@/components/picker_unit'
import './index.scss'


export default function ModifyAmoumt() {

  // 是否显示分类组件
  const [IsPickerType, setIsPickType] = useState<boolean>(true)
  // 是否显示日期组件
  const [IsPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [IsPickerLeader, setIsPickerLeader] = useState<boolean>(true)
  // 借支提交数据
  const [postData, setPostData] = useState<any>({
    expend_type: 4,
    business_type: '',
    date: '',
    group_id: '',
    note: '',
    money: '0.00'
  })
  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = { ...postData }
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
  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
    <PickerUnitWara value="平方米" />
    <PickerType value="水电费" ColsePickerType={ColsePickerType} />
    <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />
    <PickerMark text={'Hello world!'} />
    <PickerDetail dateValue='2021-1-21' submitValue="2021年1月20日" projectValue='国际' />
    <View className="person-record-btn">
      <Button className="person-record-resave">删除</Button>
      <Button className="person-record-save">保存修改</Button>
    </View>
  </View>)
}