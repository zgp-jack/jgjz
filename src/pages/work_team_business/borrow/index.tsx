import Taro, {useState, useRouter, useEffect, eventCenter, useShareAppMessage} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import msg, {showActionModal, showBackModal} from '@/utils/msg'
import { getRandomShareInfo } from '@/utils/index'
import PickerMark from '@/components/picker_mark'
import PickerType from '@/components/picker_type'
import PickerDetail from '@/components/picker_detail'
import getBorrowInfo, {delBorrowBusiness, editBorrowBusiness} from './api'
import ClassifyItem from '@/store/classify/inter.d'
import {BusinessInfoResult, UserEditBusinessInfo} from './inter.d'
import {AddressBookConfirmEvent} from '@/config/events'
import BusinessBtns from '@/components/business_btns'
import './index.scss'
import PickerCoworkers from "@/components/picker_coworkers";

export default function BusinessBorrow() {

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
      Taro.setNavigationBarTitle({title: '修改借支'})
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
    getBorrowInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data
        setData(mydata)
        setCoworkersData({id: mydata.worker_id || '', name: mydata.worker_name || ''})
        setTypeData({id: mydata.expend_type, name: mydata.expend_type_name})
        setPostData({
          ...postData,
          expend_type: mydata.expend_type || '',
          note: mydata.note || "",
          money: mydata.money || '',
          worker_id: mydata.worker_id
        })
      } else {
        msg(res.message)
      }
    })
  }

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = {...postData}
    postdata[type] = val
    setPostData(postdata)
  }

  // 用户修改分类信息
  const userChangePickerType = (data: ClassifyItem) => {
    setTypeData(data)
    setPostData({...postData, expend_type: data.id})
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
    let params: UserEditBusinessInfo = {
      ...postData,
      worker_id: coworkersData.id
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
  const userClearGroupCoworkers = () => {
    setCoworkersData({id: '', name: ''})
  }


  return (<View>
    <ContentInput title='金额' value={data.money} change={userUpdatePostData} type="money"/>
    <PickerType
      value={typeData}
      show={show}
      setShow={() => {
        setShow(!show)
      }}
      rightClose={false}
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
