
import Taro, { Config, useEffect, useState, useRouter } from '@tarojs/taro'
import { View, Text,  Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import './index.scss'


interface dataList {
  name: string,
  check?: boolean
}


export default function RecordWork() {

  let dataList = [{ name: "王五", check: true }, { name: "王五" }, { name: "王五" }, { name: "王五" }, {
    name: "王五",
    status: true,
    check: true
  }, { name: "王五" }, { name: "王五" }, { name: "王五", status: true }]
  let emptyCount = 6 - (dataList.length + 2) % 6;
  let emptyArray: dataList[] = []
  for (let index = 0; index < emptyCount; index++) {
    emptyArray.push({ name: '' })
  }


  return (
    <View className='record-work-check-person'>
      <View className='record-work-person-content'>
        {dataList.map((obj, index) => (
          <View className='record-work-person-item' key={index}>
            <View
              className={obj.check ? (obj.status ? 'record-work-person-box choose-box recorded-box' : 'record-work-person-box choose-box') : (obj.status ? 'record-work-person-box recorded-box' : 'record-work-person-box')}>{obj.name}
              {obj.status &&
                <Image src={`${IMGCDNURL}yc/recorded.png`} mode='widthFix' className='recorded-image'></Image>}
              {obj.check &&
                <Image src={`${IMGCDNURL}yc/choose-box.png`} mode='widthFix' className='choose-image'></Image>}
            </View>
            <Text className='record-work-person-text'>{obj.name}</Text>
          </View>)
        )}
        <View className='record-work-person-add'>
          <View className='record-work-person-box'><Image src={`${IMGCDNURL}yc/add.png`}
            mode='widthFix' /></View>
          <Text className='record-work-person-text'>添加</Text>
        </View>
        <View className='record-work-person-del'>
          <View className='record-work-person-box'><Image src={`${IMGCDNURL}yc/del.png`}
            mode='widthFix' /></View>
          <Text className='record-work-person-text'>删除</Text>
        </View>
        {emptyArray.map((_, index) => (
          <View className='record-work-person-item' key={index}></View>
        ))}
      </View>
    </View>
  )
}

