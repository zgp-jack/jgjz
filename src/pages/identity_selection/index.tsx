import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PromptBox from '@/components/popup/index'
import { InputValue } from '@/components/popup/index.d'
import userAddWorkNotesAction from './api'
import { IDENTITY_CONFIG } from './index.d'
import msg from '@/utils/msg'
import './index.scss'

export default function IdentitySelection() {
  /** 是否显示新增记工弹窗 */
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  /** 新增记工弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /** 个人或班组记工弹窗 */
  const [addPopupInfo, setAddPopupInfo] = useState<string>('');
  /** 个人或班组记工弹窗 */
  const [identityTpe, setIdentityTpe] = useState<number>(1);
  /** 进入个人记工账本 */
  const toPersonal = () => {
    setAddPopupInfo("新建个人记工账本")
    setIdentityTpe(1)
    setAddPopupShow(true)
  }
  /** 进入班组记工账本 */
  const toTeam = () => {
    setAddPopupInfo("新建班组记工账本")
    setIdentityTpe(2)
    setAddPopupShow(true)

  }
  /** 新增记工弹窗确定 */
  const addConfirm = (data: InputValue) => {
    if (data.name) {
      setAddPopupShow(false)
    } else {
      Taro.showToast({
        title: '请输入项目名称',
        icon: 'none',
        duration: 1000
      })
      return
    }
    /**给后台的参数*/
    let params: IDENTITY_CONFIG = {
      name: data.name,
      identity: identityTpe
    }
    /** 发送添加工友数据给后台 */
    userAddWorkNotesAction(params).then((r) => {
      msg(r.message)
      if (r.code === 0) {

      }
    })
  }

  return (
    <View className='identity-selection-box'>
      <Image className="identity-back-icon" src={`${IMGCDNURL}common/left-arrow.png`}></Image>
      <View className="identity-book-item">
        <View className="identity-selection-title">欢迎使用鱼泡记工账本</View>
        <View className="identity-selection-deail">首次进入请选择您常用的记工方式</View>

        <View className="identity-flex">
          <View className="identity-selection-type" onClick={() => toPersonal()}>
            <Image className="identity-icon" src={`${IMGCDNURL}gl/id-personal.png`}></Image>
            <View className="identity-tag-title">个人记工</View>
            <View className="identity-tag-deail">适合给自己记</View>
          </View>

          <View className="identity-selection-type" onClick={() => toTeam()}>
            <Image className="identity-icon" src={`${IMGCDNURL}gl/id-team.png`}></Image>
            <View className="identity-tag-title">班组记工</View>
            <View className="identity-tag-deail">适合给多人记</View>
          </View>
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
