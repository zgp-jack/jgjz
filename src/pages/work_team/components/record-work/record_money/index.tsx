import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import ContentInput from '@/components/picker_input'
import PickerMark from '@/components/picker_mark'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account'
import msg, { showBackModal } from '@/utils/msg'
import { validNumber } from '@/utils/v'
import RecordMoneyPostData, { PropsData} from './inter.d'
import userAddRecordAction from '../api'
import './index.scss'

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
    identity: Number(accountBookInfo.identity),
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
      business_time: postData.business_time,
      money: postData.money,
      identity: 2,
      worker_id: workerId
    }
    if (postData.money) {
      if (!validNumber(params.money)) {
        msg('请输入正确的金额')
        return
      }
    }
    userAddRecordAction(params).then((res) => {
      if (res.code === 0) {
        showBackModal(res.message)
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