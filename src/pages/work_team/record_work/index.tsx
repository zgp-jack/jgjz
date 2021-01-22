import Taro, {Config, useEffect, useState, useRouter} from '@tarojs/taro'
import {View, Text, Picker, Input, Image, ScrollView, Block, Swiper, SwiperItem} from '@tarojs/components'
import WorkCountDay from '@/components/flow/work_count_day/index'
import WorkMoneyBorrowing from '@/components/flow/work_money_borrowing/index'
import WorkTeamTable from '@/pages/work_team/components/work_team_table/index'
import ListProvider from '@/components/list_provider'
import {IMGCDNURL} from '@/config/index'
import {observer, useLocalStore} from '@tarojs/mobx'
import {GetWorkFlowParams, GetWorkFlowResult, loadData} from './index.d'
import RememberTypeItem from '@/store/business';
import useList from '@/hooks/list'
import {TypeAction} from './index.d'
import getFlowlists from './api'
import {get} from '@/utils/request'
import Popup from '@/components/popup/index'
import './index.scss'


interface dataList {
  name: string,
  check?: boolean
}


export default function RecordWork() {
  // 获取stroe数据
  const localStore = useLocalStore(() => RememberTypeItem);
  // 获取remebertype数据
  const {businessType} = localStore;
  // 获取当前路由
  const router: Taro.RouterInfo = useRouter()
  // 获取路由参数type 1 记账 2 记工
  let {type} = router.params;
  //定义页面切换类型
  const types: TypeAction[] = type == '1' ? businessType.slice(3) : businessType.slice(0, 3);
  //定义当前选择的type项
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  /**
   * @name: initTime
   * @params time:string
   * @return string
   * @description 滑动滑块的时候切换当前的index
   */
  var initTime = (time: string): string[] => {
    /**检查字符串格式是哪种  / 或者 | */
    let result = time.search("/")
    /**字符串转换成成数组*/
    let timeArray = result !== -1 ? time.split("/") : time.split("-");
    /**处理日期的月和日为小于10，只有一位补充为两位*/
    timeArray[1] = timeArray[1].length < 2 && Number(timeArray[1]) < 10 ? `0${timeArray[1]}` : timeArray[1];
    timeArray[2] = timeArray[2].length < 2 && Number(timeArray[2]) < 10 ? `0${timeArray[2]}` : timeArray[2];
    /**返回处理日期字符串*/
    return [`${timeArray[0]}年${timeArray[1]}月${timeArray[2]}日`, `${timeArray[0]}-${timeArray[1]}-${timeArray[2]}`, `${timeArray[0]}/${timeArray[1]}/${timeArray[2]}`]
  }
  //定义当前时间
  const nowTime = initTime(new Date().toLocaleDateString())[1]
  // 初始化请求参数
  let defaultParams: GetWorkFlowParams = {
    /**记工类型 1记工天，2记工量，3记工钱，4借支, 5支出*/
    business_type: types[currentIndex].id,
    /**开始时间*/
    start_business_time: nowTime,
    /**当前账本，个人账本或者班组账本id*/
    work_note: '873',
    /**结束时间*/
    end_business_time: nowTime,
    /**页码*/
    page: 1
  }
  // 时间选择文本显示
  const [timeText, setTimeText] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(nowTime)//筛选开始日期

  const {loading, increasing, list, errMsg, hasmore, setParams} = useList(getFlowlists, defaultParams)


  let dataList = [{name: "王五", check: true}, {name: "王五"}, {name: "王五"}, {name: "王五"}, {
    name: "王五",
    status: true,
    check: true
  }, {name: "王五"}, {name: "王五"}, {name: "王五", status: true}]
  let emptyCount = 6 - (dataList.length + 2) % 6;
  let emptyArray: dataList[] = []
  for (let index = 0; index < emptyCount; index++) {
    emptyArray.push({name: ''})
  }

  useEffect(() => {
    /**获取本地格式化日期 eg:2021/01/21*/
    let nowTime = new Date().toLocaleDateString()
    /**按照格式初始化时间*/
    let timeStr = initTime(nowTime)[0];
    setTimeText(timeStr)
  }, [])

  /**
   * @name: changeTime
   * @params null
   * @return null
   * @description 日期picker选择器，选择日期
   */
  const changeTime = (e: any) => {
    let timeStr = initTime(e.detail.value)[0]
    setTimeText(timeStr)
    setStartDate(e.detail.value)
    /**传递新的参数，刷新页面*/
    setParams({start_business_time: e.detail.value, end_business_time: e.detail.value}, true)
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
    /**传递新的参数，刷新页面*/
    setParams({business_type: types[index].id}, true)
    setTimeText(initTime(nowTime)[0])
    setStartDate(nowTime)
  }


  /**
   * @name: changeTable
   * @params index 当前点击的table的index
   * @return void
   * @description 点击table切换页面并更新数据
   */
  const changeTable = (index: number) => {
    /**设置当前选中最新index*/
    setCurrentIndex(index)
    /**传递新的参数，刷新页面*/
    setParams({business_type: types[index].id}, true)
    setTimeText(initTime(nowTime)[0])
    setStartDate(nowTime)
  }

  return (
    <View className='record-work-container'>
      <View className='record-work-head'>
        <WorkTeamTable types={types} index={currentIndex} onChange={changeTable}/>
      </View>
      <Swiper className="record-work-swiper" current={currentIndex} duration={300} onChange={(e) => switchTab(e)}>
        {types.map(item => (
          <SwiperItem key={item.id}>
            <View className='record-work-head-date'>
              <View className='record-work-head-title'>选择日期：</View>
              <View className='record-work-head-choose-date'>
                <Picker mode='date' onChange={changeTime} value={startDate}>
                  <Input className='record-work-date' type='text' disabled value={timeText}/>
                </Picker>
                <Image src={`${IMGCDNURL}common/arrow-right.png`} mode='widthFix'/>
              </View>
            </View>
            <ScrollView className="record-work-scroll" scrollY enableFlex>
              <View className='record-work-check-person'>
                <View className='record-work-person-head'>
                  <View className='record-work-person-title'>
                    <View>选择工友（已选<Text>3</Text>人）</View>
                    <View>全选未记</View>
                  </View>
                  <View className='record-work-person-disc'>黄色块代表此工友当日已有记工</View>
                </View>
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
                                                                    mode='widthFix'/></View>
                    <Text className='record-work-person-text'>添加</Text>
                  </View>
                  <View className='record-work-person-del'>
                    <View className='record-work-person-box'><Image src={`${IMGCDNURL}yc/del.png`}
                                                                    mode='widthFix'/></View>
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
                    {(types[currentIndex].id == "1" || types[currentIndex].id == "2") &&
                    <WorkCountDay list={list.length ? list[0].list : []} type={types[currentIndex].id}></WorkCountDay>}
                    {(types[currentIndex].id == "3" || types[currentIndex].id == "4" || types[currentIndex].id == "5") &&
                    <WorkMoneyBorrowing list={list.length ? list[0].list : []}
                                        type={types[currentIndex].id}></WorkMoneyBorrowing>}
                  </ListProvider>
                </View>
              </View>
              {/* <Popup /> */}
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
