import Taro, { useEffect, useState, useRouter, Config, useDidShow, useReachBottom} from '@tarojs/taro'
import {View, Text, Picker, Input, Image, ScrollView, Swiper, SwiperItem} from '@tarojs/components'
import FlowList from '@/pages/work_team_record/components/flow_list/index'
import RecordDay from '@/pages/work_team_record/components/record-work/record_day/index'
import RecordAmoumt from '@/pages/work_team_record/components/record-work/record_amount/index'
import RecordMoney from '@/pages/work_team_record/components/record-work/record_money/index'
import WorkTeamTable from '@/pages/work_team_record/components/work_team_table/index'
import WorkerList from '@/pages/work_team_record/components/worker_list/index'
import RememberTypeItem from '@/store/business';
import {IMGCDNURL} from '@/config/index'
import {useLocalStore} from '@tarojs/mobx'
import AccountBookInfo from "@/store/account";
import { TypeAction, publishStatus} from '@/pages/work_team_record/team_record/index.d'
import {getTodayDate} from '@/utils/index'
import {GroupLastSuccessRecordPage, GroupLastSuccessAccountPage, TeamWorkTimeStorage} from '@/config/store'
import './index.scss'


export default function RecordWork() {
  // 获取 历史记工成功页面
  let personlLastType: number = Taro.getStorageSync(GroupLastSuccessRecordPage)
  // 选择时间缓存
  let teamWorkTimeStorage = Taro.getStorageSync(TeamWorkTimeStorage)
  /*获取账本数据*/
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const {accountBookInfo} = _accountBookInfo
  Taro.setNavigationBarTitle({ title: '班组记工' })
  Taro.setNavigationBarColor({ backgroundColor: '#0099FF', frontColor: '#ffffff' })
  // 获取stroe数据
  const localStore = useLocalStore(() => RememberTypeItem);
  // 获取remebertype数据
  const {businessType} = localStore;
  //定义页面切换类型
  const types: TypeAction[] = businessType.slice(0, 3);
  //定义当前选择的type项
  const [currentId, setCurrentId] = useState<number>(personlLastType || 1)
  // 当前选择的类型 1 记工 2记账
  const [typeItem, SetTypeItem] = useState<number>(1);


  /**
   * @name: initTime
   * @params time:string
   * @return string
   * @description 滑动滑块的时候切换当前的index
   */
  const initTime = (time: string): string[] => {
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
  // 初始化选择时间
  const initSelectTime =  (id:number): string =>{
    let dataStr = '' || initTime(getTodayDate())[1]
    if (teamWorkTimeStorage) {
      if (id == 1) {
        let workDayTime = teamWorkTimeStorage.workDayTime;
        if (workDayTime) {
          dataStr = initTime(workDayTime)[1]
        }else{
          dataStr = initTime(getTodayDate())[1]
        }
      }
      if (id == 2) {
        let workCountTime = teamWorkTimeStorage.workCountTime;
        if (workCountTime) {
          dataStr = initTime(workCountTime)[1]
        } else {
          dataStr = initTime(getTodayDate())[1]
        }
      }
      if (id == 3) {
        let workMoneyTime = teamWorkTimeStorage.workMoneyTime;
        if (workMoneyTime) {
          dataStr = initTime(workMoneyTime)[1]
        } else {
          dataStr = initTime(getTodayDate())[1]
        }
      }
    }else{
      dataStr = initTime(getTodayDate())[1]
    }
    return dataStr
  }
  //定义当前时间
  const nowTime = initTime(getTodayDate())[1]

  // 时间选择文本显示
  const [timeText, setTimeText] = useState<string>(initTime(initSelectTime(currentId))[0]);
  const [startDate, setStartDate] = useState<string>(initSelectTime(currentId))//筛选开始日期

  const [workerId, setWorkerId] = useState<number[]>([])

  const [touchBottom, setTouchBottom] = useState<boolean>(false)

  const [pageShow, setPageShow] = useState<boolean>(false)

  useDidShow(()=>{
    setPageShow(!pageShow)
  })

  useEffect(() => {
    setStartDate(initSelectTime(currentId));
    setTimeText(initTime(initSelectTime(currentId))[0])
  },[currentId])


  useEffect(() => {
    console.log('workerId父级', workerId)
  }, [workerId])

<<<<<<< HEAD
  useEffect(() => {
    Taro.setNavigationBarTitle({title: '班组记工'})
    /**获取本地格式化日期 eg:2021/01/21*/
    let timeNow = getTodayDate()
    /**按照格式初始化时间*/
    let timeStr = initTime(timeNow)[0];
    setTimeText(timeStr)
  }, [])
=======
 
>>>>>>> yangchao

  const changeTimeStorage = (time:string,id: number) => {
    let teamWorkTimeData = teamWorkTimeStorage || {};
    if (id == 1) {
      teamWorkTimeData['workDayTime'] = time;
    }
    if (id == 2) {
      teamWorkTimeData['workCountTime'] = time;
    }
    if (id == 3) {
      teamWorkTimeData['workMoneyTime'] = time;
    }
    Taro.setStorageSync('teamWorkTimeStorage', teamWorkTimeData)
  }

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
    changeTimeStorage(e.detail.value, currentId)
  }
 

  /**
   * @name: changeTable
   * @params index 当前点击的table的index
   * @return void
   * @description 点击table切换页面并更新数据
   */
  const changeTable = (index: number) => {
    Taro.setNavigationBarTitle({title: '班组记工'})
    /**设置当前选中最新index*/
    setCurrentId(Number(types[index].id))
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
        <WorkTeamTable types={types} currentId={currentId} onChange={changeTable} />
      </View>
      <View className='record-work-head-date'>
        <View className='record-work-head-title'>选择日期：</View>
        <View className='record-work-head-choose-date'>
          <Picker mode='date' onChange={changeTime} value={startDate} end={nowTime}>
            <View className='record-work-date'>{timeText}</View>
          </Picker>
          <Image src={`${IMGCDNURL}common/arrow-right.png`} className='record-work-data-image' mode='widthFix' />
        </View>
      </View>

      <ScrollView className='record-work-scroll' scrollY enableFlex onScrollToLower={() => onReatchEvent()}>
        <View className='record-worker-list'>
          <WorkerList workNote={accountBookInfo.id} currentId={currentId}
            setWorkerId={(data: number[]) => setWorkerId(data)} workerId={workerId} startDate={startDate} />
        </View>
        <View className={typeItem == 1 ? 'record-work-table-content padding' : 'record-work-table-content'}>
          <View className='record-work-table-head'>
            <View className={typeItem == 1 ? 'record-work-table-left check-item' : 'record-work-table-left'}
              data-type={1} onClick={(e) => switchTable(e)}><Text className='record-work-table-left-text'>记工</Text></View>
            <View className={typeItem == 2 ? 'record-work-table-right check-item' : 'record-work-table-right'}
              data-type={2} onClick={(e) => switchTable(e)}><Text className='record-work-table-left-text'>流水</Text></View>
          </View>
          {typeItem == 2 && (
            <View className='record-work-flow'>
              <FlowList workNote={accountBookInfo.id} touchBottom={touchBottom} currentId={currentId}
                params={startDate} types={types} pageShow={pageShow}></FlowList>
            </View>
          )}
          {typeItem == 1 && currentId == 1 &&
            <RecordDay workerId={workerId.join(',')} type={currentId} businessTime={startDate} />}
          {typeItem == 1 && currentId == 2 &&
            <RecordAmoumt workerId={workerId.join(',')} type={currentId} businessTime={startDate} />}
          {typeItem == 1 && currentId == 3 &&
            <RecordMoney workerId={workerId.join(',')} type={currentId} businessTime={startDate} />}
        </View>
      </ScrollView>
    </View>
    
  )
}
RecordWork.config = {
  navigationBarTitleText: '班组记工',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config
