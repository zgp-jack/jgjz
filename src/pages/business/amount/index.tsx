import Taro, { useState, useRouter, useEffect, eventCenter, Config } from '@tarojs/taro'
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
  const { id = '' } = router.params
  // 是否显示班组长 组件
  const [groupLeader, setGroupLeader] = useState<ClassifyItem>({
    id: '',
    name: ''
  })
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
      userGetBusinessInfo()
    }
  }, [id])
  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      setGroupLeader({id: data.id, name: data.name})
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
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
        setGroupLeader({ id: mydata.group_leader || '', name: mydata.group_leader_name || ''})
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

  // 用户清除 分项信息
  const userClearSubitemType = () => {
    setTypeData({id: '', name: ''})
    setPostData({ ...postData, unit_work_type: ''})
  }

  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该信息吗？',
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
    let params: UserEditBusinessInfo = {
      ...postData,
      group_leader: groupLeader.id
    }
    editBorrowBusiness(params).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  // 用户 删除 班组长
  const DeletePickerLeader = () => {
    setGroupLeader({id: '', name: ''})
  }
  return (<View>
    <ContentInput title='工量' value={data.unit_num} change={userUpdatePostData} type="unit_num"  />
    <PickerUnitWara set={(data) => userUpdatePostData(data.id,'unit')}  />
    <PickerSubitem
      value={typeData.name}
      show={show}
      setShow={() => { setShow(!show) }}
      set={(data) => userChangePickerType(data)}
      close={() => userClearSubitemType()}
    />
    <PickerLeader leader={groupLeader.name} DeletePickerLeader={() => DeletePickerLeader()} />
    <PickerMark text={postData.note} />
    <PickerDetail dateValue={data.created_time_string} submitValue={data.busienss_time_string} projectValue={data.work_note_name} />
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  </View>)
}

BusinessAmount.config = {
  navigationBarTitleText: '修改工量'
} as Config