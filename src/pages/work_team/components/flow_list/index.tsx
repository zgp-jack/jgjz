import Taro, { useEffect } from '@tarojs/taro'
import ListProvider from '@/components/list_provider'
import useList from '@/hooks/list'
import getFlowlists from '@/pages/work_team/team_record/api'
import WorkCountDay from '@/components/flow/work_count_day/index'
import WorkMoneyBorrowing from '@/components/flow/work_money_borrowing/index'
import { GetWorkFlowParams } from '@/pages/work_team/record_work/index.d'
import './index.scss'

export default function FlowList({currentIndex=0, params='', types=[{id:'1',name:'记工天'}]}) {
  // 初始化请求参数
  let defaultParams: GetWorkFlowParams = {
    /**记工类型 1记工天，2记工量，3记工钱，4借支, 5支出*/
    business_type: types[currentIndex].id,
    /**开始时间*/
    start_business_time: params,
    /**当前账本，个人账本或者班组账本id*/
    work_note: '873',
    /**结束时间*/
    end_business_time: params,
    /**页码*/
    page: 1
  }

  const { loading, increasing, list, errMsg, hasmore, setParams } = useList(getFlowlists, { ...defaultParams})
  useEffect(()=>{
    setParams({ end_business_time: params, start_business_time: params},true)
  },[params])

  return (
      <ListProvider
        increasing={increasing}
        loading={loading}
        errMsg={errMsg}
        hasmore={hasmore}
        length={list.length}
      >
        {(types[currentIndex].id == "1" || types[currentIndex].id == "2") &&
          <WorkCountDay list={list.length ? list[0].list : []} type={types[currentIndex].id}></WorkCountDay>}
        {(types[currentIndex].id == "3" || types[currentIndex].id == "4" || types[currentIndex].id == "5") &&
          <WorkMoneyBorrowing list={list.length ? list[0].list : []}
            type={types[currentIndex].id}
          ></WorkMoneyBorrowing>}
      </ListProvider>
  )
}
