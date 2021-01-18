import Taro, {useState} from '@tarojs/taro'
import {View, Image, Text, Picker} from '@tarojs/components'
import './index.scss'
import filter from '@/images/ic_sx.png'
import remember from '@/images/ic_gt.png'
import debt from '@/images/ic_jz.png'
import expenditure from '@/images/ic_zc.png'
import feedback from '@/images/ic_yjfk.png'
import arrowRight from '@/images/arrow-right.png'

Taro.setNavigationBarTitle({title: '个人记工账本'})
Taro.setNavigationBarColor({backgroundColor: '#0099FF', frontColor: '#ffffff'})

export default function Remember() {
  const [showFilter, setShowFilter] = useState(false)//筛选开关
  const [startDate, setStartDate] = useState('2021-01-18')//筛选开始日期
  const [endDate, setEndDate] = useState('2021-01-17')//筛选结束日期

  const onStartDate = e => {
    setStartDate(e.detail.value)
  }
  const onEndDate = e => {
    setEndDate(e.detail.value)
  }
  return (
    <View className="remember">
      <View className="container">
        <View className="header">
          <View className="header-tag"><View className="tag-text">个人记工</View></View>
          <View className="header-title overwords">个人默认消费记录清单记工账哈哈哈</View>
          <View className="header-line"/>
          <View className="header-switch">切换记工本</View>
        </View>
        <View className="body">
          <View className="body-container">
            <View className="feat">
              <View className="date">
                <View className="icon-left date-icon"/>
                <View className="date-value">2020年11月</View>
                <View className="icon-right date-icon"/>
              </View>
              <View className="filter-btn" onClick={() => setShowFilter(true)}>
                <Image src={filter} className="filter-icon"/>筛选
              </View>
            </View>

            <View className="statistics">
              <View className="statistics-title">11月记工统计</View>
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

            <View className="statistics">
              <View className="statistics-title">11月记账统计</View>
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
              <View className="footer-button">记账</View>
              <View className="footer-button">记工</View>
            </View>
          </View>
        </View>
      </View>
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
                  <View className="filter-picker-value">
                    <View>全部工友</View>
                    <Image src={arrowRight} className="filter-arrow"/>
                  </View>
                </View>
              </View>

              <View className="filter-block-row filter-block-row-small">
                <View className="filter-coworkers">
                  <View className="filter-block-row-title">有无备注</View>
                  <View className="filter-type-item filter-type-item-remark">
                    有备注
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="filter-footer">
            <View className="filter-footer-reset">重置</View>
            <View className="filter-footer-confirm">确定</View>
          </View>
        </View>
      </View>
    </View>
  )
}
