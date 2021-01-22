import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerType from '@/components/picker_type'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import PickerDetail from '@/components/picker_detail'
import './index.scss'

export default function ModifyBorrow() {

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
  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
    <PickerType value="水电费" ColsePickerType={() => {}} />
    <PickerLeader leader={'张三'} DeletePickerLeader={() => {}} />
    <PickerMark text={'Hello world!'} />
    <PickerDetail dateValue='2021-1-21' submitValue="2021年1月20日" projectValue='国际' />
    <View className="person-record-btn">
      <Button className="person-record-resave">删除</Button>
      <Button className="person-record-save">保存修改</Button>
    </View>
  </View>)
}