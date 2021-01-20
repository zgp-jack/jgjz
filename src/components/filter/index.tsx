import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Image, Text, Picker} from '@tarojs/components'
import React from 'react'
import './index.scss'
import arrowRight from "@/images/arrow-right.png";

interface FilterProps {
  show: boolean
  close: () => void
}

const Filter: React.FC<FilterProps> = (props) => {

  const [startDate, setStartDate] = useState('2021-01-18')//筛选开始日期
  const [endDate, setEndDate] = useState('2021-01-17')//筛选结束日期
  const [coworkers, setCoworkers] = useState(0)//筛选工友

  const [activeRemark, setActiveRemark] = useState(false)//筛选选中有备注


  // useEffect(() => {
  //   /*是否筛选了*/
  //   setIsFilter(startDate !== '2021-01-18')
  // }, [startDate])
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
    props.close()
  }
  return (
    <View className={"filter " + (props.show ? "show-filter" : '')}>
      <View className="filter-container">
        <View className="filter-header">
          <View className="arrow" onClick={props.close}/>
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
                <View className="filter-picker-value">
                  <View>全部工友</View>
                  <Image src={arrowRight} className="filter-arrow"/>
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
  )
}

export default Filter;
