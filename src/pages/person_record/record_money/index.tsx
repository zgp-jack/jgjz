import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import './index.scss'


export default function RecordMoney() {

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
    {IsPickerDate && <PickerDate date={'2021-01-20'} DeletePickerDate={DeletePickerDate} />}
    {IsPickerLeader && <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />}
    <PickerMark text={'Hello world!'} />
    <View className="person-record-btn">
      <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}