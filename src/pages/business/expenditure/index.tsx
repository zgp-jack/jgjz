import Taro, { useState, useRouter, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import msg, { showActionModal, showBackModal } from '@/utils/msg'
import PickerMark from '@/components/picker_mark'
import PickerType from '@/components/picker_type'
import PickerDetail from '@/components/picker_detail'
import PickerLeader from '@/components/picker_leader'
import getExpenditureInfo, { delExpenditureBusiness, editExpenditureBusiness } from './api'
import ClassifyItem from '@/store/classify/inter.d'
import { BusinessInfoResult, UserEditBusinessInfo } from './inter.d'
import './index.scss'
import { editBorrowBusiness } from '@/pages/business/borrow/api'
import { AddressBookConfirmEvent } from '@/config/events'

export default function ModifyBorrow() {

  // 根据路由获取id参数
  const router = useRouter()
  const { id = '' } = router.params
  // 是否显示分类数据
  const [show, setShow] = useState<boolean>(false)
  // 分类数据
  const [typeData, setTypeData] = useState<ClassifyItem>({
    id: '',
    name: ''
  })
  // 借支提交数据
  const [postData, setPostData] = useState<UserEditBusinessInfo>({
    id: id,
    expend_type: '',
    note: '',
    money: '',
    group_leader: ''
  })
  // 接口返回数据
  const [data, setData] = useState<BusinessInfoResult>({
    id: parseInt(id),
    work_note: 0,
    group_leader: '',
    money: '',
    created_time_string: '',
    busienss_time_string: '',
    note: '',
    work_note_name: '',
    expend_type_name: '',
    expend_type: '',
    group_leader_name: ''
  })

  useEffect(() => {
    if (id) {
      Taro.setNavigationBarTitle({ title: '修改支出' })
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
    getExpenditureInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData(mydata)
        setTypeData({ id: mydata.expend_type || '', name: mydata.expend_type_name || '' })
        setPostData({ 
          ...postData, 
          expend_type: mydata.expend_type || '', 
          note: mydata.note || "", 
          money: mydata.money || '',
          group_leader: mydata.group_leader || ''
        })
      } else {
        msg(res.message)
      }
    })
  }

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: UserEditBusinessInfo = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 用户修改分类信息
  const userChangePickerType = (data: ClassifyItem) => {
    setTypeData(data)
    setPostData({ ...postData, expend_type: data.id })
  }

  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该笔借支吗？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          delExpenditureBusiness(id).then(res => {
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
    editBorrowBusiness(postData).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  // 用户删除班组长
  const userClearGroupLeader = () => {
    setData({...data, group_leader_name: '', group_leader: ''})
    setPostData({...postData, group_leader: ''})
  }

  // 用户删除分类
  const userClearPickerType = () => {
    setData({ ...data, expend_type_name: '', expend_type: '' })
    setPostData({ ...postData, expend_type: '' })
  }


  return (<View>
    <ContentInput title='金额' value={data.money} change={userUpdatePostData} type="money" />
    <PickerType
      value={typeData.name}
      show={show}
      setShow={() => { setShow(!show) }}
      close={() => userClearPickerType()}
      set={(data) => userChangePickerType(data)}
    />
    <PickerLeader leader={data.group_leader_name} DeletePickerLeader={() => userClearGroupLeader} />
    <PickerMark text={data.note} set={(val) => userUpdatePostData(val, "note")} />
    <PickerDetail 
      dateValue={data.busienss_time_string} 
      submitValue={data.created_time_string} 
      projectValue={data.work_note_name} 
      leader={data.group_leader_name}
    />
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  </View>)
}
