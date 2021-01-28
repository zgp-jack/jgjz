import Taro, { useEffect, useState, useDidShow, useReachBottom, useDidHide } from '@tarojs/taro'
import { Block, Image, Picker, Text, View } from '@tarojs/components'
import { AddressBookParams, GetCountParams, GetCountResult } from "@/pages/index/inter";
import { getCountUrl } from "@/utils/api";
import LoadFooter from '@/components/load_footer/index'
import EmptyDate from '@/components/empty_data/index'
import { observer, useLocalStore } from '@tarojs/mobx'
import RememberStore from "@/store/business";
import AccountBookInfo from "@/store/account";
import User from '@/store/user'
import { IMGCDNURL } from "@/config/index";
import { enterTheRecordBook, getTodayDate } from '@/utils/index'
import WorkCountDay from '@/components/flow/work_count_day/index'
import WorkMoneyBorrowing from '@/components/flow/work_money_borrowing/index'
import {GetWorkFlowResult} from '@/pages/work_team/team_record/index.d'
import {get} from "@/utils/request";
import Login from '@/components/login/index'
import './index.scss'
import Filter from "./filter/index";
import {getBusiness} from './api'


const Remember = () => {
  /*记工类型数据*/
  const rememberStore = useLocalStore(() => RememberStore)
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const _user = useLocalStore(() => User)
  const { businessType } = rememberStore
  const { user } = _user
  const { accountBookInfo } = _accountBookInfo
  Taro.setNavigationBarTitle({ title: (accountBookInfo.identity == 2 ? '个人' : '班组') + '记工账本' })
  Taro.setNavigationBarColor({ backgroundColor: '#0099FF', frontColor: '#ffffff' })
  /*统计数据*/
  const [counts, setCounts] = useState({
    work_time: "0",
    work_time_hour: "0",
    overtime: "0",
    count_unit: [{unit: null, count: 0}],
    work_money: "",
    borrow_count: "0.00",
    expend_count: "0.00"
  })
  /*当前是个人账本还是班组账本，true:个人， false:班组*/
  const [personOrGroup, setPersonOrGroup] = useState(accountBookInfo.identity == 2)
  // 监听登录情况
  useEffect(() => {
    setPersonOrGroup(accountBookInfo.identity == 2)
  },[accountBookInfo.identity])
  
  /*获取年份*/
  const year = new Date().getFullYear()
  /*获取月份*/
  const month = new Date().getMonth() + 1
  /**获取日*/
  const day = new Date().getDate();
  const [defaultFilterData, setDefaultFilterData] = useState<GetCountParams>({
    start_business_time: '',
    end_business_time: '',
    work_note: accountBookInfo.id + '',
    worker_id: [],
    business_type: [],
    expend_type: '',
    expense_account: '',
    group_leader: [],
    is_note: '',
    unit_work_type: '',
    page: 1
  })
  /*获取统计数据，请求参数*/
  const [filterData, setFilterData] = useState<GetCountParams>(defaultFilterData)
  /** 是否显示数据为空 */
  const [showEmpty, setShowEmpty] = useState<boolean>(false);
  /** 是否显示底部没有更多数据 */
  const [showFooter, setShowFooter] = useState<boolean>(false)
  /*数组转字符串*/
  const handleArrayToString = (data: string[] | string): string => {
    if (typeof data === 'string') return data;
    return (data as string[]).join(',')
  }
  const handleAddressBookParams = (data: AddressBookParams[] | string) => {
    if (typeof data === 'string') return data;
    let result: string[] = [];
    (data as AddressBookParams[]).forEach(item => {
      result.push(String(item.id))
    })
    return result.join(',')
  }
  // 参数处理
  const actionParams = () => {
    return {
      ...filterData,
      business_type: handleArrayToString(filterData.business_type),
      group_leader: handleAddressBookParams(filterData.group_leader),
      worker_id: handleAddressBookParams(filterData.worker_id)
    }
  }
  // const {loading, increasing, list, errMsg, hasmore, setParams} = useList(getBusiness, actionParams())
  /*当前年份与月份*/
  const [currentYearMonth, setCurrentYearMonth] = useState('')
  /*筛选年份*/
  const [filterYear, setFilterYear] = useState(year)
  /*筛选月份*/
  const [filterMonth, setFilterMonth] = useState(month)
  const [showFilter, setShowFilter] = useState(false)//筛选弹窗开关
  const [isFilter, setIsFilter] = useState(false)//是否筛选了
  const [showLogin, setShowLogin] = useState(false)
  const [list, setList] = useState<GetWorkFlowResult[]>([])
  /*当前选中日期的下一个日期*/
  const [nextYearMonth, setNextYearMonth] = useState('')
  /*是否重新请求流水列表*/
  const [reloadList, setReloadList] = useState(false)
  /*获取统计数据*/
  useEffect(() => {
    if (!user.login || !filterData.start_business_time || !filterData.end_business_time) return
    console.log("1111111111111111111")
    const params = actionParams()
    initFlowList(params)
    initData(params)
  }, [filterData, user, accountBookInfo])

  /*根据筛选日期初始化请求参数*/
  useEffect(() => {
    initParams()
  }, [filterMonth, filterYear])

  // 滑动触底事件
  useReachBottom(() => {
    let paramsData = { ...filterData }
    if (showFooter || showEmpty || !list.length) return
    paramsData.page = paramsData.page + 1;
    setFilterData(paramsData)
  })

  const handIsLogin = () => {/*是否登录*/
    if (!user.login) {
      setShowLogin(true)
      return false
    }
    return true
  }
  useDidShow(() => {
    let params = { ...filterData }
    params.page = 1;
    setReloadList(true)
    if (reloadList) {
      if (!user.login) return
      setFilterData(params)
    }
  })
  useDidHide(()=>{
    setShowFooter(false)
    setShowEmpty(false)
    setList([])
  })
  const initParams = () => {
    const start_business_time = filterYear + '-' + filterMonth
    const end_business_time = getNextYearMonth()
    setCurrentYearMonth(start_business_time)
    setNextYearMonth(end_business_time)
    let data = {...defaultFilterData, start_business_time, end_business_time}
    setDefaultFilterData(data)
    setFilterData(data)
  }
  const initFlowList = (params: GetCountParams) => {
    /** 请求页面 */
    let page = filterData.page;
    getBusiness(params).then(res => {
      if (res.code === 0) {
        let lists = list;
        /** 返回数据长度 */
        let len = res.data.length
        if (page == 1 && len == 0) {
          setShowEmpty(true)
        } else {
          if (len == 0) {
            setShowFooter(true)
          }
        }
        setList(lists.concat(res.data))
      }
    }).catch(e => {

    })
  }
  /*获取统计数据*/
  const initData = (params: GetCountParams) => {
    let page = filterData.page;
    if (page > 1) return
    get<GetCountParams, GetCountResult>(getCountUrl, params).then(res => {
      if (res.code === 0) {
        setCounts(res.data.count)
      }
    }).catch(e => {

    })
  }
  /*获取当前日期的下一个月份日期*/
  const getNextYearMonth = (): string => {
    let _nextYearMonth = ''
    if (filterMonth == 12) {
      _nextYearMonth = filterYear + 1 + '-' + 1
    } else {
      _nextYearMonth = filterYear + '-' + (filterMonth + 1)
    }
    return _nextYearMonth
  }
  /*上一个月份日期*/
  const prevMonth = () => {
    if (!handIsLogin()) {
      handIsLogin()
      return
    }
    if (filterMonth == 1) {
      setFilterYear(filterYear - 1)
      setFilterMonth(12)
    } else {
      setFilterMonth(filterMonth - 1)
    }
  }
  /*下一个月份日期*/
  const nextMonth = () => {
    if (!handIsLogin()) {
      handIsLogin()
      return
    }
    if (filterMonth == 12) {
      setFilterYear(filterYear + 1)
      setFilterMonth(1)
    } else {
      setFilterMonth(filterMonth + 1)
    }
  }
  /*日期选择器选择*/
  const onFilterDateChange = (e) => {
    if (!handIsLogin()) {
      handIsLogin()
      return
    }
    const date = e.detail.value
    setCurrentYearMonth(date)
    const yearAndMonth = date.split('-')
    setFilterYear(yearAndMonth[0])
    yearAndMonth[1].charAt(yearAndMonth[1].length - 1)
    let _month = Array.from(yearAndMonth[1])
    if (_month.length > 1) {
      let selectMonth
      selectMonth = _month[0] == '0' ? _month[1] : _month.join('')
      setFilterMonth(Number(selectMonth))
    } else {
      setFilterMonth(date[1])
    }
  }
  /*确认筛选*/
  const handleConfirmFilter = (data: GetCountParams) => {
    console.log(data)
    if (JSON.stringify(data) != JSON.stringify(filterData)) {
      setFilterData(data)
      setIsFilter(true)
    }
    setShowFilter(false)
  }
  /*2020-9改成2020年09月*/
  const handleSplitDate = (date: string | undefined) => {
    if (!date) return ''
    const _date = date.split('-')
    let _month = _date[1].length == 1 ? ('0' + _date[1]) : _date[1]
    let dateStr = _date[0] + '年' + _month + '月'
    if (_date.length == 3) {
      dateStr += _date[2] + '日'
    }
    return dateStr
  }

  /*显示筛选后选中了的记工类型*/
  const handleFilterBusinessType = (id: string) => {
    const type = businessType.find(item => item.id == id)
    return type ? type.name : ''
  }
  /*重置筛选*/
  const handleResetFilter = () => {
    setIsFilter(false)
    setFilterData(defaultFilterData)
    setShowFilter(false)
  }
  /*是否是当前年月,是的话不显示右边箭头*/
  const handleHideRightArrow = () => {
    return year == filterYear && month == filterMonth
  }

  const goRecord = (e) => {
    let type = e.currentTarget.dataset.type;
    let url = `/pages/work_team/record_work/index?type=${type}`;
    handIsLogin() && Taro.navigateTo({url: url})
  }

  const handNavigateTo = (url: string) => {
    handIsLogin() && Taro.navigateTo({url})
  }


  /*1转为01*/
  const handleMonthShow = (month = filterMonth) => {
    return Number(month) < 10 ? `0${month}` : month
  }
  /*是否显示筛选了哪些内容*/
  const handleShowFilterResult = () => {
    let {is_note, business_type, group_leader, worker_id} = filterData
    return (is_note == '1' || business_type.length || (group_leader as AddressBookParams[]).length || (worker_id as AddressBookParams[]).length)
  }

  // 用户点击 记工记账 按钮
  const userTapRecordBtn = (type: 'borrow' | 'record') => {
    if (!user.login) {
      setShowLogin(true)
      return
    }
    enterTheRecordBook(accountBookInfo, type)
  }


  return (
    <View className={"remember" + (showFilter ? ' stop-move' : '')}>
      <View className="container">
        <View className="header">
          <View className={"header-tag" + (!personOrGroup ? ' header-tag-group' : '')}><View
            className="tag-text">{personOrGroup ? '个人' : '班组'}记工</View></View>
          <View className="header-title overwords">{accountBookInfo.name}</View>
          <View className="header-line"/>
          <View className="header-switch"
            onClick={() => handNavigateTo('/pages/account_book_list/index')}>切换记工本</View>
        </View>
        <View className="body">
          <View className="body-container">
            <View className="feat">
              {!isFilter ? <View className="date">
                  <View className="date-icon-bor date-icon-bor-left" onClick={prevMonth}><Image
                    src={IMGCDNURL + 'lxy/time_jt_l.png'}
                    className="icon-left date-icon"/></View>
                  <Picker fields="month" mode='date' end={getTodayDate()} onChange={onFilterDateChange}
                          value={currentYearMonth}>
                    <View className="date-value">{handleSplitDate(filterData.start_business_time)}</View>
                  </Picker>
                  {!handleHideRightArrow() &&
                  <View className="date-icon-bor date-icon-bor-right" onClick={nextMonth}><Image
                    src={IMGCDNURL + 'lxy/time_jt_r.png'}
                    className="icon-right date-icon"/></View>}
                </View>
                :
                <View className="filter-start-end-date">
                  <View
                    className="filter-start-date">开始时间：{handleSplitDate(filterData.start_business_time)}</View>
                  <View className="filter-end-date">截止时间：{handleSplitDate(filterData.end_business_time)}</View>
                </View>}
              <View className={"filter-btn" + (isFilter ? ' filter-btn-active' : '')}
                onClick={() => { !handIsLogin() ? handIsLogin() : setShowFilter(true) }}>
                <Image src={isFilter ? IMGCDNURL + 'lxy/ic_sx_blue.png' : IMGCDNURL + 'lxy/ic_sx.png'}
                  className="filter-icon"/>筛选
              </View>
            </View>
            {(isFilter && handleShowFilterResult()) &&
              <View className="filter-info" onClick={() => { !handIsLogin() ? handIsLogin() : setShowFilter(true) }}>
                <View className="filter-info-box overwords">
                  {
                    ((filterData.worker_id as AddressBookParams[]).length > 0 || (filterData.group_leader as AddressBookParams[]).length > 0) &&
                    <Text>
                      共<Text
                        className="filter-info-blue">{personOrGroup ? (filterData.worker_id as AddressBookParams[]).length : (filterData.group_leader as AddressBookParams[]).length}</Text>人
                  </Text>
                }
                {
                  (((filterData.worker_id as AddressBookParams[]).length > 0 || (filterData.group_leader as AddressBookParams[]).length > 0)
                    && (filterData.business_type as string[]).length > 0)
                  &&
                  <Text className="filter-info-line">|</Text>}
                {
                  (filterData.business_type as string[]).length > 0 && <Text>
                    {
                      (filterData.business_type as string[]).map((item, i) => (
                        <Text key={item}
                              className={"business-type-item" + (i == 0 ? ' business-type-item-last' : '')}>{handleFilterBusinessType(item)}</Text>
                      ))
                    }
                  </Text>
                }
                {
                  (filterData.is_note == '1' && (filterData.business_type as string[]).length > 0) &&
                  <Text className="filter-info-line">|</Text>
                }
                {
                  filterData.is_note == '1' && <Text>
                    <Text>有备注</Text>
                  </Text>
                }
              </View>
              <Image src={IMGCDNURL + 'lxy/arrow-right.png'} className="filter-info-arrow"/>
            </View>}
            {/*记工统计*/}
            <View className="statistics">{!isFilter && <View className="statistics-title">{filterMonth}月记工统计</View>}
              <View className="statistics-remember">
                <View className="remember-row">
                  <View className="remember-content">
                    <Image src={IMGCDNURL + 'lxy/ic_gt.png'} className="statistics-icon"/>
                    <View className="remember-values">
                      <View className="remember-value">
                        <Text className="remember-value-text">上班</Text>
                        <Text className="remember-value-text">{counts.work_time}个工</Text>
                        {counts.work_time_hour != '0' &&
                        <Text className="remember-value-text">+{counts.work_time_hour}小时</Text>}
                      </View>
                      {counts.overtime != '0' &&
                      <View className="remember-value"><Text className="remember-value-text">加班</Text><Text
                        className="remember-value-text">{counts.overtime}小时</Text></View>}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/*临时工资，平方米，筛选后才展示*/}

            {(counts.work_money || (counts.count_unit[0].unit != null && counts.count_unit[0].count != 0)) &&
            <View className="statistics">
              <View className="statistics-bookkeeping statistics-bookkeeping-unit">
                {counts.work_money && <View className="bookkeeping-row wage-meter">
                  <View className="bookkeeping-content">
                    <Image src={IMGCDNURL + 'lxy/ic_gq.png'} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        工钱
                      </View>
                      <View className="bookkeeping-value">￥{counts.work_money}</View>
                    </View>
                  </View>
                </View>}
                {
                  (counts.count_unit[0].unit != null && counts.count_unit[0].count != 0) &&
                  counts.count_unit.map((item, i) => (
                    <View className="bookkeeping-row wage-meter" key={i}>
                      <View className="bookkeeping-content">
                        <Image src={IMGCDNURL + 'lxy/ic_gl.png'} className="statistics-icon"/>
                        <View className="bookkeeping-values">
                          <View className="bookkeeping-label">
                            {item.unit}
                          </View>
                          <View className="bookkeeping-value">{item.count}</View>
                        </View>
                      </View>
                    </View>
                  ))
                }
              </View>
            </View>}

            {/*记账统计*/}
            <View className="statistics">
              {!isFilter && <View className="statistics-title">{filterMonth}月记账统计</View>}
              <View className="statistics-bookkeeping">
                {(!isFilter || (isFilter && Number(counts.borrow_count))) && <View className="bookkeeping-row">
                  <View className="bookkeeping-content">
                    <Image src={IMGCDNURL + 'lxy/ic_jz.png'} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        借支
                      </View>
                      <View className="bookkeeping-value">￥{parseFloat(counts.borrow_count).toFixed(2)}</View>
                    </View>
                  </View>
                </View>}

                {(!isFilter || (isFilter && Number(counts.expend_count))) && <View className="bookkeeping-row">
                  <View className="bookkeeping-content">
                    <Image src={IMGCDNURL + 'lxy/ic_zc.png'} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        支出
                      </View>
                      <View className="bookkeeping-value">￥{parseFloat(counts.expend_count).toFixed(2)}</View>
                    </View>
                  </View>
                </View>}
              </View>
            </View>
            <View className="statistics-flow">
                <View className="bokkeeping-list">
                {showEmpty ? <EmptyDate /> :
                    list.map(item => (
                      <Block key={item.date}>
                        <View className="bokkeeping-list-head">{item.date}</View>
                        <View className="bokkeeping-list-content">
                          {item.list.map(p => (
                            <Block key={p.id}>
                              {/* 如果是记工天 记工量 */}
                              {(p.business_type == 1 || p.business_type == 2) &&
                                <WorkCountDay list={[p]} type={p.business_type} />}
                              {/* 如果是 记工钱、 借支、 支出 */}
                              {(p.business_type == 3 || p.business_type == 4 || p.business_type == 5) &&
                                <WorkMoneyBorrowing list={[p]} type={p.business_type} />}
                            </Block>
                          ))}
                        </View>
                      </Block>
                    ))
                  }
                {!showEmpty && showFooter && <LoadFooter text='没有更多数据了~' />}
                </View>
            </View>
          </View>
        </View>
        <View className="footer">
          <View className="footer-container">
            <View className="feedback" onClick={() => handNavigateTo('/pages/feedback/index')}>
              <Image src={IMGCDNURL + 'lxy/ic_yjfk.png'} className="feedback-icon"/>
              意见反馈
            </View>
            <View className="footer-buttons">
              {!isFilter ? <View className="footer-button-box">
                  <View className="footer-button footer-button-bookkeeping" data-type={1}
                        onClick={() => userTapRecordBtn("borrow")}>记账</View>
                  <View className="footer-button footer-button-remember" data-type={2}
                        onClick={() => userTapRecordBtn("record")}>记工</View>
                </View>
                :
                <View className="footer-button exit-filter" onClick={handleResetFilter}>退出筛选</View>
              }
            </View>
          </View>
        </View>
      </View>
      {
        showFilter &&
        <View className="mask" onClick={() => setShowFilter(false)}/>
      }
      <Filter data={filterData} personOrGroup={personOrGroup} confirmFilter={data => handleConfirmFilter(data)}
              show={showFilter}
              close={() => setShowFilter(false)}
              handleSplitDate={(date) => handleSplitDate(date)}
              resetFilter={handleResetFilter}
      />
      <Login show={showLogin} setShow={() => setShowLogin(false)}></Login>
    </View>
  )
}
export default observer(Remember)
