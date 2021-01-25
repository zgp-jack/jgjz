import Taro, { useState, useRouter, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import PickerDetail from '@/components/picker_detail'
import PickerType from '@/components/picker_type'
import PickerSubitem from '@/components/picker_subitem'
import PickerUnitWara from '@/components/picker_unit'
import BusinessInfoResult, { UserEditBusinessInfo, ClassifyItem } from './inter.d'
import msg, { showActionModal, showBackModal } from '@/utils/msg'
import { AddressBookConfirmEvent } from '@/config/events'
import getBorrowInfo, { delBorrowBusiness, editBorrowBusiness } from './api'
import './index.scss'

export default function BusinessAmount() {
  // 根据路由获取id参数
  const router = useRouter()
  const { id = '11151' } = router.params
  // 是否显示分类组件
  const [IsPickerType, setIsPickType] = useState<boolean>(true)
  // 是否显示日期组件
  const [IsPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [IsPickerLeader, setIsPickerLeader] = useState<boolean>(true)
  // 是否显示分项数据
  const [show, setShow] = useState<boolean>(false)
  // 分项数据
  const [typeData, setTypeData] = useState<ClassifyItem>({
    id: '',
    name: ''
  })
  // 提交工量数据
  const [postData, setPostData] = useState<UserEditBusinessInfo>({
    id: id,
    group_leader: '',
    note: '',
    unit_num: '',
    unit: '',
    unit_work_type: '',
  })
  // 接口返回的初始值
  const [data, setData] = useState<BusinessInfoResult>({
    id: parseInt(id),
    work_note: 0,
    group_leader: '',
    unit_num: '',
    created_time_string: '',
    busienss_time_string: '',
    note: '',
    work_note_name: '',
    unit_work_type: '',
    unit: '',
    group_leader_name: '',
    unit_work_type_name:''
  })
  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }
  useEffect(() => {
    if (id) {
      Taro.setNavigationBarTitle({ title: '修改工量' })
      userGetBusinessInfo()
    }
  }, [id])
  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      setData({ ...data, group_leader: data.id, group_leader_name: data.name })
      setPostData({ ...postData, group_leader: data.id })
    })
    return eventCenter.off(AddressBookConfirmEvent)
  }, [])
  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getBorrowInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData({
          ...mydata,
          unit_num: mydata.unit_num || ''
        })
        setTypeData({ id: mydata.unit_work_type, name: mydata.unit_work_type_name })
        setPostData({
          ...postData,
          unit_work_type: mydata.unit_work_type || '',
          note: mydata.note || "",
          unit: mydata.unit || '',
          unit_num: mydata.unit_num || '',
          group_leader: mydata.group_leader || ''
        })
      } else {
        msg(res.message)
      }
    })
  }
  // 用户修改分类信息
  const userChangePickerType = (data: ClassifyItem) => {
    setTypeData(data)
    setPostData({ ...postData, unit_work_type: data.name })
  }
  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该笔借支吗？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          delBorrowBusiness(id).then(res => {
            if (res.code === 0) {
              showBackModal(res.message)
            } else {
              msg(res.message)
            }
          })
        }
      }
    })
  }
  // 用户修改流水
  const userEditBusiness = () => {
    debugger
    editBorrowBusiness(postData).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }
  // 用户关闭 分类组件
  const ColsePickerType = () => {
    setIsPickType(false)
  }
  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setIsPickerLeader(false)
  }
  return (<View>
    <ContentInput title='工量' value={data.unit_num} change={userUpdatePostData} type="unit_num" />
    <PickerUnitWara set={(data) => userUpdatePostData(data.id,'unit')} />
    <PickerSubitem
      value={typeData.name}
      show={show}
      setShow={() => { setShow(!show) }}
      rightClose={false}
      set={(data) => userChangePickerType(data)}
    />
    <PickerLeader leader={'张三'} DeletePickerLeader={DeletePickerLeader} />
    <PickerMark text={'Hello world!'} />
    <PickerDetail dateValue='2021-1-21' submitValue="2021年1月20日" projectValue='国际' />
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  </View>)
}