import Taro, { useState, useEffect, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Selectd from './components/selected/index'
import Search from './components/search/index'
import { IMGCDNURL } from '@/config/index'
import { ADDRESS_BOOK_LIST, PERSON_DATA, ADD_CONFIRM_DATA, ADD_PERSON_PARAMS } from './index.d'
import InitProvider from '@/components/init_provider'
import useInit from '@/hooks/init'
import getWorkers from './api'
import PromptBox from '@/components/popup/index'
import './index.scss'


export default function AddressBook() {
  /** 获取所有通讯录列表 */
  const { loading, data, errMsg } = useInit(getWorkers, { work_note: '718' }, [])
  /** 通信录列表数据 */
  const [list, setList] = useState<ADDRESS_BOOK_LIST[]>([]);
  /** 已选择的工友 */
  const [selectd, setSelectd] = useState<PERSON_DATA[]>([])
  /** 保存一份获取到的数据 */
  setList(data)
  /** 字母定位ID */
  const [viewTo, setViewTo] = useState<string>("")

  /** 点击字母跳转相应位置 */
  const toView = (viewId: string) => {
    setViewTo(viewId == "view#" ? 'view_' : viewId)
  }

  /** 选中或者取消选中 */
  const selectItem = (pIndex: number, cIndex: number) => {
    let newListData: ADDRESS_BOOK_LIST[] = [...list]
    //添加is_check 表示是否选中
    newListData[pIndex].data[cIndex].is_check = !newListData[pIndex].data[cIndex].is_check
    setList(newListData)

    /** 已选中的工友数据 */
    let selectdArr: PERSON_DATA[] = []
    /** 找出已选中的工友 保存到selectd中 */
    newListData.map((pItem) => {
      pItem.data.map((cItem) => { cItem.is_check ? selectdArr.push(cItem) : '' })
    })
    setSelectd(selectdArr)
  }
  /** 删除已选中的工友 */
  const deletePerson = (item: PERSON_DATA) => {
    let newListData: ADDRESS_BOOK_LIST[] = [...list]
    let newSelectd: PERSON_DATA[] = [...selectd]
    /** 从已选中里 过滤掉 当前删除的这一条*/
    setSelectd(newSelectd.filter(SelectdItem => SelectdItem.id != item.id))

    /** 从列表数据中 找到删除的这一条数据 改变is_check */
    newListData.map(pItem => {
      pItem.data.map(cItiem => {
        if (cItiem.id == item.id) {
          cItiem.is_check = false
        }
      })
    })
    setList(newListData)
  }
  /**随机选择一个颜色*/
  const randomColor = (): string => {
    let colors: string[] = ['#58C7FF', '#74E8D5', '#A4BFFF', '#79BAFF', '#4ECBF4']
    return colors[Math.floor(Math.random() * 5)]
  }

  /** 添加工友弹窗确定 */
  const addConfirm = (data: ADD_CONFIRM_DATA) => {
    if (data.name) { 
      setAddPopupShow(false)
    }else {
      Taro.showToast({
        title: '请填写工人名称',
        icon: 'none',
        duration: 1000
      })
      return
    }
    
    let params: ADD_PERSON_PARAMS = {
      name: data.name,
      tel: data.tel,
      name_color: randomColor()
    }
    
  }
  /** 添加工友弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /**是否显示添加工友弹窗*/
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  /** 弹出添加工友弹窗*/
  const showAddPopup = () => {
    setAddPopupShow(true)
  }
  return (
    <InitProvider loading={loading} errMsg={errMsg}>
      <View className="AddressBook">
        {/* 已选中工友 */}
        <Selectd selectd={selectd} deletePerson={deletePerson} />
        {/* 搜索组件 */}
        <Search addClick={showAddPopup} />

        {/* 通讯录列表 */}
        <ScrollView scrollY scrollIntoView={viewTo} scrollWithAnimation className="list_content">
          {list.map((pItem, pIndex) => (
            <View className="item" key={pItem.name_py} id={pItem.name_py == "#" ? 'view_' : 'view' + pItem.name_py}>
              <Text className="title">{pItem.name_py}</Text>

              {pItem.data.map((cItem, cIndex) => (
                <View className="item_person" key={cItem.id}>
                  <View className="left" onClick={() => selectItem(pIndex, cIndex)}>

                    {cItem.is_check && <Image className="item_checkbox" src={`${IMGCDNURL}ws/ckeckd.png`} />}
                    {!cItem.is_check && <Image className="item_checkbox" src={`${IMGCDNURL}ws/check.png`} />}
                    {/* {默认选中还没写} */}

                    <View className="avatar" style={{ background: cItem.name_color }}>{cItem.name.substring(0, 2)}</View>
                    <View className="name_tle">
                      <Text className="name">{cItem.name}</Text>
                      {cItem.tel && <Text className="tel">{cItem.tel}</Text>}
                    </View>
                  </View>
                  <View className="setting">
                    <Image className="setting_img" src={`${IMGCDNURL}ws/setting.png`} ></Image>
                  </View>
                </View>
              ))
              }
            </View>
          )
          )}
        </ScrollView>
        <View className="right_nav">
          {list.map((item) => (
            <Text className='right-nav-text' onClick={() => toView('view' + item.name_py)}>{item.name_py}</Text>
          ))}
        </View>

        {/* 底部组件 */}
        <View className="bottom_all">
          <View className="bottom_all_box">
            <Image className="bottom_all_img" src={`${IMGCDNURL}ws/check.png`} ></Image>
            <Text className="bottom_all_text" >全选</Text>
          </View>
          <View className="button">
            确定（3人）
        </View>
        </View>
      </View>
      {
        addPopupShow && <PromptBox
          titleText="添加工友"
          showTitleButton={false}
          confirmText="确定"
          inputGroup={[
            { name: 'name', title: "姓名（必填）", placeholder: '请输入对方的姓名' },
            { name: 'tel', title: "电话号码", placeholder: '请输入对方的电话号码(可不填)' }
          ]}
          confirm={addConfirm}
          cancel={addCancel}
        ></PromptBox>
      }
    </InitProvider>
  )
}

AddressBook.config = {
  navigationBarTitleText: '选择需要添加的工友'
} as Config