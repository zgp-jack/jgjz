import Taro, { Config, useState } from '@tarojs/taro'
import { View, Text, Picker, Input, Image, ScrollView, Block, Swiper, SwiperItem } from '@tarojs/components'
import WorkCountDay from '@/components/flow/work_count_day/index'
import WorkMoneyBorrowing from '@/components/flow/work_money_borrowing/index'
import ListProvider from '@/components/list_provider'
import { GetWorkFlowParams } from './index.d'
import useList from '@/hooks/list'
import { TypeAction } from './index.d'
import getFlowlists from './api'
// import Popup from '@/components/popup/index'
import './index.scss'


interface dataList {
  name: string,
  check?: boolean
}


export default function RecordWork() {
  // 初始化请求参数
  let params: GetWorkFlowParams = {
    /**记工类型 1记工天，2记工量，3记工钱，4借支, 5支出*/
    business_type: '1',
    /**开始时间*/ 
    start_business_time: '2021-01-20',
    /**当前账本，个人账本或者班组账本id*/ 
    work_note: '702',
    /**结束时间*/ 
    end_business_time: '2021-01-20',
    /**页码*/ 
    page: 1
  }
  const { loading, setLoading, increasing, list, errMsg, setIncreasing, hasmore } = useList(getFlowlists, params)
  console.log("list", list)

  //定义页面切换类型
  const types: TypeAction[] = [{ id: 'day', name: '记工天' }, { id: 'money', name: '记工钱' }, { id: 'count', name: '记工量' }];

//定义当前选择的type项
const [currentIndex, setCurrentIndex] = useState<number>(0)


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

/**
 * @name: switchTab
 * @params e: 事件对象 current为当前滑块idnex
 * @return void
 * @description 滑动滑块的时候切换当前的index
*/
  const switchTab = (e) => {
    /**当前滑块的index*/ 
    let index = e.detail.current;
    /**保存当前滑块index*/ 
    setCurrentIndex(index);
  }



  return (
    <View className='record-work-container'>
      <View className='record-work-head'>
        <View className='record-work-head-table'>
          {types.map((item,index) => (
            <Block key={item.id}>
              <View className={currentIndex == index ? 'record-work-checked': ''} data-id={item.id}>{item.name}</View>
            </Block>
          ))}
        </View>
      </View>
      <Swiper className="record-work-swiper" current={currentIndex} duration={300} onChange={(e) => switchTab(e)}>
        {types.map(_ => (
          <SwiperItem>
            <ScrollView className="record-work-scroll" scrollY enableFlex>
              <View className='record-work-head-date'>
                <View className='record-work-head-title'>选择日期：</View>
                <View className='record-work-head-choose-date'>
                  <Picker mode='date' onChange={onStartDate} value={startDate}>
                    <Input className='record-work-date' type='text' disabled value='2121年08月21日' />
                  </Picker>
                  <Image src='https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png' mode='widthFix' />
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
                  {dataList.map((item, index) => (
                    <View className='record-work-person-item' key={index}>
                      <View className={item.check ? (item.status ? 'record-work-person-box choose-box recorded-box' : 'record-work-person-box choose-box') : (item.status ? 'record-work-person-box recorded-box' : 'record-work-person-box')}>{item.name}
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
                  {emptyArray.map((_, index) => (
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
                  <ListProvider
                    increasing={increasing}
                    loading={loading}
                    errMsg={errMsg}
                    hasmore={hasmore}
                    length={list.length}
                  >
                    {(currentIndex == 0 || currentIndex == 2) && <WorkCountDay></WorkCountDay>}
                    {currentIndex == 1 && <WorkMoneyBorrowing></WorkMoneyBorrowing>}
                  </ListProvider>
                </View>
              </View>
              {/* <Popup></Popup> */}
            </ScrollView>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

RecordWork.config = {
  navigationBarTitleText: '班组记工',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config