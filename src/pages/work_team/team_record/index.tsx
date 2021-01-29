import Taro, { useEffect, useState, useRouter, Config } from '@tarojs/taro'
import {View, Text, Picker, Input, Image, ScrollView, Swiper, SwiperItem} from '@tarojs/components'
import FlowList from '@/pages/work_team/components/flow_list/index'
import RecordDay from '@/pages/work_team/components/record-work/record_day/index'
import RecordAmoumt from '@/pages/work_team/components/record-work/record_amount/index'
import RecordMoney from '@/pages/work_team/components/record-work/record_money/index'
import Borrow from '@/pages/work_team/components/record_borrow/borrow/index'
import Expenditure from '@/pages/work_team/components/record_borrow/expenditure/index'
import WorkTeamTable from '@/pages/work_team/components/work_team_table/index'
import WorkerList from '@/pages/work_team/components/worker_list/index'
import RememberTypeItem from '@/store/business';
import {IMGCDNURL} from '@/config/index'
import { useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from "@/store/account";
import { TypeAction } from '@/pages/work_team/team_record/index.d'
import { getTodayDate } from '@/utils/index'
import './index.scss'


export default function RecordWork() {
  /*获取账本数据*/
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const {accountBookInfo} = _accountBookInfo
  // 获取stroe数据
  const localStore = useLocalStore(() => RememberTypeItem);
  // 获取remebertype数据
  const {businessType} = localStore;
  // 获取当前路由
  const router: Taro.RouterInfo = useRouter()
  // 获取路由参数type 1 记账 2 记工
  let {type} = router.params;
  //定义页面切换类型
  const types: TypeAction[] = Number(type) == 1 ? businessType.slice(3) : businessType.slice(0, 3);
  //定义当前选择的type项
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  // 当前选择的类型 1 记工 2记账
  const [typeItem, SetTypeItem] = useState<number>(1);


  /**
   * @name: initTime
   * @params time:string
   * @return string
   * @description 滑动滑块的时候切换当前的index
   */
    let initTime = (time: string): string[] => {
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
  const nowTime = initTime(getTodayDate())[1]

  // 时间选择文本显示
  const [timeText, setTimeText] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(nowTime)//筛选开始日期

  const [workerId, setWorkerId] = useState<number[]>([])

  const [touchBottom, setTouchBottom] = useState<boolean>(false)

  useEffect(() => {
    console.log('workerId父级', workerId)
  }, [workerId])

  useEffect(() => {
    /**获取本地格式化日期 eg:2021/01/21*/
    let timeNow = getTodayDate()
    /**按照格式初始化时间*/
    let timeStr = initTime(timeNow)[0];
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
  }

  /**
   * @name: switchTab
   * @params e: 事件对象 current为当前滑块idnex
   * @return void
   * @description 滑动滑块的时候切换当前的index
   */
  const switchTab = (e: any) => {
    /**当前滑块的index*/
    let index = e.detail.current;
    /**保存当前滑块index*/
    setCurrentIndex(index);
    /**传递新的参数，刷新页面*/
    // setParams({business_type: types[index].id}, true)
    setTimeText(initTime(nowTime)[0])
    setStartDate(nowTime)
    SetTypeItem(1)
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
    setTimeText(initTime(nowTime)[0])
    setStartDate(nowTime)
    SetTypeItem(1)
  }

  /**
   * @name: switchTable
   * @params e 点击事件对象
   * @return void
   * @description 点击班组下方table切换记工记账或流水
   */
  const switchTable = (e: any) => {
    /**点击元素type值*/
    let typeNum: number = e.currentTarget.dataset.type;
    /**保存type值*/
    SetTypeItem(typeNum)
  }
  const onReatchEvent = function () {
    setTouchBottom(!touchBottom)
  }
  
  return (
    <View className='record-work-container'>
      <View className='record-work-head'>
        <WorkTeamTable types={types} index={currentIndex} onChange={changeTable}/>
      </View>
      <View className='record-work-head-date'>
        <View className='record-work-head-title'>选择日期：</View>
        <View className='record-work-head-choose-date'>
          <Picker mode='date' onChange={changeTime} value={startDate}>
            <Input className='record-work-date' type='text' disabled value={timeText}/>
          </Picker>
          <Image src={`${IMGCDNURL}common/arrow-right.png`} mode='widthFix'/>
        </View>
      </View>
      
      {/* <Swiper className='record-work-swiper' current={currentIndex} duration={300} onChange={(e) => switchTab(e)}> */}
        {/* {types.map((item, index) => ( */}
          {/* <SwiperItem key={item.id} className='record-work-item'> */}
            
            <ScrollView className='record-work-scroll' scrollY enableFlex onScrollToLower={()=>onReatchEvent()}>
              <View className='record-worker-list'>
                  <WorkerList workNote={accountBookInfo.id} type={Number(types[currentIndex].id)} setWorkerId={(data: number[]) => setWorkerId(data)} workerId={workerId} startDate={startDate} />
              </View>
              <View className={typeItem == 1 ? 'record-work-table-content padding' : 'record-work-table-content'}>
                <View className='record-work-table-head'>
                  <View className={typeItem == 1 ? 'record-work-table-left check-item' : 'record-work-table-left'} data-type={1} onClick={(e) => switchTable(e)}><Text>{type == '1' ? '记账' : '记工'}</Text></View>
                  <View className={typeItem == 2 ? 'record-work-table-right check-item' : 'record-work-table-right'} data-type={2} onClick={(e) => switchTable(e)}><Text>流水</Text></View>
                </View>
                {typeItem == 2 && (
                  <View className='record-work-flow'>
                    <FlowList workNote={accountBookInfo.id} touchBottom={touchBottom} currentIndex={currentIndex} params={startDate} types={types}></FlowList>
                  </View>
                )}
                {typeItem == 1 && types[currentIndex].id == '1' && 
                  <RecordDay workerId={workerId.join(',')} type={Number(types[currentIndex].id)} businessTime={startDate} />}
                {typeItem == 1 && types[currentIndex].id == '2' && 
                  <RecordAmoumt workerId={workerId.join(',')} type={Number(types[currentIndex].id)} businessTime={startDate} />}
                {typeItem == 1 && types[currentIndex].id == '3' && 
                  <RecordMoney workerId={workerId.join(',')} type={Number(types[currentIndex].id)} businessTime={startDate} />}
                {typeItem == 1 && types[currentIndex].id == '4' && 
                <Borrow workerId={workerId.join(',')} type={types[currentIndex].id} businessTime={startDate} />}
                {typeItem == 1 && types[currentIndex].id == '5' &&
                <Expenditure workerId={workerId.join(',')} type={types[currentIndex].id} businessTime={startDate}/>}
              </View>
            </ScrollView>
          {/* </SwiperItem> */}
        {/* // ))} */}
      {/* // </Swiper> */}
    </View>
  )
}
RecordWork.config = {
  navigationBarTitleText: '班组记工',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config
