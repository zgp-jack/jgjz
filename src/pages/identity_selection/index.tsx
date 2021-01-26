import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { INDEXPAGE } from '@/config/pages'
import PromptBox from '@/components/popup/index'
import { InputValue } from '@/components/popup/index.d'
import userAddWorkNotesAction from './api'
import { IDENTITY_CONFIG, Remember_Config } from './index.d'
import createConfig from './config'
import msg from '@/utils/msg'
import AccountBookInfo from "@/store/account";
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

function IdentitySelection() {

  // type = '' 正常新建记工本 type = 1 新用户跳转新建默认记工本
  const router = useRouter()
  let { type = '' } = router.params

  const localStore = useLocalStore(() => AccountBookInfo);
  const { setAccountBoookInfo } = localStore

  /** 是否显示新增记工弹窗 */
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  /** 新增记工弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /** 个人或班组记工弹窗 */
  const [addPopupInfo, setAddPopupInfo] = useState<string>('');
  /** 个人或班组记工弹窗 1: 班组 2 : 个人 */
  const [identityType, setIdentityType] = useState<1 | 2>(1);

  /** 创建记工账本 */
  const createAccountBook = (data) => {
    setAddPopupInfo(`新建${data.type}记工账本`)
    setIdentityType(data.id)

    if (!type){//判断是否有记工
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
    addWorkNotes(data.name,identityType)
  }
  /** 请求新增记工 */
  const addWorkNotes = (name: string,type: number) => { 
    /**给后台的参数*/
    let params: IDENTITY_CONFIG = {
      name: name,
      identity: type
    }
    /** 发送数据给后台 */
    userAddWorkNotesAction(params).then((r) => {
      msg(r.message)
      if (r.code === 0) {
        let _params: Remember_Config = { 
          id:r.data.work_note_id,
          name: name,
          identity: type,
          status: 0
        }
        // 储存mobx
        setAccountBoookInfo(_params)
<<<<<<< HEAD
        Taro.redirectTo({
          url: INDEXPAGE
=======
        Taro.reLaunch({
          url: '/pages/remember/index'
>>>>>>> lcmxkg
        })
      }
    })
  }
  return (
    <View className='identity-selection-box'>
      {/* <Image className="identity-back-icon" src={`${IMGCDNURL}common/left-arrow.png`}></Image> */}
      <View className="identity-book-item">
        <View className="identity-selection-title">{!type ? '欢迎使用鱼泡记工账本' : '新增记工账本'} </View>
        <View className="identity-selection-deail">{!type ? '首次进入请选择您常用的记工方式' : '请选择您的记工方式'}</View>

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