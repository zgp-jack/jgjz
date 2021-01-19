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
import filterActive from '@/images/ic_sx_blue.png'
import wage from '@/images/ic_gq.png'
import meter from '@/images/ic_gl.png'
import PickerWorkTime from "@/components/picker/picker-work-time";
import PickerOption from "@/components/picker/picker-option";
import PickerOverTime from "@/components/picker/picker-over-time";
import PickerUnit from "@/components/picker/picker-unit";

Taro.setNavigationBarTitle({title: '个人记工账本'})
Taro.setNavigationBarColor({backgroundColor: '#0099FF', frontColor: '#ffffff'})

export default function Remember() {
  const [showFilter, setShowFilter] = useState(false)//筛选弹窗开关
  const [startDate, setStartDate] = useState('2021-01-18')//筛选开始日期
  const [endDate, setEndDate] = useState('2021-01-17')//筛选结束日期
  const [coworkers, setCoworkers] = useState(0)//筛选工友

  const [isFilter, setIsFilter] = useState(false)//是否筛选了

  const [showPopup, setShowPopup] = useState(false)//点击切换账本打开选择器弹窗（调试用）

  const [activeRemark, setActiveRemark] = useState(false)//筛选选中有备注

  useEffect(() => {
    /*是否筛选了*/
    setIsFilter(startDate !== '2021-01-18')
  }, [startDate])
  //开始时间筛选
  const onStartDate = e => {
    setStartDate(e.detail.value)
  }
  //结束时间筛选
  const onEndDate = e => {
    setEndDate(e.detail.value)
  }
  //工友选择
  const onSelectCoworkers = e => {
    setCoworkers(e.detail.value)
  }
  //确认筛选
  const onFilterConfirm = () => {
    setShowFilter(false)
  }
  return (
    <View className="remember">
      <View className="container">
        <View className="header">
          <View className="header-tag"><View className="tag-text">个人记工</View></View>
          <View className="header-title overwords">个人默认消费记录清单记工账哈哈哈</View>
          <View className="header-line"/>
          <View className="header-switch" onClick={() => setShowPopup(true)}>切换记工本</View>
        </View>
        <View className="body">
          <View className="body-container">
            <View className="feat">
              {!isFilter ? <View className="date">
                  <View className="icon-left date-icon"/>
                  <View className="date-value">2020年11月</View>
                  <View className="icon-right date-icon"/>
                </View>
                :
                <View className="filter-start-end-date">
                  <View className="filter-start-date">开始时间：2020年11月01日</View>
                  <View className="filter-end-date">截止时间：2020年12月21日</View>
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
              {!isFilter && <View className="statistics-title">11月记工统计</View>}
              <View className="statistics-remember">
                <View className="remember-row">
                  <View className="remember-content">
                    <Image src={remember} className="statistics-icon"/>
                    <View className="remember-values">
                      <View className="remember-value">
                        <Text>上班</Text><Text>7.5个工+0.5小时</Text>
                      </View>
                      <View className="remember-value"><Text>加班</Text><Text>23.5小时</Text></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/*临时工资，平方米，筛选后才展示*/}
            {isFilter && <View className="statistics">
              <View className="statistics-bookkeeping">
                <View className="bookkeeping-row wage-meter">
                  <View className="bookkeeping-content">
                    <Image src={wage} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        临时工资
                      </View>
                      <View className="bookkeeping-value">￥500</View>
                    </View>
                  </View>
                </View>

                <View className="bookkeeping-row wage-meter">
                  <View className="bookkeeping-content">
                    <Image src={meter} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        平方米
                      </View>
                      <View className="bookkeeping-value">￥500</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>}
            {/*记账统计*/}
            <View className="statistics">
              {!isFilter && <View className="statistics-title">11月记账统计</View>}
              <View className="statistics-bookkeeping">
                <View className="bookkeeping-row">
                  <View className="bookkeeping-content">
                    <Image src={debt} className="statistics-icon"/>
                    <View className="bookkeeping-values">
                      <View className="bookkeeping-label">
                        借支
                      </View>
                      <View className="bookkeeping-value">￥500</View>
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
                      <View className="bookkeeping-value">￥500</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="footer">
          <View className="footer-container">
            <View className="feedback">
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
        <PickerWorkTime show={showPopup} close={() => setShowPopup(false)} confirm={() => setShowPopup(false)}/>
      }

      {
        showFilter &&
        <View className="mask" onClick={() => setShowFilter(false)}/>
      }
      <View className={"filter " + (showFilter ? "show-filter" : '')}>
        <View className="filter-container">
          <View className="filter-header">
            <View className="arrow" onClick={() => setShowFilter(false)}/>
            筛选条件
          </View>
          <View className="filter-body">
            <View className="filter-block">
              <View className="filter-block-row">
                <View className="filter-block-row-title">
                  选择日期
                </View>
                <View className="filter-date">
                  <View className="filter-date-label">开始时间</View>
                  <View>
                    <Picker mode='date' onChange={onStartDate} value={startDate}>
                      <View className='filter-picker-value'>
                        <View>{startDate}</View>
                        <Image src={arrowRight} className="filter-arrow"/>
                      </View>
                    </Picker>
                  </View>
                </View>
                <View className="filter-line"/>
                <View className="filter-date">
                  <View className="filter-date-label">结束时间</View>
                  <View>
                    <Picker mode='date' onChange={onEndDate} value={endDate}>
                      <View className='filter-picker-value'>
                        <View>{endDate}</View>
                        <Image src={arrowRight} className="filter-arrow"/>
                      </View>
                    </Picker>
                  </View>
                </View>
              </View>

              <View className="filter-block-row">
                <View className="filter-block-row-title">
                  记工类型
                </View>
                <View className="filter-type">
                  <View className="filter-type-item">记工天</View>
                  <View className="filter-type-item">记工天</View>
                  <View className="filter-type-item">记工天</View>
                  <View className="filter-type-item filter-type-item-active">记工天</View>
                  <View className="filter-type-item">记工天</View>
                  <View className="filter-type-item">记工天</View>
                  <View className="filter-type-item">记工天</View>
                </View>
              </View>

              <View className="filter-block-row filter-block-row-small">
                <View className="filter-coworkers">
                  <View className="filter-block-row-title">选择工友</View>
                  <View>
                    <Picker mode='selector' onChange={onSelectCoworkers} value={coworkers} range={[1, 2, 3, 4]}>
                      <View className="filter-picker-value">
                        <View>全部工友</View>
                        <Image src={arrowRight} className="filter-arrow"/>
                      </View>
                    </Picker>
                  </View>
                </View>
              </View>

              <View className="filter-block-row filter-block-row-small">
                <View className="filter-coworkers">
                  <View className="filter-block-row-title">有无备注</View>
                  <View
                    className={"filter-type-item filter-type-item-remark" + (activeRemark ? ' filter-type-item-active' : '')}
                    onClick={() => setActiveRemark(!activeRemark)}>
                    有备注
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="filter-footer">
            <View className="filter-footer-reset">重置</View>
            <View className="filter-footer-confirm" onClick={onFilterConfirm}>确定</View>
          </View>
        </View>
      </View>
    </View>
  )
}
