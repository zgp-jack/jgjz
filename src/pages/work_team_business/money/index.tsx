import Taro, { useState, useRouter, useEffect, eventCenter, Config, useShareAppMessage } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import BusinessBtns from '@/components/business_btns'
import PickerMark from '@/components/picker_mark'
import msg, { showBackModal, showActionModal } from '@/utils/msg'
import { getRandomShareInfo } from '@/utils/index'
import ClassifyItem from '@/store/classify/inter.d'
import { AddressBookConfirmEvent } from '@/config/events'
import PickerDetail from '@/components/picker_detail'
import getBusinessMoneyInfo , { delBusinessMoney, editBusinessMoney} from './api'
import { BusinessInfoResult, UserEditBusinessInfo } from './inter.d'

import './index.scss'

export default function BusinessMoney() {

  // 根据路由获取id参数
  const router = useRouter()
  const { id = '11151' } = router.params

  useShareAppMessage(() => {
    return { ...getRandomShareInfo() }
  })

  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<ClassifyItem>({
    id: '',
    name: ''
  })
  // 借支提交数据
  const [postData, setPostData] = useState<UserEditBusinessInfo>({
    id: id,
    group_leader: '',
    note: '',
    money: '',
    worker_name: '',
    worker_id: ''
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
    worker_name: '',
    worker_id: ''
  })

  // 等id 读取出来之后就 读取该详情
  useEffect(() => {
    if (id) {
      Taro.setNavigationBarTitle({ title: '修改工钱' })
      userGetBusinessInfo()
    }
  }, [id])

  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent,(data) => {
      setGroupLeader({id: data.id, name: data.name})
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  },[])


  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getBusinessMoneyInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData(mydata)
        setGroupLeader({id: mydata.group_leader || '', name: mydata.group_leader_name || ''})
        setPostData({
          ...postData,
          note: mydata.note || "",
          money: mydata.money || '',
          group_leader: mydata.group_leader || '',
          worker_id: mydata.worker_id
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
      msg: '您确定删除该笔工钱吗？',
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
    let params: UserEditBusinessInfo = {
      ...postData,
      group_leader: groupLeader.id
    }
    editBusinessMoney(params).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money" />
    <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, "note")} />
    <PickerDetail dateValue={data.busienss_time_string} submitValue={data.created_time_string} projectValue={data.work_note_name} worker={data.worker_name} showWorker={true}/>
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  </View>)
}
BusinessMoney.config = {
  navigationBarTitleText: '修改支出',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config