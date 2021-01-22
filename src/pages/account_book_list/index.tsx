import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import getWorkers from './api'
import { editWorkNotes } from '@/utils/api'
import { RECORD_WORK_DATA, ADD_RECORD_WORK, ADD_RECORD_WORK_PARAMS } from './index.d'
import useInit from '@/hooks/init'
import InitProvider from '@/components/init_provider'
import PromptBox from '@/components/popup/index'
import { put } from '@/utils/request/index'
import './index.scss'

export default function AccountBook() {
  /** 获取所有记工列表 */
  const { loading, data, errMsg } = useInit(getWorkers, {}, [])
  /** 记工列表数据 */
  const [list, setList] = useState<RECORD_WORK_DATA[]>([]);
  /**是否显示修改记工弹窗*/
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  useEffect(() => {
    if (loading) return
    setList(data)
  }, [data])
  /** 修改记工弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /** 弹出修改记工弹窗*/
  const showAddPopup = () => {
    setAddPopupShow(true)
  }
  /** 添加修改记工弹窗确定 */
  const addConfirm = (data: ADD_RECORD_WORK) => {
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
    let params: ADD_RECORD_WORK_PARAMS = {
      name: data.name,
      action: '1'
    }
    /** 发送添加工友数据给后台 */
    put<ADD_RECORD_WORK_PARAMS, ADD_RECORD_WORK>(editWorkNotes, params, true).then((r) => {
      if (r.code == 0) {
        Taro.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
      } else {
        Taro.showToast({
          title: r.message,
          icon: 'none',
          duration: 1000
        })
      }
    })
  }

  /** 进入记工账本 */
  const enterTheRecordBook = (url: string) => {
    Taro.navigateTo({ url })
  }
  return (
    <View className='account-book-box'>
      <View className="account-book-top">
        <Text className="account-book-project">当前共1个项目</Text>
        <View className="account-book-top-btn">
          <Text className="account-book-add" onClick={() => Taro.navigateTo({ url: '/pages/identity_selection/index' })}>新建+</Text>
        </View>
      </View>
        <InitProvider loading={loading} errMsg={errMsg}>
        {data.map((pItem, pIndex) => (
          <View className="account-book-personal account-book-item" key={pItem.id}>
            {pItem.identity == '1' ? <Text className="account-book-type-personal">个人记工</Text>
              :
              <Text className="account-book-type-team">班组记工</Text>
            }
          <View className="account-book-tag-box">
            <View className="account-book-title">
                <Text className="account-book-name">{pItem.name}</Text>
                <View className="account-book-edit" onClick={showAddPopup}>修改<Image className="account-right-icon" src={`${IMGCDNURL}common/arrow-right.png`}></Image> </View>
            </View>
            <View className="account-book-flex">
                <View className="account-book-align" onClick={() => Taro.navigateTo({ url: '/pages/person_record/index' })}>
                  <Image className="account-gong-icon" src={`${IMGCDNURL}gl/Bookkeeping-icon.png`}></Image> 记工</View>
                <View className="account-book-align" onClick={() => Taro.navigateTo({ url: '/pages/person_borrowing/index' })}><Image className="account-zhang-icon" src={`${IMGCDNURL}gl/record-work-icon.png`}></Image>记账</View>
            </View>
              <Button className="account-book-btn" onClick={() => enterTheRecordBook(`/pages/remember/index?accountId=${pItem.id}&accountName=${pItem.name}&ledgerType=${pItem.identity}`)}>进入记工账本</Button>
          </View>
        </View>
        ))}
        {
          // 添加工友组件
          addPopupShow && <PromptBox
            titleText="修改个人记工账本"
            showTitleButton={false}
            confirmText="确认修改"
            inputGroup={[
              { name: 'name', title: "项目名称", placeholder: '请输入项目名称', value: '' },
            ]}
            confirm={addConfirm}
            cancel={addCancel}
          ></PromptBox>
        }
      </InitProvider>
    </View>
  )
}
