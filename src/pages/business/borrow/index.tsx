import Taro, { useState, useRouter, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import msg, { showActionModal, showBackModal } from '@/utils/msg'
import PickerMark from '@/components/picker_mark'
import PickerType from '@/components/picker_type'
import PickerDetail from '@/components/picker_detail'
import PickerLeader from '@/components/picker_leader'
import getBorrowInfo, { delBorrowBusiness,editBorrowBusiness } from './api'
import ClassifyItem from '@/store/classify/inter.d'
import { BusinessInfoResult, UserEditBusinessInfo } from './inter.d'
import { AddressBookConfirmEvent } from '@/config/events'
import './index.scss'

export default function BusinessBorrow() {

  // 根据路由获取id参数
  const router = useRouter()
  const { id = '' } = router.params
  // 是否显示分类数据
  const [show ,setShow] = useState<boolean>(false)
  // 班组长数据
  const [leaderData, setLeaderData] = useState<ClassifyItem>({ id: '', name: '' })
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
    group_leader_name: '',
  })

  useEffect(() => {
    if(id){
      Taro.setNavigationBarTitle({ title: '修改借支' })
      userGetBusinessInfo()
    }
  },[id])
  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent, (leader) => {
      setLeaderData({id: leader.id, name: leader.name})
    })

    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])


  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getBorrowInfo(id).then(res => {
      if(res.code === 0){
        let mydata = res.data
        setData(mydata)
        setLeaderData({id: mydata.group_leader, name: mydata.group_leader_name})
        setTypeData({ id: mydata.expend_type, name: mydata.expend_type_name})
        setPostData({ 
          ...postData, 
          expend_type: mydata.expend_type || '', 
          note: mydata.note || "", 
          money: mydata.money || '',
          group_leader: mydata.group_leader || ''
        })
      }else{
        msg(res.message)
      }
    })
  }

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 用户修改分类信息
  const userChangePickerType = (data: ClassifyItem) => {
    setTypeData(data)
    setPostData({ ...postData, expend_type: data.id})
  }

  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该笔借支吗？',
      showCancel: true,
      success: (res) => {
        if(res.confirm){
          delBorrowBusiness(id).then(res => {
            if(res.code === 0){
              showBackModal(res.message)
            }else{
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
      group_leader: leaderData.id
    }
    editBorrowBusiness(params).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  // 用户删除班组长
  const userClearGroupLeader = () => {
    setLeaderData({ id: '', name: '' })
  }


  return (<View>
    <ContentInput title='金额' value={data.money} change={userUpdatePostData} type="money" />
    <PickerType 
      value={typeData.name} 
      show={show} 
      setShow={() => { setShow(!show) }} 
      rightClose={false} 
      set={(data) => userChangePickerType(data)}
    />
    <PickerLeader leader={leaderData.name} DeletePickerLeader={() => userClearGroupLeader()} />
    <PickerMark text={data.note} set={(val) => userUpdatePostData(val, "note")} />
    <PickerDetail 
      dateValue={data.busienss_time_string} 
      submitValue={data.created_time_string} 
      projectValue={data.work_note_name} 
    />
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  </View>)
}
