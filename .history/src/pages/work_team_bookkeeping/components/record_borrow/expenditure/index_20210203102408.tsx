import Taro, {useEffect, useState, eventCenter} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import ContentInput from '@/components/picker_input/index'
import PickerType from '@/components/picker_type'
import PickerMark from '@/components/picker_mark'
import classifyItem from '@/store/classify/inter.d'
import {ADDRESSBOOKALONEPAGE} from '@/config/pages'
import {AddressBookConfirmEvent} from '@/config/events'
import {validNumber} from '@/utils/v'
import {observer, useLocalStore} from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import msg, { showBackModal, showModal, showActionModal} from '@/utils/msg'
import userAddBorrowAction from '@/pages/work_team_bookkeeping/components/record_borrow/api'
import './index.scss'
import ExpenditurePostData from './inter.d'
import { BookkeepingProps } from "@/pages/work_team_bookkeeping/components/record_borrow/borrow/inter";
import createAnimation = Taro.createAnimation;
import {teamExpenditureType,GroupLastSuccessAccountPage} from "@/config/store";
import {handleRecordSuccessSaveDate} from "@/utils/index";


function Expenditure(props: BookkeepingProps) {

  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const {accountBookInfo} = localStore
  // 分类数据
  const [typeData, setTypeData] = useState<classifyItem>({id: '', name: ''})
  // 支出提交数据
  const [postData, setPostData] = useState<ExpenditurePostData>({
    business_type: 5,
    expend_type: typeData.id,
    business_time: props.businessTime,
    group_leader: '',
    note: '',
    money: '',
    identity: accountBookInfo.identity,
    work_note: accountBookInfo.id,
  })
  // 时间年月日
  const [dateText, setDateText] = useState<string>('')

  // 是否显示分类组件
  const [isPickerType, setIsPickType] = useState<boolean>(false)
  // 是否显示日期组件
  const [isPickerDate, setIsPickerDate] = useState<boolean>(true)
  // 是否显示班组长 组件
  const [isPickerLeader, setIsPickerLeader] = useState<boolean>(false)
  // 是否显示选择分类
  const [showTypePicker, setShowTypePicker] = useState<boolean>(false)
  // 选择的班组长数据
  const [groupLeader, setGroupLeader] = useState<classifyItem>({
    id: '',
    name: ''
  })
  /*初始化分类*/
  useEffect(() => {
    const teamBorrowType = Taro.getStorageSync('teamExpenditureType')
    if (!teamBorrowType) return;
    const _typeData = JSON.parse(teamBorrowType)
    setTypeData(_typeData)
    setIsPickType(true)
  }, [])
  // 日期文本显示年月日
  useEffect(() => {
    let date = postData.business_time
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
    Taro.setNavigationBarTitle({ title: '班组记账' })
  }, [postData.business_time])

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: ExpenditurePostData = {...postData}
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
  }, [])

  // 提交借支数据
  const userPostAcion = () => {
    let params: ExpenditurePostData = {
      business_type: 5,
      expend_type: typeData.id,
      business_time: props.businessTime,
      group_leader: '',
      note: postData.note,
      money: postData.money,
      identity: accountBookInfo.identity,
      work_note: accountBookInfo.id,
      worker_id: props.workerId
    }
    if (params.worker_id == '') {
      msg('请选择工人！')
      return
    }
    if (postData.money) {
      if (!validNumber(params.money)) {
        msg('请输入正确的金额')
        return
      }
    }
    userAddBorrowAction(params).then((res) => {
      if (res.code === 0) {
        showActionModal({
          msg: "记账成功",
          success: function () {
            Taro.redirectTo({
              url: '/pages/work_team_bookkeeping/team_record/index'
            })
          }
        })
        handleRecordSuccessSaveDate(params.business_time)
        if (typeData.id) {
          Taro.setStorageSync(teamExpenditureType, JSON.stringify(typeData))
        }
        Taro.setStorageSync(GroupLastSuccessAccountPage, params.business_type)
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
  // 用户选择分类数据
  const userChangePickerType = (data) => {
    setTypeData(data);
    userUpdatePostData(data.id, 'expend_type')
  }

  // 用户关闭 日期组件
  const DeletePickerDate = () => {
    setIsPickerDate(false)
  }
  // 用户关闭班组 组件
  const DeletePickerLeader = () => {
    setIsPickerLeader(false)
  }
  // 用户点击分类组件  右上角关闭
  const userTapRightTopCloseBtn = () => {
    // 如果没有设置过分类数据
    if (!typeData.id) {
      // 关闭options弹窗
      setShowTypePicker(false)
      // 关闭 分类 选项
      setIsPickType(false)
    }
  }

  return (
    <View>
      <ContentInput type='money' title='金额' change={userUpdatePostData} value={postData.money}/>
      {isPickerType &&
      <PickerType
        value={typeData}
        close={() => {
          setIsPickType(false)
          setTypeData({id: '', name: ''})
        }}
        onOptionClose={() => userTapRightTopCloseBtn()}
        set={(data) => userChangePickerType(data)}
        show={showTypePicker}
        setShow={(bool: boolean) => setShowTypePicker(bool)}
      />
      }
      <PickerMark text={postData.note} set={(val) => userUpdatePostData(val, 'note')}/>
      <View className='person-record-component'>
        {!isPickerType && <View className='person-record-component-item' onClick={() => {
          setIsPickType(true);
          setShowTypePicker(true)
        }}>{typeData.id ? typeData.name : '分类'}</View>}
        {!isPickerDate &&
        <View className='person-record-component-item' onClick={() => setIsPickerDate(true)}>{dateText}</View>}
      </View>
      <View className='person-record-btn'>
        <Button className='person-record-save' onClick={() => userPostAcion()}>确认记账</Button>
      </View>
    </View>
  )
}

export default observer(Expenditure)
