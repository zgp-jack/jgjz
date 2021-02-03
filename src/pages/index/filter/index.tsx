import Taro, {useState, useEffect, eventCenter} from '@tarojs/taro'
import {View, Image, Picker} from '@tarojs/components'
import React from 'react'
import './index.scss'
import {observer, useLocalStore} from '@tarojs/mobx'
import RememberStore from "@/store/business";
import {AddressBookParams, GetCountParams} from "@/pages/index/inter";
import {getTodayDate} from "@/utils/index";
import {
  ADDRESSBOOKTYPE_ALONE_DEL,
  ADDRESSBOOKTYPE_GROUP_LEAVE,
  IMGCDNURL
} from "@/config/index";
import {AddressBookConfirmEvent} from "@/config/events";

interface FilterProps<T> {
  data: T
  confirmFilter: (data: GetCountParams) => void
  close: () => void
  show: boolean
  personOrGroup: boolean/*个人账本筛选还是班组筛选*/
  handleSplitDate: (date: string) => string/*处理日期*/
  resetFilter: () => void
}


const Filter: React.FC<FilterProps<GetCountParams>> = (props) => {
  /*记工类型数据*/
  const localStore = useLocalStore(() => RememberStore)
  const {businessType} = localStore
  /*本地筛选数据*/
  const [filterData, setFilterData] = useState<GetCountParams>(props.data)

  useEffect(() => {
    if (props.show) {
      initData()
    }
  }, [props.show])

  useEffect(() => {
    if (filterData && filterData.start_business_time.split('-').length !== 3) return
    eventCenter.on(AddressBookConfirmEvent, (data) => {
      let _data: any = {}
      if (props.personOrGroup) {
        _data = {...filterData, worker_id: data}
      } else {
        _data = {...filterData, group_leader: data}
      }
      console.log(_data)
      initData(_data)
    })
    return () => eventCenter.off(AddressBookConfirmEvent)
  }, [filterData])

  const initData = (data = props.data) => {
    let start_business_time = data.start_business_time
    let end_business_time = data.end_business_time
    const startDates = start_business_time.split('-')
    const endDates = end_business_time.split('-')
    let _data: GetCountParams = {
      ...data,
      start_business_time: startDates.length === 3 ? start_business_time : start_business_time + '-01',
      end_business_time: endDates.length === 3 ? end_business_time : handleGetEndDay(start_business_time)
    }
    console.log(_data)
    setFilterData(JSON.parse(JSON.stringify(_data)))
  }
  const handleGetEndDay = (yearAndMonth) => {
    const dates = yearAndMonth.split('-')
    const day = new Date(dates[0], dates[1], 0).getDate()
    return yearAndMonth + '-' + day
  }
  /*开始时间筛选*/
  const onStartDate = e => {
    setFilterData({...filterData, start_business_time: e.detail.value})
  }
  /*结束时间筛选*/
  const onEndDate = e => {
    setFilterData({...filterData, end_business_time: e.detail.value})
  }
  /*确认筛选*/
  const onFilterConfirm = () => {
    props.confirmFilter(filterData)
  }
  /*点击选中记工类型*/
  const handleClickBusinessType = (id: string) => {
    if (initActiveBusinessType(id)) {
      let _business_type = JSON.parse(JSON.stringify(filterData.business_type))
      let _index = _business_type.findIndex(item => item == id)
      _business_type.splice(_index, 1)
      setFilterData({...filterData, business_type: _business_type})
    } else {
      setFilterData({...filterData, business_type: [...filterData.business_type, id]})
    }
  }
  //记工类型 查询传入的类型id是否已经被选中了
  const initActiveBusinessType = (id: string) => {
    const index = (filterData.business_type as string[]).findIndex(item => item == id)
    return index !== -1
  }
  /*选择是否有备注*/
  const handleClickNote = () => {
    setFilterData({...filterData, is_note: filterData.is_note == '1' ? '0' : '1'})
  }
  /*点击重置，重置筛选数据*/
  const handleReset = () => {
    props.resetFilter()
  }

  const handleGoToAddressBook = (type) => {
    let _data: AddressBookParams[] = []
    if (type === ADDRESSBOOKTYPE_GROUP_LEAVE) {
      _data = (filterData.worker_id as AddressBookParams[])
    }
    if (type === ADDRESSBOOKTYPE_ALONE_DEL) {
      _data = (filterData.group_leader as AddressBookParams[])
    }
    Taro.navigateTo({url: `/pages/address_book/index?id=${filterData.work_note}&type=${type}&data=${JSON.stringify(_data)}`})
  }

  const handleGroupLeaderLength = () => {
    return (filterData.group_leader as AddressBookParams[]).length
  }
  const handleWorkerIdLength = () => {
    return (filterData.worker_id as AddressBookParams[]).length
  }
  if (!filterData) return null
  return (
    <View className={"filter " + (props.show ? "show-filter" : '')}>
      <View className="filter-container">
        <View className="filter-header">
          <View className="arrow-bor" onClick={props.close}>
            <View className="arrow"/>
          </View>
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
                  <Picker mode='date' onChange={onStartDate} end={filterData.end_business_time}
                          value={filterData.start_business_time}>
                    <View className='filter-picker-value'>
                      <View>{props.handleSplitDate(filterData.start_business_time)}</View>
                      <Image src={IMGCDNURL + 'lxy/arrow-right.png'} className="filter-arrow"/>
                    </View>
                  </Picker>
                </View>
              </View>
              <View className="filter-line"/>
              <View className="filter-date">
                <View className="filter-date-label">结束时间</View>
                <View>
                  <Picker mode='date' onChange={onEndDate} end={getTodayDate()} start={filterData.start_business_time}
                          value={filterData.end_business_time}>
                    <View className='filter-picker-value'>
                      <View>{props.handleSplitDate(filterData.end_business_time)}</View>
                      <Image src={IMGCDNURL + 'lxy/arrow-right.png'} className="filter-arrow"/>
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
                  businessType.map(item => (
                    <View
                      className={"filter-type-item" + (initActiveBusinessType(item.id) ? ' filter-type-item-active' : '')}
                      key={item.id}
                      onClick={() => handleClickBusinessType(item.id)}>{item.name}</View>
                  ))
                }
              </View>
            </View>
            {/*班组账本选择工友*/}
            {props.personOrGroup && <View className="filter-block-row filter-block-row-small"
                                          onClick={() => handleGoToAddressBook(ADDRESSBOOKTYPE_GROUP_LEAVE)}>
              <View className="filter-coworkers">
                <View className="filter-block-row-title">选择工友</View>
                <View className="filter-picker-value">
                  <View>{handleWorkerIdLength() ? '共' + handleWorkerIdLength() + '人' : '全部工友'}</View>
                  <Image src={IMGCDNURL + 'lxy/arrow-right.png'} className="filter-arrow"/>
                </View>
              </View>
            </View>}
            {/*个人账本筛选选择班组长*/}
            {!props.personOrGroup && <View className="filter-block-row filter-block-row-small"
                                           onClick={() => handleGoToAddressBook(ADDRESSBOOKTYPE_ALONE_DEL)}>
              <View className="filter-coworkers">
                <View className="filter-block-row-title">选择班组长</View>
                <View className="filter-picker-value">
                  <View>{handleGroupLeaderLength() ? '共' + handleGroupLeaderLength() + '人' : '全部班组长'}</View>
                  <Image src={IMGCDNURL + 'lxy/arrow-right.png'} className="filter-arrow"/>
                </View>
              </View>
            </View>}

            <View className="filter-block-row filter-block-row-small">
              <View className="filter-coworkers">
                <View className="filter-block-row-title">有无备注</View>
                <View
                  className={"filter-type-item filter-type-item-remark" + (filterData.is_note == '1' ? ' filter-type-item-active' : '')}
                  onClick={handleClickNote}>
                  有备注
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="filter-footer">
          <View className="filter-footer-btn filter-footer-reset" onClick={handleReset}>重置</View>
          <View className="filter-footer-btn filter-footer-confirm" onClick={onFilterConfirm}>确定</View>
        </View>
      </View>
    </View>
  )
}

export default observer(Filter);
