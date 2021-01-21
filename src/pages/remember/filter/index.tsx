import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Image, Picker} from '@tarojs/components'
import React from 'react'
import './index.scss'
import arrowRight from "@/images/arrow-right.png";
import {observer, useLocalStore} from '@tarojs/mobx'
import RememberStore from "@/store/remember";
import {GetCountParams} from "@/pages/remember/inter";

interface FilterProps<T> {
  data: T
  setData: (data: T) => void
  show: boolean
  close: () => void
}

const Filter: React.FC<FilterProps<GetCountParams>> = (props) => {
  const localStore = useLocalStore(() => RememberStore)
  const {rememberType} = localStore
  const [filterData, setFilterData] = useState<GetCountParams>(props.data)
  useEffect(() => {
    setFilterData(JSON.parse(JSON.stringify(props.data)))
  }, [props.data])
  //开始时间筛选
  const onStartDate = e => {
    setFilterData({...filterData, start_business_time: e.detail.value})
  }
  //结束时间筛选
  const onEndDate = e => {
    setFilterData({...filterData, end_business_time: e.detail.value})
  }
  //工友选择
  const onSelectCoworkers = e => {
    // setCoworkers(e.detail.value)
  }
  //确认筛选
  const onFilterConfirm = () => {
    props.setData(filterData)
    props.close()
  }
  const handleClickBusinessType = (id: string) => {
    if (initActiveBusinessType(id)) {
      let _business_type = JSON.parse(JSON.stringify(filterData.business_type))
      let _index = _business_type.findIndex(item => item == id)
      _business_type.splice(_index, 1)
      setFilterData({...filterData, business_type: _business_type})
    } else {
      console.log([...filterData.business_type, id])
      setFilterData({...filterData, business_type: [...filterData.business_type, id]})
    }
  }
  //记工类型 查询传入的类型id是否已经被选中了
  const initActiveBusinessType = (id: string) => {
    const index = (filterData.business_type as string[]).findIndex(item => item == id)
    return index !== -1
  }
  if (!filterData) return null
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
                  <Picker mode='date' fields="month" onChange={onStartDate} value={filterData.start_business_time}>
                    <View className='filter-picker-value'>
                      <View>{filterData.start_business_time}</View>
                      <Image src={arrowRight} className="filter-arrow"/>
                    </View>
                  </Picker>
                </View>
              </View>
              <View className="filter-line"/>
              <View className="filter-date">
                <View className="filter-date-label">结束时间</View>
                <View>
                  <Picker mode='date' fields="month" onChange={onEndDate} value={filterData.end_business_time}>
                    <View className='filter-picker-value'>
                      <View>{filterData.end_business_time}</View>
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
                {
                  rememberType.map(item => (
                    <View
                      className={"filter-type-item" + (initActiveBusinessType(item.id) ? ' filter-type-item-active' : '')}
                      key={item.id}
                      onClick={() => handleClickBusinessType(item.id)}>{item.name}</View>
                  ))
                }
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
                  className={"filter-type-item filter-type-item-remark" + (filterData.is_note == '1' ? ' filter-type-item-active' : '')}
                  onClick={() => setFilterData({...filterData, is_note: filterData.is_note == '1' ? '0' : '1'})}>
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

export default observer(Filter);
