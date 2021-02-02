import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerMark from '@/components/picker_mark'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import msg, { showBackModal, showModal, showActionModal } from '@/utils/msg'
import { validNumber } from '@/utils/v'
import { GroupLastSuccessRecordPage } from '@/config/store'
import RecordMoneyPostData, { PropsData} from './inter.d'
import userAddRecordAction from '../api'
import './index.scss'
import {handleRecordSuccessSaveDate} from "@/utils/index";

function RecordMoney({ workerId, type, businessTime }: PropsData) {
  // 获取记工本数据
  const localStore = useLocalStore(() => AccountBookInfo);
  const { accountBookInfo } = localStore
  // 记工钱提交数据
  const [postData, setPostData] = useState<RecordMoneyPostData>({
    business_type: type || 3,
    business_time: businessTime,
    note: '',
    money: '',
    identity: accountBookInfo.identity,
    worker_id: workerId,
    work_note: accountBookInfo.id
  })

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: any = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    let params: RecordMoneyPostData = {
      note: postData.note,
      work_note: accountBookInfo.id,
      business_type: 3,
      business_time: businessTime,
      money: postData.money,
      identity: accountBookInfo.identity,
      worker_id: workerId
    }
    if(params.worker_id == ''){
      msg('请选择工人！')
      return
    }
    if (postData.money) {
      if (!validNumber(params.money)) {
        msg('请输入正确的金额')
        return
      }
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        showActionModal({
          msg: res.message,
          success: function () {
            Taro.redirectTo({
              url: '/pages/work_team_record/team_record/index'
            })
          }
        })
        Taro.setStorageSync(GroupLastSuccessRecordPage, params.business_type)
        handleRecordSuccessSaveDate(params.business_time)
      } else {
        msg(res.message)
      }
    })
  }

  return (<View>
    <ContentInput title='金额' value={postData.money} change={userUpdatePostData} type='money' />

    <PickerMark text={postData.note as string} set={(val) => userUpdatePostData(val, 'note')} />
    <View className='person-record-btn'>
      <Button className='person-record-save' onClick={() => userPostAcion()}>确认记工</Button>
    </View>
  </View>)
}
export default observer(RecordMoney)
