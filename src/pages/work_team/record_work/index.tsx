import Taro, { Config } from '@tarojs/taro'
import { View, Text, Picker, Input, Image } from '@tarojs/components'
import './index.scss'

export default function RecordWork() {
  // const [table, setTable] = useState("记工天")
  // const onDateChange = function (e) {
  //   console.log(e)
  // }

  return (
    <View className="record-work-container">
      <View className="record-work-head">
        <View className="record-work-head-table">
          <View className="record-work-checked">记工天</View>
          <View>记工钱</View>
        </View>
        <View className="record-work-head-date">
          <View className="record-work-head-title">选择日期：</View>
          <View className="record-work-head-choose-date">
            <Picker mode="date" onChange={this.onDateChange}>
              <Input className='record-work-date' type='text' disabled value="2121年08月21日"/>
            </Picker>
            <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png" mode="widthFix"/>
          </View>
        </View>
      </View>
      <View className="record-work-check-person">
        <View className="record-work-person-head">
          <View className="record-work-person-title">
            <View>选择工友（已选<Text>3</Text>人）</View>
            <View>全选未记</View>
          </View>
          <View className="record-work-person-disc">黄色块代表此工友当日已有记工</View>
        </View>
        <View className="record-work-person-content">
          <View className="record-work-person-item">
            <View className="record-work-person-box">王五</View>
            <Text className="record-work-person-text">王五</Text>
          </View>
          <View className="record-work-person-item">
            <View className="record-work-person-box">王五</View>
            <Text className="record-work-person-text">王五</Text>
          </View>
          <View className="record-work-person-item">
            <View className="record-work-person-box">王五</View>
            <Text className="record-work-person-text">王五</Text>
          </View>
          <View className="record-work-person-item">
            <View className="record-work-person-box">王五</View>
            <Text className="record-work-person-text">王五</Text>
          </View>
          <View className="record-work-person-item">
            <View className="record-work-person-box">王五</View>
            <Text className="record-work-person-text">王五</Text>
          </View>
          <View className="record-work-person-item">
            <View className="record-work-person-box">王五</View>
            <Text className="record-work-person-text">王五</Text>
          </View>
          <View className="record-work-person-item">
            <Image className="record-work-person-box" src="" />
            <Text className="record-work-person-text">添加</Text>
          </View>
          <View className="record-work-person-item">
            <Image className="record-work-person-box" src="" />
            <Text className="record-work-person-text">删除</Text>
          </View>
        </View>
      </View>
      <View className="record-work-table-content">
        <View className="record-work-table-head">
          <View className="record-work-table-left"><Text>记工</Text></View>
          <View className="record-work-table-right"><Text>记账</Text></View>
        </View>
      </View>
    </View>
  )
}

RecordWork.config = {
  navigationBarTitleText: '班组记工',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config