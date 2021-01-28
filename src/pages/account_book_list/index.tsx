import Taro, { Config, useState, useEffect} from '@tarojs/taro'
import {View, Text, Image, Button} from '@tarojs/components'
import {IMGCDNURL} from '@/config/index'
import getWorkNotes, {editWorkNote} from './api'
import {InputValue} from '@/components/popup/index.d'
import {Edit_AddressBook_Info, ADD_RECORD_WORK_PARAMS} from './index.d'
import useInit from '@/hooks/init'
import InitProvider from '@/components/init_provider'
import PromptBox from '@/components/popup/index'
import { enterTheRecordBook } from '@/utils/index' 
import msg from '@/utils/msg'
import {useLocalStore, observer} from '@tarojs/mobx'
import AccountBookInfo from '@/store/account';
import './index.scss'

function AccountBook() {

  // 获取记工本store
  const localStore = useLocalStore(() => AccountBookInfo);
  const {setAccountBoookInfo} = localStore

  /** 获取所有记工列表 */
  const {loading, data, errMsg, setLoading} = useInit(getWorkNotes, {}, [])
  
  /** 被修改的数据 */
  const [editData, setEditData] = useState<Edit_AddressBook_Info>({
    id: 0,
    name: ''
  })
  /**是否显示修改记工弹窗*/
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  /** 修改记工弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /** 弹出修改记工弹窗*/
  const useEditBookInfo = (data) => {
    setEditData({id: data.id, name: data.name})
    setAddPopupShow(true)
  }
  /** 添加修改记工弹窗确定 */
  const addConfirm = (data: InputValue) => {
    if (data.name) {
      setAddPopupShow(false)
    } else {
      msg('请输入项目名称')
      return
    }
    /**给后台的参数*/
    let params: ADD_RECORD_WORK_PARAMS = {
      name: data.name,
      action: 'data'
    }
    /** 发送数据给后台 */
    editWorkNote(editData.id, params).then((r) => {
      msg(r.message)
      if (r.code === 0) {
        setLoading(true)
      }
    })
  }

  return (
    <View className='account-book-box'>
      <View className="account-book-top">
        <Text className="account-book-project">当前共{data.length}个项目</Text>
        <View className="account-book-top-btn">
          <View className="account-book-add" onClick={() => Taro.navigateTo({url: '/pages/identity_selection/index'})}>
            新建<Image className="account-add-icon" src={`${IMGCDNURL}gl/add-accout-book.png`}></Image>
          </View>
        </View>
      </View>
      <InitProvider loading={loading} errMsg={errMsg}>
        {data.map((item) => (
          <View className="account-book-personal account-book-item" key={item.id}>
            {item.identity == 2 ? <Text className="account-book-type-personal">个人记工</Text>
              :
              <Text className="account-book-type-team">班组记工</Text>
            }
            <View className="account-book-tag-box">
              <View className="account-book-title">
                <Text className="account-book-name">{item.name}</Text>
                <View className="account-book-edit" onClick={() => useEditBookInfo(item)}>
                  修改
                  <Image className="account-right-icon" src={`${IMGCDNURL}common/arrow-right.png`}></Image>
                </View>
              </View>
              <View className="account-book-flex">
                <View className="account-book-align"
                  onClick={() => { enterTheRecordBook(item, 'record'); setAccountBoookInfo(item)}}>
                  <Image className="account-gong-icon" src={`${IMGCDNURL}gl/Bookkeeping-icon.png`}></Image> 记工
                </View>
                <View className="account-book-align"
                  onClick={() => { enterTheRecordBook(item, 'borrow'); setAccountBoookInfo(item)}}>
                  <Image className="account-zhang-icon" src={`${IMGCDNURL}gl/record-work-icon.png`}></Image>记账
                </View>
              </View>
              <Button className="account-book-btn"
                onClick={() => { enterTheRecordBook(item, 'account'); setAccountBoookInfo(item)}}>进入记工账本</Button>
            </View>
          </View>
        ))}
        {
          // 修改记工标题组件
          addPopupShow && <PromptBox
            titleText="修改个人记工账本"
            showTitleButton={false}
            confirmText="确认修改"
            inputGroup={[
              {name: 'name', title: "项目名称", placeholder: '请输入项目名称', value: editData.name, maxlength:20},
            ]}
            confirm={(data) => addConfirm(data)}
            cancel={addCancel}
          ></PromptBox>
        }
      </InitProvider>
    </View>
  )
}

AccountBook.config = {
  navigationBarTitleText: '我的账本列表'
} as Config

export default observer(AccountBook)
