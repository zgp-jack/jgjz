import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PromptBox from '@/components/popup/index'
import { InputValue } from '@/components/popup/index.d'
import userAddWorkNotesAction from './api'
import { IDENTITY_CONFIG, Remember_Config } from './index.d'
import createConfig from './config'
import msg from '@/utils/msg'
import getWorkNotes from '../account_book_list/api'
import useInit from '@/hooks/init'
import AccountBookInfo from "@/store/account";
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

function IdentitySelection() {
  const localStore = useLocalStore(() => AccountBookInfo);
  const { setAccountBoookInfo } = localStore

  /** 获取所有记工列表 */
  const { data } = useInit(getWorkNotes, {}, [])
  let account_book_len = data.length
  /** 是否显示新增记工弹窗 */
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  /** 新增记工弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /** 个人或班组记工弹窗 */
  const [addPopupInfo, setAddPopupInfo] = useState<string>('');
  /** 个人或班组记工弹窗 1: 班组 2 : 个人 */
  const [identityTpe, setIdentityTpe] = useState<1 | 2>(1);

  /** 创建记工账本 */
  const createAccountBook = (data) => {
    setAddPopupInfo(`新建${data.type}记工账本`)
    setIdentityTpe(data.id)

    if (account_book_len > 0){//判断是否有记工
      setAddPopupShow(true)
    }else{
      let name = data.id == 2 ? "默认个人记工账本" : "默认班组记工账本"
      addWorkNotes(name,data.id)
    }
  }

  /** 新增记工弹窗确定 */
  const addConfirm = (data: InputValue) => {
    if (data.name) {
      setAddPopupShow(false)
    } else {
      msg('请输入记工本名称')
      return
    }
    addWorkNotes(data.name,identityTpe)
  }
  /** 请求新增记工 */
  const addWorkNotes = (name,id) => { 
    /**给后台的参数*/
    let params: IDENTITY_CONFIG = {
      name: name,
      identity: id
    }
    /** 发送数据给后台 */
    userAddWorkNotesAction(params).then((r) => {
      msg(r.message)
      if (r.code === 0) {
        let params: Remember_Config = { 
          id:r.data.work_note_id,
          name: name,
          identity: id,
          status: 0
        }
        // 储存mobx
        setAccountBoookInfo(params)
        Taro.redirectTo({
          url: '/pages/remember/index'
        })
      }
    })
  }
  return (
    <View className='identity-selection-box'>
      <Image className="identity-back-icon" src={`${IMGCDNURL}common/left-arrow.png`}></Image>
      <View className="identity-book-item">
        <View className="identity-selection-title">{account_book_len < 1 ? '欢迎使用鱼泡记工账本' : '新增记工账本'} </View>
        <View className="identity-selection-deail">{account_book_len < 1 ? '首次进入请选择您常用的记工方式' : '请选择您的记工方式'}</View>

        <View className="identity-flex">
          {createConfig.map(item => (
            <View className="identity-selection-type" key={item.id} onClick={() => createAccountBook(item)}>
              <Image className="identity-icon" src={item.img}></Image>
              <View className="identity-tag-title">{item.type}记工</View>
              <View className="identity-tag-deail">{item.tips}</View>
            </View>
          ))}
          
        </View>
      </View>
      {
        // 新增记工组件
        addPopupShow && <PromptBox
          titleText={addPopupInfo}
          showTitleButton={false}
          confirmText="创建"
          inputGroup={[
            { name: 'name', title: "项目名称", placeholder: '请输入项目名称', value: '' },
          ]}
          confirm={(data) => addConfirm(data)}
          cancel={addCancel}
        ></PromptBox>
      }
    </View>
  )
}
export default observer(IdentitySelection)