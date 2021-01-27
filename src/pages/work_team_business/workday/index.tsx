import Taro, { useState, useRouter, useEffect, eventCenter, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import PickerMark from '@/components/picker_mark'
import PickerDetail from '@/components/picker_detail'
import msg, { showActionModal, showBackModal } from '@/utils/msg'
import { AddressBookConfirmEvent } from '@/config/events'
import WorkDayComponent from '@/components/work_day'
import getBorrowInfo, { delBorrowBusiness, editBorrowBusiness } from './api'
import BusinessInfoResult, { UserEditBusinessInfo, ClassifyItem, WorkTimeType } from './inter.d'
import './index.scss'

export default function ModifyWorkDay(){

  // 根据路由获取id参数
  const router = useRouter()
  const { id } = router.params

  // 记工天 是否是工
  const [isWrok, setIsWork] = useState<boolean>(true)
  // 是否选中 over
  const [isOver, setIsOver] = useState<boolean>(true)
  // 上班时长的数据
  const [workTime, setWorkTime] = useState<WorkTimeType>({ value: '1', text: '一个工' })
  // 加班时长的数据
  const [overTime, setOverTime] = useState<WorkTimeType>({ value: '0', text: '无加班' })
  // 提交工量数据
  const [postData, setPostData] = useState<UserEditBusinessInfo>({
    id: id,
    group_leader: '',
    note: '',
    work_time: '',
    work_time_hour: '',
    overtime: ''
  })
  // 接口返回的初始值
  const [data, setData] = useState<BusinessInfoResult>({
    id: parseInt(id),
    work_note: 0,
    group_leader: '',
    created_time_string: '',
    busienss_time_string: '',
    note: '',
    work_note_name: '',
    group_leader_name: '',
    work_time: '',
    work_time_hour: '',
    overtime: ''
  })
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<ClassifyItem>({
    id: '',
    name: ''
  })
  // 注册全局事件 监听是否切换班组长信息
  useEffect(() => {
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      setGroupLeader({ id: data.id, name: data.name })
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])
  useEffect(() => {
    if (id) {
      userGetBusinessInfo()
    }
  }, [id])
  // 初始化流水数据
  const userGetBusinessInfo = () => {
    getBorrowInfo(id).then(res => {
      if (res.code === 0) {
        let mydata = res.data;
        setData(mydata)
        setGroupLeader({ id: mydata.group_leader || '', name: mydata.group_leader_name || '' })
        setPostData({
          ...postData,
          group_leader: mydata.group_leader || '',
          note: mydata.note || '',
          work_time: mydata.work_time || '',
          work_time_hour: mydata.work_time_hour || '',
          overtime: mydata.overtime || ''
        })
        if (mydata.work_time){
          mydata.work_time == '1' ? setWorkTime({value: '1',text:'一个工'}) : setWorkTime({value: '0.5', text: '半个工'});
        } else if (mydata.work_time_hour){
          setWorkTime({ value: mydata.work_time_hour, text: `${mydata.work_time_hour}小时` })
          setIsWork(false)
        }else{
          setWorkTime({ value: '0', text: '休息' })
        }
        if(mydata.overtime){
          setOverTime({ value: mydata.overtime, text: `${mydata.overtime}小时`})
          setIsOver(false)
        }
      } else {
        msg(res.message)
      }
    })
  }
  
  // 用户删除流水
  const userDeleteBusiness = () => {
    showActionModal({
      msg: '您确定删除该笔工量吗？',
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
      group_leader: groupLeader.id,
      work_time: isWrok ? workTime.value : '',
      work_time_hour: !isWrok ? workTime.value : '',
      overtime: !isOver ? overTime.value : '',
    }
    editBorrowBusiness(params).then(res => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
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
  // 改变加班/上班 值
  const useChangeWorkTime = (data, type: string, typeValue?: string) => {
    if (typeValue == 'work') {
      setWorkTime(data)
      setIsWork(type === 'first' ? true : false)
    } else {
      setOverTime(data)
      setIsOver(type === 'first' ? true : false)
    }
  }
  return (<View>
    <View className="person-record-time">
      <WorkDayComponent
        change={(data, type) => useChangeWorkTime(data, type, 'work')}
        value={workTime}
        isSelect={!isWrok}
        type='work'
      />
      <WorkDayComponent
        title={'加班时间'}
        change={(data, type) => useChangeWorkTime(data, type, 'over')}
        value={overTime}
        isSelect={!isOver}
        type='over'
      />
    </View>
    <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')} />
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
ModifyWorkDay.config = {
  navigationBarTitleText: '修改工天',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config