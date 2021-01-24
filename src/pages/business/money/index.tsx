import Taro, { useState, useRouter, useEffect, eventCenter } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerType from '@/components/picker_type'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import getBusinessMoneyInfo , { delBusinessMoney, editBusinessMoney} from './api'
import PickerDetail from '@/components/picker_detail'
import { BusinessInfoResult, UserEditBusinessInfo } from './inter.d'
import msg, { showBackModal, showActionModal } from '@/utils/msg'
import { AddressBookConfirmEvent } from '@/config/events'
import './index.scss'

export default function ModifyMoney() {

  // 根据路由获取id参数
  const router = useRouter()
  const { id = '11144' } = router.params
  // 借支提交数据
  const [postData, setPostData] = useState<UserEditBusinessInfo>({
    id: id,
    group_leader: '',
    note: '',
    money: ''
  })
  // 接口返回数据
  const [data, setData] = useState<BusinessInfoResult>({
    id: parseInt(id),
    work_note: 0,
    group_leader: '',
    money: '',
    created_time: '',
    business_time: '',
    note: '',
    work_note_name: '',
    expend_type_name: '',
    expend_type: '',
    group_leader_name: ''
  })

  // 等id 读取出来之后就 读取该详情
  useEffect(() => {
    if (id) {
      userGetBusinessInfo()
    }
  }, [id])

  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent,(data) => {
      setData({...data,group_leader: data.id, group_leader_name: data.name})
      setPostData({...postData, group_leader: data.id})
    })
    return eventCenter.off(AddressBookConfirmEvent)
  },[])

  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getBusinessMoneyInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData(mydata)
        setPostData({
          ...postData,
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


  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该笔借支吗？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          delBusinessMoney(id).then(res => {
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
    editBusinessMoney(postData).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
    <PickerLeader leader={data.group_leader_name} rightClose={false}  />
    <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, "note")} />
    <PickerDetail dateValue={data.created_time} submitValue={data.business_time} projectValue={data.work_note_name} />
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  </View>)
}
