import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import PickerOption from '@/components/picker/picker-option'
import { IMGCDNURL } from '@/config/index'
import useInit from '@/hooks/init'
import userGetExpendType, { userEditExpendType, userAddExpendType, userDelExpendType } from './api'
import PickerTypeProps, { PopupInputGroup }  from './inter.d'
import ClassifyItem from '@/store/classify/inter'
import { observer, useLocalStore } from '@tarojs/mobx'
import ClassifySubitem from '@/store/classify/subitem';
import msg, { showActionModal } from '@/utils/msg'
import Popup from '@/components/popup'
import './index.scss'

// 被修改数据的index
let current = 0

function PickerType({
  img = `${IMGCDNURL}zgp/subitem_icon.png`,
  title = '分项',
  value = '',
  hideImg = false,
  set,
  close
}: PickerTypeProps) {

  // input-name
  const inputName: string = 'name'
  // 是否显示picker
  const [show, setShow] = useState<boolean>(false)
  // 是否显示添加 修改弹窗
  const [showPopup, setShowPopup] = useState<boolean>(false)
  // 添加 修改弹窗 input 内容
  const [popupData, setPopupData] = useState<PopupInputGroup[]>([{ title: '分类名称:', name: inputName, placeholder: '请输入分类名称', value: '' }])
  // 修改弹窗的id
  const [id, setId] = useState<string>('')
  // 用户确认选择picker
  const userSurePicker = (data) => {
    setShow(true)
    console.log(data)
    set && set(data)
  }

  // 获取stroe里面的数据
  const { data, loading } = useInit(userGetExpendType, {}, [])
  const localStore = useLocalStore(() => ClassifySubitem);
  const { addClassifySubitem, initClassifySubitem, delClassifySubitem, editClassifySubitem, status } = localStore

  useEffect(() => {
    if (loading) return
    initClassifySubitem(data)
  }, [data])


  // 用户新增 请求
  const userEditData = (data) => {
    let value: string = data[inputName]
    if (value) {
      console.log(id)
      // 新增数据
      if (!id) {
        userAddAction(value)
      } else {
        let params = { id, name: value }
        console.log(params)
        userEditAction(params)
      }
    }
  }

  // 用户新增数据
  const userAddAction = (value: string) => {
    userAddExpendType(value).then(res => {
      msg(res.message)
      if (res.code === 0) {
        addClassifySubitem(res.data)
        setShowPopup(false)
      }
    })
  }

  // 用户修改数据
  const userEditAction = (params) => {
    userEditExpendType(params).then(res => {
      msg(res.message)
      if (res.code === 0) {
        console.log(current)
        editClassifySubitem(current, params)
        setShowPopup(false)
      }
    })
  }

  // 用户添加弹窗或者修改弹窗 1 添加 2 修改
  const userEditItemType = (item?: ClassifyItem) => {
    console.log(current)
    let obj: PopupInputGroup = { ...popupData[0] }
    if (item) {
      obj.value = item.name
      setId(item.id)
    } else {
      obj.value = ''
      setId('')
    }
    setPopupData([obj])
    setShowPopup(true)
  }

  // 用户删除数据
  const userDelExpendTypeAction = (id: string, i: number) => {
    showActionModal({
      msg: '是否删除该分类？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          userDelExpendType(id).then(res => {
            msg(res.message)
            if (res.code === 0) {
              delClassifySubitem(i)
            }
          })
        }
      }
    })
  }

  return (
    <View>
      <View className="person-record-overtime person-record-date" onClick={() => setShow(true)}>
        {!hideImg && <Image className="person-record-date-img" src={img} />}
        <View className="person-record-modify-title person-record-date-title">{title}</View>
        <Input className="person-record-date-text" value={value} placeholder='请添加您的分类' disabled></Input>
        <Text className="overtime-icon" onClick={() => { close && close() }}></Text>
      </View>

      {show &&
        <PickerOption
          close={() => setShow(false)}
          show={show}
          confirm={(data) => userSurePicker(data)}
          add={() => userEditItemType() }
          data={data}
          status={status && !loading}
          edit={(data, i) => { current = i; userEditItemType(data); }}
          del={(id, i) => { userDelExpendTypeAction(id, i) }}
        />}


      {/* 新增弹窗 */}
      {showPopup && <Popup
        titleText={id ? '修改分类' : '添加分类'}
        showTitleButton={false}
        inputGroup={popupData}
        confirmText='确定'
        cancel={() => setShowPopup(false)}
        confirm={(data) => userEditData(data)}
      />}
    </View>
  )
}

export default observer(PickerType)