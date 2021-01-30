import { useEffect, useState, eventCenter } from '@tarojs/taro'
import { View, Button } from  '@tarojs/components'
import ContentInput from '@/components/picker_input/index'
import PickerType from '@/components/picker_type'
import PickerDate from '@/components/picker_date'
import PickerLeader from '@/components/picker_leader'
import PickerMark from '@/components/picker_mark'
import ExpenditurePostData from './inter.d'
import classifyItem from '@/store/classify/inter.d'
import { ADDRESSBOOKALONEPAGE } from '@/config/pages'
import { AddressBookConfirmEvent } from '@/config/events'
import { PersonlExpenditureHistoryGroupLeader, PersonlExpenditureHistoryClassifyType, PersonlLastSuccessAccountPage } from '@/config/store'
import { validNumber } from '@/utils/v'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import msg, { showBackModal } from '@/utils/msg'
import './index.scss'
import { getTodayDate } from '@/utils/index'
import userAddBorrowAction from '@/pages/person_borrowing/api'

function Expenditure(){
  // 支出提交数据
  const [postData, setPostData] = useState<ExpenditurePostData>({
    business_type: 4,
    expend_type: 5,
    business_time: getTodayDate(),
    group_leader: '',
    note: '',
    money: '',
    identity: 2,
    work_note: 0,
  })
  // 获取历史班组长数据
  let leaderInfo: classifyItem = Taro.getStorageSync(PersonlExpenditureHistoryGroupLeader)
  // 获取历史分类数据
  let classitifyInfo: classifyItem = Taro.getStorageSync(PersonlExpenditureHistoryClassifyType)
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')
  // 分类数据
  const [typeData, setTypeData] = useState<classifyItem>(classitifyInfo ? classitifyInfo : { id: '', name: ''})
  // 是否显示分类组件
  const [isPickerType, setIsPickType] = useState<boolean>(!!classitifyInfo)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(!!leaderInfo)
  // 是否显示选择分类
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>(leaderInfo ? leaderInfo:{ id: '', name: '' })

  // 日期文本显示年月日
  useEffect(() => {
    let date = postData.business_time
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
  }, [postData.business_time])

  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const { accountBookInfo } = localStore

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: ExpenditurePostData = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 注册事件 监听班组长的选择
  useEffect(() => {
    // 监听到了 班组长的回调 然后设置班组长的信息
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      setGroupLeader({id: data.id, name: data.name})
      setIsPickerLeader(true)
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  },[])

  // 提交借支数据
  const userPostAcion = () => {
    let params: ExpenditurePostData = {
      business_type: 5,
      expend_type: isPickerType ? typeData.id : 0,
      business_time: postData.business_time,
      group_leader: isPickerLeader ? groupLeader.id : '',
      note: postData.note,
      money: postData.money,
      identity: 2,
      work_note: accountBookInfo.id
    }
    if(postData.money){
      if (!validNumber(params.money)) {
        msg('请输入正确的金额')
        return
      }
    }
    userAddBorrowAction(params).then((res) => {
      if(res.code === 0){
        if (isPickerType && typeData.id) {
          Taro.setStorageSync(PersonlExpenditureHistoryClassifyType, typeData)
        }else{
          Taro.removeStorageSync(PersonlExpenditureHistoryClassifyType)
        }
        if (isPickerLeader && groupLeader.id) {
          Taro.setStorageSync(PersonlExpenditureHistoryGroupLeader, groupLeader)
        } else {
          Taro.removeStorageSync(PersonlExpenditureHistoryGroupLeader)
        }
        Taro.setStorageSync(PersonlLastSuccessAccountPage, params.business_type)
        showBackModal(res.message)
      }else{
        msg(res.message)
      }
    })
  }

  // 用户点击 班组长 圆角按钮 选择
  const userTapGroupLeaderBtn = () => {
    if(groupLeader.id){
      setIsPickerLeader(true)
    }else{
      Taro.navigateTo({ url: ADDRESSBOOKALONEPAGE })
    }
  }
  // 用户选择分类数据
  const userChangePickerType = (data, type) => {
    type && (type.id == typeData.id) && Taro.removeStorageSync(PersonlExpenditureHistoryClassifyType)
    setTypeData(data); 
    userUpdatePostData(data.id == '0' ? '' : data.id, 'expend_type')
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
  // 用户点击分类组件  右上角关闭 
  const userTapRightTopCloseBtn = () => {
    // 如果没有设置过分类数据
    if (!typeData.id){
      // 关闭options弹窗
      setShowTypePicker(false)
      // 关闭 分类 选项
      typeData.id == '0' ? setIsPickType(true) : setIsPickType(false);
    }
  }

  return (
    <View>
      <ContentInput type="money" title="金额" change={userUpdatePostData} value={postData.money} />
      {isPickerType && 
        <PickerType 
          value={typeData} 
          close={() => { setIsPickType(false); setTypeData({ id: '', name: '' })} } 
          onOptionClose={() => userTapRightTopCloseBtn()}
          set={(data, type) => userChangePickerType(data, type)} 
          show={showTypePicker} 
          setShow={(bool: boolean) => setShowTypePicker(bool) }
          isRecord={true}
        />
      }
      {isPickerDate && 
        <PickerDate 
          date={postData.business_time} 
          DeletePickerDate={DeletePickerDate} 
          change={(val) => userUpdatePostData(val, 'business_time')}
          dateText={dateText}
        />}
      {isPickerLeader && <PickerLeader leader={groupLeader} DeletePickerLeader={DeletePickerLeader} />}
      <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')} />
      <View className="person-record-component">
        {!isPickerType && <View className="person-record-component-item" onClick={() => { setIsPickType(true); setShowTypePicker(true) }}>分类</View>}
        {!isPickerDate && <View className="person-record-component-item" onClick={() => setIsPickerDate(true)}>{dateText}</View>}
        {!isPickerLeader && <View className="person-record-component-item" onClick={() => userTapGroupLeaderBtn() }>班组长</View>}
      </View>
      <View className="person-record-btn">
        <Button className="person-record-save" onClick={() => userPostAcion()}>确认记帐</Button>
      </View>
    </View>
  )
}

export default observer(Expenditure)