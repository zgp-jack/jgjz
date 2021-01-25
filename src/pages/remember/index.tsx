import Taro, {useEffect, useState} from '@tarojs/taro'
import {Block, Image, Picker, Text, View} from '@tarojs/components'
import React from 'react'
import './index.scss'
import filter from '@/images/ic_sx.png'
import remember from '@/images/ic_gt.png'
import debt from '@/images/ic_jz.png'
import expenditure from '@/images/ic_zc.png'
import feedback from '@/images/ic_yjfk.png'
import arrowRight from '@/images/arrow-right.png'
import WorkCountDay from '@/components/flow/work_count_day/index'
import WorkMoneyBorrowing from '@/components/flow/work_money_borrowing/index'
import filterActive from '@/images/ic_sx_blue.png'
import wage from '@/images/ic_gq.png'
import meter from '@/images/ic_gl.png'
import Filter from "./filter/index";
import {get} from "@/utils/request";
import {getBusiness} from './api'
import {AddressBookParams, GetCountParams, GetCountResult} from "@/pages/remember/inter";
import {getCountUrl} from "@/utils/api";
import {observer, useLocalStore} from '@tarojs/mobx'
import RememberStore from "@/store/business";
import AccountBookInfo from "@/store/account";
import useList from '@/hooks/list'
import ListProvider from '@/components/list_provider'

const Remember = () => {
  /*记工类型数据*/
  const rememberStore = useLocalStore(() => RememberStore)
  const _accountBookInfo = useLocalStore(() => AccountBookInfo)
  const {businessType} = rememberStore
  const {accountBookInfo} = _accountBookInfo
  Taro.setNavigationBarTitle({title: (accountBookInfo.identity == 1 ? '个人' : '班组') + '记工账本'})
  Taro.setNavigationBarColor({backgroundColor: '#0099FF', frontColor: '#ffffff'})
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
  const [personOrGroup] = useState(accountBookInfo.identity == 1)
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
  const {loading, increasing, list, errMsg, hasmore, setParams} = useList(getBusiness, actionParams())
  /*当前年份与月份*/
  const [currentYearMonth, setCurrentYearMonth] = useState('')
  /*筛选年份*/
  const [filterYear, setFilterYear] = useState(year)
  /*筛选月份*/
  const [filterMonth, setFilterMonth] = useState(month)
  const [showFilter, setShowFilter] = useState(false)//筛选弹窗开关
  const [isFilter, setIsFilter] = useState(false)//是否筛选了


  /*当前选中日期的下一个日期*/
  const [nextYearMonth, setNextYearMonth] = useState('')
  /*获取统计数据*/
  useEffect(() => {
    if (!filterData.start_business_time || !filterData.end_business_time) return
    const params = actionParams()
    initData(params)
    setParams({...params}, true)
  }, [filterData])

  /*根据筛选日期初始化请求参数*/
  useEffect(() => {
    initParams()
  }, [filterMonth, filterYear])
  const initParams = () => {
    const start_business_time = filterYear + '-' + filterMonth
    const end_business_time = getNextYearMonth()
    setCurrentYearMonth(start_business_time)
    setNextYearMonth(end_business_time)
    let data = {...defaultFilterData, start_business_time, end_business_time}
    setDefaultFilterData(data)
    setFilterData(data)
  }
  /*获取统计数据*/
  const initData = (params: GetCountParams) => {
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
    if (filterMonth == 1) {
      setFilterYear(filterYear - 1)
      setFilterMonth(12)
    } else {
      setFilterMonth(filterMonth - 1)
    }
  }
  /*下一个月份日期*/
  const nextMonth = () => {
    if (filterMonth == 12) {
      setFilterYear(filterYear + 1)
      setFilterMonth(1)
    } else {
      setFilterMonth(filterMonth + 1)
    }
  }
  /*日期选择器选择*/
  const onFilterDateChange = (e) => {
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
    Taro.navigateTo({
      url: url
    })
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
  return (
    <View className={"remember" + (showFilter ? ' stop-move' : '')}>
      <View className="container">
        <View className="header">
          <View className={"header-tag" + (!personOrGroup ? ' header-tag-group' : '')}><View
            className="tag-text">{personOrGroup ? '个人' : '班组'}记工</View></View>
          <View className="header-title overwords">{accountBookInfo.name}记工账本</View>
          <View className="header-line"/>
          <View className="header-switch"
                onClick={() => Taro.navigateTo({url: '/pages/account_book_list/index'})}>切换记工本</View>
        </View>
        <View className="body">
          <View className="body-container">
            <View className="feat">
              {!isFilter ? <View className="date">
                  <View className="date-icon-bor" onClick={prevMonth}><View className="icon-left date-icon"/></View>
                  <Picker fields="month" mode='date' onChange={onFilterDateChange} value={currentYearMonth}>
                    <View className="date-value">{handleSplitDate(filterData.start_business_time)}</View>
                  </Picker>
                  {!handleHideRightArrow() &&
                  <View className="date-icon-bor" onClick={nextMonth}><View className="icon-right date-icon"/></View>}
                </View>
                :
                <View className="filter-start-end-date">
                  <View
                    className="filter-start-date">开始时间：{handleSplitDate(filterData.start_business_time)}</View>
                  <View className="filter-end-date">截止时间：{handleSplitDate(filterData.end_business_time)}</View>
                </View>}
              <View className={"filter-btn" + (isFilter ? ' filter-btn-active' : '')}
                    onClick={() => setShowFilter(true)}>
                <Image src={isFilter ? filterActive : filter} className="filter-icon"/>筛选
              </View>
            </View>
            {(isFilter && handleShowFilterResult()) &&
            <View className="filter-info" onClick={() => setShowFilter(true)}>
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
                {/*<Text className="overwords">生活费哈哈哈哈</Text>*/}
              </View>
              <Image src={arrowRight} className="filter-info-arrow"/>
            </View>}
            {/*记工统计*/}
            <View className="statistics">
              {!isFilter && <View className="statistics-title">{handleMonthShow()}月记工统计</View>}
              <View className="statistics-remember">
                <View className="remember-row">
                  <View className="remember-content">
                    <Image src={remember} className="statistics-icon"/>
                    <View className="remember-values">
                      <View className="remember-value">
                        <Text>上班</Text>
                        <Text>{counts.work_time}个工</Text>
                        {counts.work_time_hour != '0' && <Text>+{counts.work_time_hour}小时</Text>}
                      </View>
                      {counts.overtime != '0' &&
                      <View className="remember-value"><Text>加班</Text><Text>{counts.overtime}小时</Text></View>}
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
                    <Image src={wage} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        临时工资
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
                        <Image src={meter} className="statistics-icon"/>
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
              {!isFilter && <View className="statistics-title">{handleMonthShow()}月记账统计</View>}
              <View className="statistics-bookkeeping">
                <View className="bookkeeping-row">
                  <View className="bookkeeping-content">
                    <Image src={debt} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        借支
                      </View>
                      <View className="bookkeeping-value">￥{parseFloat(counts.borrow_count).toFixed(2)}</View>
                    </View>
                  </View>
                </View>

                <View className="bookkeeping-row">
                  <View className="bookkeeping-content">
                    <Image src={expenditure} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        支出
                      </View>
                      <View className="bookkeeping-value">￥{parseFloat(counts.expend_count).toFixed(2)}</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="statistics-flow">
              <ListProvider
                increasing={increasing}
                loading={loading}
                errMsg={errMsg}
                hasmore={false}
                length={list.length}
              >
                <View className="bokkeeping-list">
                  {list.map(item => (
                    <Block key={item.date}>
                      <View className="bokkeeping-list-head">{item.date}</View>
                      <View className="bokkeeping-list-content">
                        {item.list.map(p => (
                          <Block key={p.id}>
                            {/* 如果是记工天 记工量 */}
                            {(p.business_type == 1 || p.business_type == 2) && <WorkCountDay list={[p]} type={p.business_type} />}
                            {/* 如果是 记工钱、 借支、 支出 */}
                            {(p.business_type == 3 || p.business_type == 4 || p.business_type == 5) && <WorkMoneyBorrowing list={[p]} type={p.business_type} />}
                          </Block>
                        ))}
                      </View>
                    </Block>
                  ))}
                </View>
              </ListProvider>
            </View>
          </View>
        </View>
        <View className="footer">
          <View className="footer-container">
            <View className="feedback" onClick={() => Taro.navigateTo({url: '/pages/feedback/index'})}>
              <Image src={feedback} className="feedback-icon"/>
              意见反馈
            </View>
            <View className="footer-buttons">
              {!isFilter ? <View className="footer-button-box">
                  <View className="footer-button footer-button-bookkeeping" data-type={1}
                        onClick={(e) => goRecord(e)}>记账</View>
                  <View className="footer-button footer-button-remember" data-type={2}
                        onClick={(e) => goRecord(e)}>记工</View>
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
    </View>
  )
}
export default observer(Remember)
