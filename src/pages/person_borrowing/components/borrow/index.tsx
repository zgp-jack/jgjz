import {useState, useEffect, eventCenter} from '@tarojs/taro'
import { View, Button, Picker} from '@tarojs/components'
import ContentInput from '../../../../components/picker_input/index'
import PickerType from '@/components/picker_type'
import PickerMark from '@/components/picker_mark'
import BorrowPostData from './inter.d'
import {AddressBookConfirmEvent} from '@/config/events'
import {observer, useLocalStore} from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import {ADDRESSBOOKALONEPAGE, INDEXPAGE} from '@/config/pages'
import { PersonlBorrowHistoryGroupLeader, PersonlBorrowHistoryClassifyType, PersonlLastSuccessAccountPage } from '@/config/store'
import PickerLeader from '@/components/picker_leader'
import PickerDate from '@/components/picker_date'
import {validNumber} from '@/utils/v'
import msg, {showBackModal,showActionModal} from '@/utils/msg'
import classifyItem from '@/store/classify/inter.d'
import {getTodayDate, handleRecordSuccessSaveDate} from '@/utils/index'
import './index.scss'
import userAddBorrowAction from '@/pages/person_borrowing/api'

function Borrow({type}:{type: string}) {
  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const {accountBookInfo} = localStore
  // 获取历史班组长数据
  let leaderInfo: classifyItem = Taro.getStorageSync(PersonlBorrowHistoryGroupLeader)
  // 获取历史分类数据
  let classitify: classifyItem = Taro.getStorageSync(PersonlBorrowHistoryClassifyType)
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 是否显示分类组件
  const [isPickerType, setIsPickType] = useState<boolean>(!!classitify)
  // 是否显示选择分类
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(!!leaderInfo)
  // 分类数据
  const [typeData, setTypeData] = useState<classifyItem>(classitify ? classitify : {id: '', name: ''})
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>(leaderInfo ? leaderInfo : { id: '', name: '' })
  // 是否显示备注
  const [isPickerMark, setIsPickerMark] = useState<boolean>(true)
  // 借支提交数据
  const [postData, setPostData] = useState<BorrowPostData>({
    business_type: 4,
    expend_type: 0,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    money: '',
    identity: accountBookInfo.identity,
    work_note: 0,
  })

  // 日期文本显示年月日
  useEffect(() => {
    let date = postData.business_time
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
  }, [postData.business_time])

  // 注册事件 监听班组长的选择
  useEffect(() => {
    // 监听到了 班组长的回调 然后设置班组长的信息
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      let leader: classifyItem = { id: data.id, name: data.name }
      setGroupLeader(leader)
      setIsPickerLeader(true)
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [])

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: BorrowPostData = {...postData}
    postdata[type] = val
    setPostData(postdata)
  }

  // 用户选择分类数据
  const userChangePickerType = (data,type) => {
    type && (type.id == typeData.id) && Taro.removeStorageSync(PersonlBorrowHistoryClassifyType)
    setTypeData(data);
    userUpdatePostData(data.id == '0' ? '' : data.id, 'expend_type')
  }

  // 提交借支数据
  const userPostAcion = () => {
    let params: BorrowPostData = {
      business_type: 4,
      expend_type: isPickerType ? typeData.id : 0,
      business_time: postData.business_time,
      group_leader: isPickerLeader ? groupLeader.id : '',
      note: postData.note,
      money: postData.money,
      identity: accountBookInfo.identity,
      work_note: accountBookInfo.id
    }
    if (params.money) {
      if (!validNumber(params.money)) {
        msg('请输入正确的金额')
        return
      }
    }
    userAddBorrowAction(params).then((res) => {
      if (res.code === 0) {
        if(isPickerType && typeData.id){
          Taro.setStorageSync(PersonlBorrowHistoryClassifyType, typeData)
        }else{
          Taro.removeStorageSync(PersonlBorrowHistoryClassifyType)
        }
        if (isPickerLeader && groupLeader.id){
          Taro.setStorageSync(PersonlBorrowHistoryGroupLeader, groupLeader)
        }else{
          Taro.removeStorageSync(PersonlBorrowHistoryGroupLeader)
        }
        Taro.setStorageSync(PersonlLastSuccessAccountPage, params.business_type)
        handleRecordSuccessSaveDate(params.business_time)
        if (type == '1'){
          showActionModal({
            msg: res.message,
            success: () => Taro.reLaunch({ url: INDEXPAGE })
          })
        }else{
          showBackModal(res.message)
        }
      } else {
        msg(res.message)
      }
    })
  }

  // 用户点击 班组长 圆角按钮 选择
  const userTapGroupLeaderBtn = () => {
    if (groupLeader.id) {
      setIsPickerLeader(true)
    } else {
      Taro.navigateTo({url: ADDRESSBOOKALONEPAGE})
    }
  }

  // 用户点击分类组件  右上角关闭
  const userTapRightTopCloseBtn = () => {
    // 如果没有设置过分类数据
    if (!typeData.id) {
      // 关闭options弹窗
      setShowTypePicker(false)
      // 关闭分类选项
      setIsPickType(false)
    }
  }

  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setGroupLeader({ id: '', name: '' })
    setIsPickerLeader(false)
  }

  // 用户点击右侧关闭按钮
  const userTapRightCloseBtn = () => {
    setTypeData({id: '',name: ''})
    setIsPickType(false)
  }
  // 用户更新时间选择器
  const userChangePicker = (e) => {
    let value = e.detail.value
    userUpdatePostData(value, 'business_time')
  }

  return (
    <View>
      <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type="money"/>
      {isPickerType &&
      <PickerType
        value={typeData}
        close={() => userTapRightCloseBtn()}
        onOptionClose={() => userTapRightTopCloseBtn()}
        set={(data,type) => {
          userChangePickerType(data, type)
        }}
        show={showTypePicker}
        setShow={(bool: boolean) => setShowTypePicker(bool)}
        isRecord = {true}
        setIsPickerMark={setIsPickerMark}
      />
      }

      {isPickerDate &&
      <PickerDate
        date={postData.business_time}
        DeletePickerDate={DeletePickerDate}
        change={(val) => userUpdatePostData(val, 'business_time')}
        dateText={dateText}
      />}
      {isPickerLeader && <PickerLeader leader={groupLeader} DeletePickerLeader={DeletePickerLeader}/>}
      {isPickerMark && <PickerMark text={postData.note} set={(data) => userUpdatePostData(data, 'note')}/>}
      <View className="person-record-component">
        {!isPickerType && <View className="person-record-component-item" onClick={() => {
          setIsPickerMark(false)
          setIsPickType(true);
          setShowTypePicker(true)
        }}>分类</View>}
        {!isPickerDate &&
          <Picker mode='date' value={postData.business_time} onChange={(e) => userChangePicker(e)} end={getTodayDate()} onCancel={() => setIsPickerDate(false)} >
          <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>
      </Picker>}
        {!isPickerLeader && <View className="person-record-component-item" onClick={() => userTapGroupLeaderBtn()}>班组长</View>}
      </View>
      <View className="person-record-btn">
        <Button className="person-record-save" onClick={() => userPostAcion()}>确认记帐</Button>
      </View>
    </View>
  )
}

export default observer(Borrow)
