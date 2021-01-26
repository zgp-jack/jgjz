import Taro, { useState, useRouter, useEffect, eventCenter, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import WorkTime from '@/pages/person_borrowing/components/work_time/index'
import PickerDetail from '@/components/picker_detail'
import BusinessInfoResult, { UserEditBusinessInfo, ClassifyItem, SelectedValue } from './inter.d'
import msg, { showActionModal, showBackModal } from '@/utils/msg'
import { AddressBookConfirmEvent } from '@/config/events'
import getBorrowInfo, { delBorrowBusiness, editBorrowBusiness } from './api'
import './index.scss'

export default function ModifyWorkDay(){

  // 根据路由获取id参数
  const router = useRouter()
  const { id } = router.params

  /** 修改选中 id */
  let selectedWork: SelectedValue = {id: 0,value: 0};
  const [selectwork, setselectWork] = useState<SelectedValue>({id: 0,value: 0});
  /** 修改选中值 */
  let selectedOver: SelectedValue = { id: 0, value: 0 };
  const [selectover, setselectOver] = useState<SelectedValue>({ id: 0, value: 0 });
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
        let mydata = res.data
        selectTime(mydata.work_time,mydata.work_time_hour,mydata.overtime);
        setselectWork(selectedWork);
        setselectOver(selectedOver)
        setData(mydata)
        setGroupLeader({ id: mydata.group_leader || '', name: mydata.group_leader_name || '无班组长' })
        setPostData({
          ...postData,
          group_leader: mydata.group_leader || '',
          note: mydata.note || '',
          work_time: mydata.work_time || '',
          work_time_hour: mydata.work_time_hour || '',
          overtime: mydata.overtime || ''
        })
      } else {
        msg(res.message)
      }
    })
  }
  // 默认选中时间
  const selectTime = (work_time_data:string,work_time_hour_data:string,overtime_data:string) => {
    let work_time = work_time_data || '0';
    let work_time_hour = work_time_hour_data || '0';
    let overtime = overtime_data || '0'
    if(work_time == '1'){
      selectedWork.id = 0,
      selectedWork.value = 0
    }else if(work_time == '0.5'){
      selectedWork.id = 1,
      selectedWork.value = 0
    } else if (work_time == '0'){
      if (work_time_hour == '0'){
        selectedWork.id = 2,
        selectedWork.value = 0
      }else{
        selectedWork.id = 3,
          selectedWork.value = Number(work_time_hour)
      }
    }
    if (overtime == '0'){
      selectedOver.id = 0;
      selectedOver.value = 0
    }else{
      selectedOver.id = 1;
      selectedOver.value = Number(overtime);
    }
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
  // 用户更新数据
  const userUpdatePostData = (val: string, type: string, value?: string, typeString?: string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    typeString && (postdata[typeString] = value);
    setPostData(postdata)
  }
  // 设置获取值 加班/上班
  const setTime = (item: number, isClose: boolean) => {
    if (isClose) {
      let arr = ['1', '0.5', '0']
      userUpdatePostData(arr[item], 'work_time', '0', 'work_time_hour')
    } else {
      userUpdatePostData('0', 'overtime')
    }
  }
  // 设置更多值 加班/上班
  const setMoreTime = (item: string, isClose: boolean) => {
    if (isClose) {
      userUpdatePostData(item, 'work_time_hour', '0', 'work_time');
    } else {
      userUpdatePostData(item, 'overtime')
    }
  }

  // 用户清空班组长
  const userClearLeader =() => {
    setGroupLeader({id: '', name: ''})
  }


  return (<View>
    <View className="person-record-time">
      <WorkTime set={(id) => setTime(id, true)} setTime={(value) => setMoreTime(value, true)} selected={selectwork} />
      <WorkTime
        // close={}
        setTime={(value) => setMoreTime(value, false)}
        set={(value) => setTime(value, false)}
        isClose={false}
        selected={selectover} />
    </View>
    <PickerLeader leader={groupLeader.name}  DeletePickerLeader={()=>userClearLeader()} />
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
  navigationBarTitleText: '修改工天'
} as Config