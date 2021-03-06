import Taro, {useState, useRouter, useEffect, eventCenter, Config, useShareAppMessage} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import msg, {showActionModal, showBackModal} from '@/utils/msg'
import { getRandomShareInfo } from '@/utils/index'
import PickerMark from '@/components/picker_mark'
import PickerType from '@/components/picker_type'
import PickerDetail from '@/components/picker_detail'
import PickerLeader from '@/components/picker_leader'
import {AddressBookConfirmEvent} from '@/config/events'
import getExpenditureInfo, {delExpenditureBusiness, editExpenditureBusiness} from './api'
import ClassifyItem from '@/store/classify/inter.d'
import {BusinessInfoResult, UserEditBusinessInfo} from './inter.d'
import BusinessBtns from '@/components/business_btns'
import './index.scss'

export default function BusinessExpenditure() {

  // 根据路由获取id参数
  const router = useRouter()
  const {id = ''} = router.params

  useShareAppMessage(() => {
    return { ...getRandomShareInfo() }
  })

  // 是否显示分类数据
  const [show, setShow] = useState<boolean>(false)
  // 是否显示备注
  const [isPickerMark, setIsPickerMark] = useState<boolean>(true)
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<ClassifyItem>({
    id: '',
    name: ''
  })
  // 借支提交数据
  const [postData, setPostData] = useState<UserEditBusinessInfo>({
    id: id,
    expend_type: '',
    note: '',
    money: '',
    group_leader: '',
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
  })

  useEffect(() => {
    if (id) {
      userGetBusinessInfo()
    }
  }, [id])

  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent, (leader) => {
      setGroupLeader({ id: leader.id || '', name: leader.name ||'' })
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])

  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getExpenditureInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData({...mydata})
        setGroupLeader({ id: mydata.group_leader || '', name: mydata.group_leader_name || '' })
        setPostData({
          ...postData,
          expend_type: mydata.expend_type || '',
          note: mydata.note || "",
          money: mydata.money || '',
          group_leader: mydata.group_leader || '',
          worker_id: mydata.worker_id || ''
        })
      } else {
        msg(res.message)
      }
    })
  }

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: UserEditBusinessInfo = {...postData}
    postdata[type] = val
    setPostData(postdata)
  }

  // 用户修改分类信息
  const userChangePickerType = (classify: ClassifyItem) => {
    setData({...data, expend_type_name: classify.name, expend_type: classify.id})
    setPostData({...postData, expend_type: classify.id})
  }

  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该笔支出吗？',
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
    let params: UserEditBusinessInfo = {
      ...postData,
      group_leader: groupLeader.id,
      money: postData.money ? postData.money : '0'
    }
    editExpenditureBusiness(params).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  // 用户删除分类
  const userClearPickerType = () => {
    setData({...data, expend_type_name: '', expend_type: ''})
    setPostData({...postData, expend_type: ''})
  }

  // 用户清空班组长
  const userClearLeader = () => {
    setGroupLeader({ id: '', name: '' })
  }
  return (<View>
    <ContentInput title='金额' value={data.money} change={userUpdatePostData} type="money"/>
    <PickerType
      value={{name:data.expend_type_name,id: data.expend_type}}
      show={show}
      setShow={() => {
        setShow(!show)
      }}
      close={() => userClearPickerType()}
      set={(data) => userChangePickerType(data)}
      setIsPickerMark={setIsPickerMark}
    />
    <PickerLeader leader={groupLeader} DeletePickerLeader={() => userClearLeader()} />
    {isPickerMark && <PickerMark text={data.note} set={(val) => userUpdatePostData(val, "note")}/>}
    <PickerDetail
      dateValue={data.busienss_time_string}
      submitValue={data.created_time_string}
      projectValue={data.work_note_name}
    />
    <BusinessBtns del={userDeleteBusiness} edit={userEditBusiness} />
  </View>)
}

BusinessExpenditure.config = {
  navigationBarTitleText: '修改支出',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config
