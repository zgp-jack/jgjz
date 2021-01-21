import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Image, Text, Picker} from '@tarojs/components'
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
import PickerUnit from "@/components/picker/picker-unit";
import Filter from "./filter/index";
import {get} from "@/utils/request";
import {GetCountParams, GetCountResult} from "@/pages/remember/inter";
import {getCountUrl} from "@/utils/api";
/*账本类型 1：个人账本 2：班组账本*/
Taro.setStorageSync('ledgerType', '1')
const ledgerType = Taro.getStorageSync('ledgerType')
Taro.setNavigationBarTitle({title: (ledgerType == '1' ? '个人' : '班组') + '记工账本'})
Taro.setNavigationBarColor({backgroundColor: '#0099FF', frontColor: '#ffffff'})

export default function Remember() {
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
  /*获取年份*/
  const year = new Date().getFullYear()
  /*获取月份*/
  const month = new Date().getMonth() + 1
  /*获取统计数据，请求参数*/
  const [filterData, setFilterData] = useState<GetCountParams>({
    start_business_time: '',
    end_business_time: '',
    work_note: '874',
    worker_id: '',
    business_type: [],
    expend_type: '',
    expense_account: '',
    group_leader: '',
    is_note: '',
    unit_work_type: ''
  })

  /*当前年份*/
  const [currentYear, setCurrentYear] = useState(year)
  /*当前月份*/
  const [currentMonth, setCurrentMonth] = useState(month)
  /*当前年份与月份*/
  const [currentYearMonth, setCurrentYearMonth] = useState('')
  /*筛选年份*/
  const [filterYear, setFilterYear] = useState(year)
  /*筛选月份*/
  const [filterMonth, setFilterMonth] = useState(month)
  const [showFilter, setShowFilter] = useState(false)//筛选弹窗开关

  const [isFilter, setIsFilter] = useState(false)//是否筛选了

  const [showPopup, setShowPopup] = useState(false)//点击切换账本打开选择器弹窗（调试用）

  /*当前选中日期的下一个日期，获取统计接口使用*/
  const [nextYearMonth, setNextYearMonth] = useState('')
  /*获取统计数据*/
  useEffect(() => {
    if (!filterData.start_business_time || !filterData.end_business_time) return
    let params = {
      ...filterData,
      business_type: (filterData.business_type as string[]).join(',')
    }
    initData(params)
  }, [filterData])

  /*根据筛选日期初始化请求参数*/
  useEffect(() => {
    const start_business_time = filterYear + '-' + filterMonth
    const end_business_time = getNextYearMonth()
    setCurrentYearMonth(start_business_time)
    setNextYearMonth(end_business_time)
    setFilterData({...filterData, start_business_time, end_business_time})
  }, [filterMonth, filterYear])

  /*获取统计数据*/
  const initData = (params: GetCountParams) => {
    get<GetCountParams, GetCountResult>(getCountUrl, params).then(res => {
      if (res.code === 0) {
        setCounts(res.data.count)
      }
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
  const handleFilter = (data: GetCountParams) => {
    setFilterData(data)
    setIsFilter(true)
  }

  const handleSplitDate = (date: string) => {
    const _date = date.split('-')
    return _date[0] + '年' + _date[1] + '月'
  }
  return (
    <View className="remember">
      <View className="container">
        <View className="header">
          <View className="header-tag"><View className="tag-text">个人记工</View></View>
          <View className="header-title overwords">{}记工账本</View>
          <View className="header-line"/>
          <View className="header-switch" onClick={() => setShowPopup(true)}>切换记工本</View>
        </View>
        <View className="body">
          <View className="body-container">
            <View className="feat">
              {!isFilter ? <View className="date">
                  <View className="date-icon-bor" onClick={prevMonth}><View className="icon-left date-icon"/></View>
                  <Picker fields="month" mode='date' onChange={onFilterDateChange} value={currentYearMonth}>
                    <View className="date-value">{filterYear}年{filterMonth}月</View>
                  </Picker>

                  <View className="date-icon-bor" onClick={nextMonth}><View className="icon-right date-icon"/></View>
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
            {isFilter && <View className="filter-info">
              <View className="filter-info-box overwords">
                <Text>共<Text className="filter-info-blue">12</Text>人</Text>
                <Text className="filter-info-line">|</Text>
                <Text>记工量 借支 支出</Text>
                <Text className="filter-info-line">|</Text>
                <Text>有备注</Text>
                <Text className="filter-info-line">|</Text>
                <Text className="overwords">生活费哈哈哈哈</Text>
              </View>
              <Image src={arrowRight} className="filter-info-arrow"/>
            </View>}
            {/*记工统计*/}
            <View className="statistics">
              {!isFilter && <View className="statistics-title">{filterMonth}月记工统计</View>}
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
              {!isFilter && <View className="statistics-title">{filterMonth}月记账统计</View>}
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

            <View className="statistics">
              <View className="statistics-title">11月全部流水</View>
              <View className="bokkeeping-list">
                <View className="bokkeeping-list-head">2020年11月03日 周二</View>
                <WorkCountDay list={[]}/>
                <View className="bokkeeping-list-head">2020年11月03日 周二</View>
                <WorkMoneyBorrowing/>
                <View className="bokkeeping-list-head">2020年11月03日 周二</View>
                <WorkMoneyBorrowing/>
              </View>
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
                  <View className="footer-button footer-button-bookkeeping">记账</View>
                  <View className="footer-button footer-button-remember">记工</View>
                </View>
                :
                <View className="footer-button exit-filter">退出筛选</View>
              }
            </View>
          </View>
        </View>
      </View>
      {
        showPopup &&
        <PickerUnit show={showPopup} close={() => setShowPopup(false)} confirm={() => setShowPopup(false)}/>
      }
      {
        showFilter &&
        <View className="mask" onClick={() => setShowFilter(false)}/>
      }
      <Filter data={filterData} setData={data => handleFilter(data)} show={showFilter}
              close={() => setShowFilter(false)}/>
    </View>
  )
}
