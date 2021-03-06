import Taro, { useEffect, useState, useDidShow } from '@tarojs/taro'
import ListProvider from '@/components/list_provider'
import { Block, View } from '@tarojs/components'
import useList from '@/hooks/list'
import getFlowlists from '@/pages/work_team_bookkeeping/team_record/api'
import WorkMoneyBorrowing from '@/components/flow/work_money_borrowing/index'
import { GetWorkFlowParams, FlowLists } from './index.d'
import './index.scss'

export default function FlowList({ currentId=4, params='',touchBottom, workNote}) {
  // 初始化请求参数
  let defaultParams: GetWorkFlowParams = {
    /**记工类型 1记工天，2记工量，3记工钱，4借支, 5支出*/
    business_type: String(currentId),
    /**开始时间*/
    start_business_time: params,
    /**当前账本，个人账本或者班组账本id*/
    work_note: workNote,
    /**结束时间*/
    end_business_time: params,
    /**页码*/
    page: 1
  }

  const { loading, increasing, list=[], errMsg, hasmore, setParams, setIncreasing, setLoading } = useList(getFlowlists, { ...defaultParams})
  const [flowList, setFlowList] = useState<FlowLists[]>([])
  
  const [firstShow, setFirstShow] = useState<boolean>(false)
  // 监听父组件传过来参数变换，从新请求
  useEffect(()=>{
    setParams({ end_business_time: params, start_business_time: params},true)
  },[params])


  // 监听父组件触底事件，加载下一页流水数据
  useEffect(()=>{
    setIncreasing(true)
  },[touchBottom])
  
  // 监听请求返回流水数据，进行拼接处理
  useEffect(()=>{
    if (list.length) {
      let listData = list.reduce((pre:any,item:any)=>{
        let preData = pre.concat(item.list && item.list)
        return preData
      },[])
      setFlowList(listData)
    }
  },[list])

  // 页面非第一次显示重新加载数据
  useDidShow(()=>{
    setFirstShow(true);
    if (firstShow) {
      setLoading(true)
    }
  })

  return (
      <ListProvider
        increasing={increasing}
        loading={loading}
        errMsg={errMsg}
        hasmore={hasmore}
        length={list.length}
      >
      <View className="flow-list-item">
        {flowList.map(p => (
          <Block key={p.id}>
            <View className="flow-list-item">
              {/* 如果是  借支、 支出 */}
              {(p.business_type == 4 || p.business_type == 5) &&
                <WorkMoneyBorrowing list={[p]} type={p.business_type} />}
            </View>
          </Block>
        ))}
      </View>
      </ListProvider>
  )
}
