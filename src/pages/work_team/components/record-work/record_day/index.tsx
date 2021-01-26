import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import WorkTime from '@/pages/person_borrowing/components/work_time/index'
import PickerMark from '@/components/picker_mark/index'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import msg, { showBackModal } from '@/utils/msg'
import RecordDayPostData, { PropsData } from './inter.d'
import { worktime, overtime } from './config'
import userAddRecordAction from '../api'
import './index.scss'

function RecordDay({ workerId, type, businessTime }:PropsData) {
  // 从mobx获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  // 当前账本数据
  const { accountBookInfo } = localStore
  // 是否显示加班组件
  const [isPickerOverTime, setIsPickerOverTime] = useState<boolean>(false)
  // /** 是否上传照片 */
  // const [isImageUpload, setIsImageUpload] = useState<boolean>(false)
  // /** 是否显示图片上传icon */
  // const [showIcon, setShowIcon] = useState<boolean>(true) 
  // 记工天提交数据
  const [postData, setPostData] = useState<RecordDayPostData>({
    /** 记工类型 1 记工天 2记工量 3 记工钱 */ 
    business_type: type,
    /** 记工时间 */
    business_time: businessTime,
    /** 备注 */ 
    note: '',
    /** 账本类型 1 班组 2 个人*/ 
    identity: Number(accountBookInfo.identity),
    /** 上班记工数 */ 
    work_time: '1',
    /** 上班小时数 */
    work_time_hour: '0',
    /** 加班时长 */ 
    overtime: '',
    /** 记工工友id字符串 */ 
    worker_id: workerId,
    /** 上传图片url */ 
    img_url:'',
    /** 账本id */ 
    work_note: accountBookInfo.id
  })

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string,value?:string,typeString?:string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    typeString && (postdata[typeString] = value);
    setPostData(postdata)
  }
 
  // 提交借支数据
  const userPostAcion = () => {
    let params: RecordDayPostData = {
      business_type: type || 1,
      identity: Number(accountBookInfo.identity),
      work_time: postData.work_time,
      work_time_hour: postData.work_time_hour,
      overtime: isPickerOverTime ? postData.overtime:'',
      business_time: postData.business_time,
      note: postData.note,
      work_note: accountBookInfo.id,
      worker_id: workerId
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        showBackModal(res.message)
      } else {
        msg(res.message)
      }
    })
  }
  // 设置获取值 加班/上班
  const setTime = (item:number,isClose:boolean) => {
    if (isClose) {
      let arr = ['1','0.5','0']
      userUpdatePostData(arr[item], 'work_time', '0', 'work_time_hour')
    } else {
      userUpdatePostData('0', 'overtime')
    }
  }
  // 设置更多值 加班/上班
  const setMoreTime = (item:string,isClose:boolean) => {
    if (isClose) {
      userUpdatePostData(item, 'work_time_hour', '0', 'work_time');
    } else {
      userUpdatePostData(item, 'overtime')
    }
  }

  return (<View>
    <View className='person-record-time'>
      {/* 上班时长组件 */}
      <WorkTime set={(id) => setTime(id, true)} setTime={(value) => setMoreTime(value,true)} worktime={worktime} />
      
      {/* 加班时长 */}
      {isPickerOverTime && <WorkTime 
        close={() => setIsPickerOverTime(false)} 
        setTime={(value) => setMoreTime(value, false)} 
        set={(value) => setTime(value,false)} 
        worktime={overtime} 
        isClose={false}
      />
      }
    </View>
    {/* 备注组件 */}
    <PickerMark text={postData.note as string} set={(val) => userUpdatePostData(val, 'note')} />
    <View className='person-record-component'>
      {/*  加班时长  */}
      {!isPickerOverTime && <View className='person-record-component-item' onClick={() => setIsPickerOverTime(true)}>加班时长</View>}
    </View>
    <View className='person-record-btn'>
      <Button className='person-record-save' onClick={userPostAcion} >确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordDay)