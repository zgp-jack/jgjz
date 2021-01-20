import Taro, { useState, useEffect, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Selectd from './components/selected/index'
import Search from './components/search/index'
import { IMGCDNURL } from '@/config/index'
import ListData from './api/data'
import { ADDRESS_BOOK_LIST } from './index.d'
import InitProvider from '@/components/init_provider'
import useInit from '@/hooks/init'
import getWorkers from './api/api'
import './index.scss'


export default function AddressBook() {
  /** 获取所有通讯录列表 */
  const { loading, data, errMsg } = useInit(getWorkers, { work_note: '1'}, [])
  console.log(data)
  /** 通信录列表数据 */
  const [list, setList] = useState<ADDRESS_BOOK_LIST[]>([]);
  /** 字母定位ID */
  const [viewTo, setViewTo] = useState<string>("")

  // 获取通讯录数据
  useEffect(() => {
    let newListData = JSON.parse(JSON.stringify(ListData))
    setList(newListData)
  }, [])


  // 点击字母跳转相应位置
  const toView = (viewId: string) => {
    setViewTo(viewId)
  }

  // 选中或者取消选中
  const selectItem = (pIndex: number, cIndex: number) => {
    let newListData: ADDRESS_BOOK_LIST[] = [...list]
    newListData[pIndex].data[cIndex].is_check = !newListData[pIndex].data[cIndex].is_check
    setList(newListData)
  }


  return (
    <InitProvider loading={loading} errMsg={errMsg}>
      <View className="AddressBook">
        {/* 已选中工友 */}
        <Selectd />
        {/* 搜索组件 */}
        <Search />

        {/* 通讯录列表 */}
        <ScrollView scrollY scrollIntoView={viewTo} scrollWithAnimation className="list_content">
          {list.map((pItem, pIndex) => (
            <View className="item" key={pItem.name_py} id={'view' + pItem.name_py}>
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
    </InitProvider>
  )
}

AddressBook.config = {
  navigationBarTitleText: '通讯录'
} as Config