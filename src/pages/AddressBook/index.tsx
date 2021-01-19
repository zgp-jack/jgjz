// import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'
import Selectd from '@/pages/AddressBook/components/selected/index'
import Search from '@/pages/AddressBook/components/search/index'
import '@/pages/AddressBook/index.scss'
import Taro, { useState, useEffect } from '@tarojs/taro'
import ListData from '@/pages/AddressBook/api/data'
import { ADDRESS_BOOK_LIST } from '@/pages/AddressBook/index.d'


export default function AddressBook() {
  const [list, setList] = useState<ADDRESS_BOOK_LIST[]>([]);
  const [viewTo, setViewTo] = useState<string>("")
  useEffect(() => {
    let newListData = JSON.parse(JSON.stringify(ListData))
    setList(newListData)
  }, [])
  // 字母定位
  const toView = (viewId:string) => {
    setViewTo(viewId)
  }
  // 选中或者取消选中
  const selectItem = (index:number,index2:number) => {
    let newListData = list
    if (newListData[index].data[index2].is_check){
      newListData[index].data[index2].is_check = false
    }else {
      newListData[index].data[index2].is_check = true
    }
    setList(newListData)
  }
  return (
    <View className="AddressBook">
      <Selectd></Selectd>
      <Search></Search>
      <ScrollView scrollY scrollIntoView={viewTo} scrollWithAnimation className="list_content">
        {list.length > 0 && list.map((item,index) => (
          <View className="item" key={item.name_py} id={'view'+item.name_py}>
            <Text className="title">{item.name_py}</Text>
            {item.data.length > 0 && item.data.map((item2,index2) => (
              <View className="item_person" key={item2.id}>
                <View className="left" onClick={() => selectItem(index,index2)}>
                  {
                    item2.is_check && <Image className="item_checkbox" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/ckeckd.png"></Image>
                  }
                  {
                    !item2.is_check && <Image className="item_checkbox" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/check.png"></Image>
                  }
                  {/* {
                    默认选中还没写
                  } */}
                  <View className="avatar" style={{ background: item2.name_color }}>{item2.name.substring(0, 2)}</View>
                  <View className="name_tle">
                    <Text className="name">{item2.name}</Text>
                    {
                      item2.tel && <Text className="tel">{item2.tel}</Text>
                    }
                  </View>
                </View>
                <View className="setting">
                  <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
                </View>
              </View>
            ))
            }
          </View>
        )
        )}
      </ScrollView>
      <View className="right_nav">
        {
          list.map((item)=>(
            <Text onClick={() => toView('view'+item.name_py)}>{item.name_py}</Text>
          ))
        }
      </View>
      <View className="bottom_all">
        <View className="all">
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/check.png"></Image>
          <Text>全选</Text>
        </View>
        <View className="button">
          确定（3人）
        </View>
      </View>
    </View>
  )
}