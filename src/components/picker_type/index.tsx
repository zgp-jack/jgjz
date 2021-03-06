import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Image, Text, Input} from '@tarojs/components'
import PickerOption from '@/components/picker/picker-option'
import {IMGCDNURL} from '@/config/index'
import userGetExpendType, {userAddExpendType, userDelExpendType, userEditExpendType} from './api'
import PickerTypeProps from './inter.d'
import Popup from '@/components/popup'
import {InputItem} from '@/components/popup/index.d'
import {observer, useLocalStore} from '@tarojs/mobx'
import ClassifyType from '@/store/classify';
import ClassifyItem from '@/store/classify/inter.d'
import './index.scss'
import msg, {showActionModal} from '@/utils/msg'

// 被修改数据的index
let current = 0

function PickerType({
                      img = `${IMGCDNURL}zgp/classify_icon.png`,
                      title = '分类',
                      value = {id: '', name: '无分类'},
                      hideImg = false,
                      close,
                      onOptionClose,
                      set,
                      show,
                      setShow,
                      rightClose = true,
                      isRecord = false,
                      onDelete,
                      setIsPickerMark
                    }: PickerTypeProps) {

  // input-name
  const inputName: string = 'name'
  // 是否已经加载过分类数据
  const [loading, setLoading] = useState<boolean>(false)
  // 是否显示添加 修改弹窗
  const [showPopup, setShowPopup] = useState<boolean>(false)
  // 添加 修改弹窗 input 内容
  const [popupData, setPopupData] = useState<InputItem[]>([{
    title: '分类名称:',
    name: inputName,
    placeholder: '请输入分类名称',
    value: ''
  }])
  // 修改弹窗的id
  const [id, setId] = useState<string>('')
  // 用户确认选择picker
  const userSurePicker = (data) => {
    setShow(true)
    console.log(data)
    set && set(data)
    setShow(false)
    setIsPickerMark && setIsPickerMark(true)
  }

  // 获取stroe里面的数据
  const localStore = useLocalStore(() => ClassifyType);
  const {initClassifyType, addClassifyType, delClassifyType, editClassifyType, status, types} = localStore

  // 初始化分类数据
  const initClassifyTypeData = () => {
    if (loading || status) return
    userGetExpendType({}).then(res => {
      if (res.code === 0) {
        setLoading(true)
        initClassifyType(res.data)
      }
    })
  }

  useEffect(() => {
    initClassifyTypeData();
  }, [])

  // 用户新增 请求
  const userEditData = (data) => {
    if (!data.name) {
      Taro.showToast({title: '请输入分类名称', icon: 'none'})
      return
    }
    let value: string = data[inputName]
    if (value) {
      console.log(id)
      // 新增数据
      if (!id) {
        userAddAction(value)
      } else {
        let params = {id, name: value}
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
        addClassifyType(res.data)
        setShowPopup(false)
        userSurePicker(res.data)
      }
    })
  }

  // 用户修改数据
  const userEditAction = (params) => {
    userEditExpendType(params).then(res => {
      msg(res.message)
      if (res.code === 0) {
        if (params.id == value.id) {
          set && set(params)
        }
        editClassifyType(current, params)
        setShowPopup(false)
      }
    })
  }

  // 用户添加弹窗或者修改弹窗 1 添加 2 修改
  const userEditItemType = (item?: ClassifyItem) => {
    let obj: InputItem = {...popupData[0]}
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
              onDelete && onDelete(id)
              !i && setShowPopup(false);
              !i && (i = getTypesIndex() || 0);
              (types[i].id == value.id) && isRecord && set && set({id: '', name: '无分类'}, types[i]);
              delClassifyType(i)
            }
          })
        }
      }
    })
  }

  const getTypesIndex = () => {
    for (let i = 0; i < types.length; i++) {
      if (types[i].id == id) return i;
    }
  }
  return (
    <View>
      {/* 分类item */}
      <View className="person-record-overtime person-record-date" onClick={() => { setIsPickerMark && setIsPickerMark(false);setShow(true)}}>
        {!hideImg && <Image className="person-record-date-img" src={img}/>}
        <View className="person-record-modify-title person-record-date-title">{title}</View>
        <Input className="person-record-date-text" value={value.name} placeholder='请添加您的分类' disabled></Input>
        {rightClose && <Text className="overtime-icon" onClick={(e) => {
          e.stopPropagation();
          close && close()
        }}></Text>}
      </View>

      {/* picker弹窗 */}
      {show &&
      <PickerOption
        title={'选择分类'}
        close={() => {
          setIsPickerMark && setIsPickerMark(true)
          setShow(false);
          onOptionClose && onOptionClose()
        }}
        show={show}
        confirm={(data) => userSurePicker(data)}
        add={() => userEditItemType()}
        data={types}
        status={status}
        edit={(data, i) => {
          current = i;
          userEditItemType(data);
        }}
        del={(id, i) => {
          userDelExpendTypeAction(id, i)
        }}
      />}

      {/* 新增弹窗 */}
      {showPopup && <Popup
        titleText={id ? '修改分类' : '添加分类'}
        showTitleButton={id ? true : false}
        inputGroup={popupData}
        confirmText='确定'
        cancel={() => setShowPopup(false)}
        confirm={(data) => userEditData(data)}
        delet={() => userDelExpendTypeAction(id, 0)}
      />}
    </View>
  )
}

export default observer(PickerType)
