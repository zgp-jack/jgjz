import Taro, {useState, useRouter, useEffect, eventCenter, Config, useShareAppMessage} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import msg, {showActionModal, showBackModal} from '@/utils/msg'
import { getRandomShareInfo } from '@/utils/index'
import PickerMark from '@/components/picker_mark'
import PickerType from '@/components/picker_type'
import PickerDetail from '@/components/picker_detail'
import {AddressBookConfirmEvent} from '@/config/events'
import getExpenditureInfo, {delExpenditureBusiness, editExpenditureBusiness} from './api'
import ClassifyItem from '@/store/classify/inter.d'
import {BusinessInfoResult, UserEditBusinessInfo} from './inter.d'
import './index.scss'
import PickerCoworkers from "@/components/picker_coworkers";
import BusinessBtns from '@/components/business_btns'

export default function BusinessExpenditure() {

  // 根据路由获取id参数
  const router = useRouter()
  const {id = ''} = router.params

  useShareAppMessage(() => {
    return { ...getRandomShareInfo() }
  })
  // 是否显示分类数据
  const [show, setShow] = useState<boolean>(false)
  // 工友数据
  const [coworkersData, setCoworkersData] = useState<ClassifyItem>({id: '', name: ''})
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
    worker_id: '',
    worker_name: ''
  })

  useEffect(() => {
    if (id) {
      userGetBusinessInfo()
    }
  }, [id])

  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent, (coworkers) => {
      setCoworkersData({id: coworkers.id, name: coworkers.name})
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])

  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getExpenditureInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData({...mydata})
        setCoworkersData({id: mydata.worker_id || '', name: mydata.worker_name || ''})
        setPostData({
          ...postData,
          expend_type: mydata.expend_type || '',
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
      worker_id: coworkersData.id
    }
    editExpenditureBusiness(params).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }

  // 用户删除班组长
  const userClearGroupCoworkers = () => {
    setCoworkersData({id: '', name: ''})
  }

  // 用户删除分类
  const userClearPickerType = () => {
    setData({...data, expend_type_name: '', expend_type: ''})
    setPostData({...postData, expend_type: ''})
  }


  return (<View>
    <ContentInput title='金额' value={data.money} change={userUpdatePostData} type="money"/>
    <PickerType
      value={{ id: data.expend_type, name: data.expend_type_name}}
      show={show}
      setShow={() => {
        setShow(!show)
      }}
      close={() => userClearPickerType()}
      set={(data) => userChangePickerType(data)}
    />
    <PickerCoworkers leader={coworkersData.name} DeletePickerCoworkers={userClearGroupCoworkers}/>
    <PickerMark text={data.note} set={(val) => userUpdatePostData(val, "note")}/>
    <PickerDetail
      dateValue={data.busienss_time_string}
      submitValue={data.created_time_string}
      projectValue={data.work_note_name}
    />
    <BusinessBtns del={userDeleteBusiness} edit={userEditBusiness} />
  </View>)
}

BusinessExpenditure.config = {
  navigationBarTitleText: '修改支出'
} as Config
