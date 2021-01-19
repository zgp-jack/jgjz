import Taro, { Config, useState, useRef } from '@tarojs/taro'
import { View, Text, Picker, Input, Image } from '@tarojs/components'
import WorkCountDay from '@/components/flow/work_count_day/index'
import Popup from '@/components/popup/index'
import InputBox from '@/components/input_box/index'
import './index.scss'

interface dataList {
  name: string,
  check?: boolean
}

export default function RecordWork() {
  const [startDate, setStartDate] = useState('2021-01-18')//筛选开始日期
  const onStartDate = e => {
    setStartDate(e.detail.value)
  }
  let dataList = [{ name: "王五", check: true }, { name: "王五" }, { name: "王五" }, { name: "王五" }, { name: "王五", status: true, check: true }, { name: "王五" }, { name: "王五" }, { name: "王五", status: true}]
  let emptyCount = 6 - (dataList.length + 2)%6;
  let emptyArray:dataList[] = []
  for (let index = 0; index < emptyCount; index++) {
    emptyArray.push({name:''})
  }
  let ref = useRef();
  return (
    <View className='record-work-container'>
      <View className='record-work-head'>
        <View className='record-work-head-table'>
          <View className='record-work-checked'>记工天</View>
          <View>记工钱</View>
          <View>记工量</View>
        </View>
        <View className='record-work-head-date'>
          <View className='record-work-head-title'>选择日期：</View>
          <View className='record-work-head-choose-date'>
            <Picker mode='date' onChange={onStartDate} value={startDate}>
              <Input className='record-work-date' type='text' disabled value='2121年08月21日' />
            </Picker>
            <Image src='https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png' mode='widthFix' />
          </View>
        </View>
      </View>
      <View className='record-work-check-person'>
        <View className='record-work-person-head'>
          <View className='record-work-person-title'>
            <View>选择工友（已选<Text>3</Text>人）</View>
            <View>全选未记</View>
          </View>
          <View className='record-work-person-disc'>黄色块代表此工友当日已有记工</View>
        </View>
        <View className='record-work-person-content'>
          {dataList.map((item,index) =>(
            <View className='record-work-person-item' key={index}>
              <View className={item.check ? (item.status ? 'record-work-person-box choose-box recorded-box' : 'record-work-person-box choose-box') : (item.status ?'record-work-person-box recorded-box':'record-work-person-box')}>{item.name}
                {item.status && <Image src='https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/yc/recorded.png' mode='widthFix' className='recorded-image'></Image>}
                {item.check && <Image src='https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/yc/choose-box.png' mode='widthFix' className='choose-image'></Image>}
              </View>
              <Text className='record-work-person-text'>{item.name}</Text>
            </View>)
          )}
          <View className='record-work-person-add'>
            <View className='record-work-person-box'><Image src='https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/yc/add.png' mode='widthFix' /></View>
            <Text className='record-work-person-text'>添加</Text>
          </View>
          <View className='record-work-person-del'>
            <View className='record-work-person-box'><Image src='https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/yc/del.png' mode='widthFix' /></View>
            <Text className='record-work-person-text'>删除</Text>
          </View>
          {emptyArray.map((_,index)=>(
            <View className='record-work-person-item' key={index}></View>
          ))}
        </View>
      </View>
      <View className='record-work-table-content'>
        <View className='record-work-table-head'>
          <View className='record-work-table-left'><Text>记工</Text></View>
          <View className='record-work-table-right'><Text>记账</Text></View>
        </View>
        <View className='record-work-flow'>
          <WorkCountDay></WorkCountDay>
        </View>
      </View>
      <Popup>
        <InputBox />
        <InputBox />
      </Popup>
    </View>
  )
}

RecordWork.config = {
  navigationBarTitleText: '班组记工',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config