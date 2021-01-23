import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import getWorkNotes, { editWorkNote } from './api'
import { InputValue } from '@/components/popup/index.d'
import { Edit_AddressBook_Info, ADD_RECORD_WORK_PARAMS } from './index.d'
import useInit from '@/hooks/init'
import InitProvider from '@/components/init_provider'
import PromptBox from '@/components/popup/index'
import './index.scss'
import msg from '@/utils/msg'

export default function AccountBook() {
  /** 获取所有记工列表 */
  const { loading, data, errMsg, setLoading } = useInit(getWorkNotes, {}, [])
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
    console.log(data)
    setEditData({id: data.id, name: data.name})
    setAddPopupShow(true)
  }
  /** 添加修改记工弹窗确定 */
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
    let params: ADD_RECORD_WORK_PARAMS = {
      name: data.name,
      action: '1'
    }
    /** 发送添加工友数据给后台 */
    editWorkNote(editData.id, params).then((r) => {
      msg(r.message)
      if(r.code === 0){
        setLoading(true)
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
        <Text className="account-book-project">当前共{data.length}个项目</Text>
        <View className="account-book-top-btn">
          <Text className="account-book-add" onClick={() => Taro.navigateTo({ url: '/pages/identity_selection/index' })}>新建+</Text>
        </View>
      </View>
        <InitProvider loading={loading} errMsg={errMsg}>
        {data.map((item) => (
          <View className="account-book-personal account-book-item" key={item.id}>
            {item.identity == '1' ? <Text className="account-book-type-personal">个人记工</Text>
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
                <View className="account-book-align" onClick={() => Taro.navigateTo({ url: '/pages/person_record/index' })}>
                  <Image className="account-gong-icon" src={`${IMGCDNURL}gl/Bookkeeping-icon.png`}></Image> 记工</View>
                <View className="account-book-align" onClick={() => Taro.navigateTo({ url: '/pages/person_borrowing/index' })}><Image className="account-zhang-icon" src={`${IMGCDNURL}gl/record-work-icon.png`}></Image>记账</View>
            </View>
              <Button className="account-book-btn" onClick={() => enterTheRecordBook(`/pages/remember/index?id=${item.id}&name=${item.name}&type=${item.identity}`)}>进入记工账本</Button>
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
              { name: 'name', title: "项目名称", placeholder: '请输入项目名称', value: editData.name },
            ]}
            confirm={(data) => addConfirm(data)}
            cancel={addCancel}
          ></PromptBox>
        }
      </InitProvider>
    </View>
  )
}
