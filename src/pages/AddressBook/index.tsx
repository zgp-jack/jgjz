// import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import './index.scss'
import Selectd from '@/pages/AddressBook/components/selected/index'
import Search from '@/pages/AddressBook/components/search/index'
import '@/pages/AddressBook/index.scss'
export default function AddressBook(){
  return (
    <View className="AddressBook">
      <Selectd></Selectd>
      <Search></Search>
      <View className="list_content">
        <View className="item">
          <Text className="title">A</Text>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>  
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
        </View>
        <View className="item">
          <Text className="title">A</Text>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
        </View>
        <View className="item">
          <Text className="title">A</Text>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
        </View>
        <View className="item">
          <Text className="title">A</Text>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
        </View>
        <View className="item">
          <Text className="title">A</Text>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
          <View className="item_person">
            <View className="left">
              <View className="item_checkbox"></View>
              <View className="avatar">老王</View>
              <View className="name_tle">
                <Text className="name">老王计划</Text>
                <Text className="tel">13666241346</Text>
              </View>
            </View>
            <View className="setting">
              <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/setting.png"></Image>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}