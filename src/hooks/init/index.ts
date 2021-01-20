/**
 * @Author: jsxin
 * @Date: 2021-01-18 16:49:36
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 17:45:01
 * @params api: 请求接口的方法  params: 请求接口的参数  data:请求接口的默认返回数据
 * @Description: 页面初始化接口 进入获取数据 如果 
 * @tips 使用该hooks 在其页面需要添加 InitProvider 容器 @/components/init_provider
 */

import { useState, useEffect } from '@tarojs/taro'
import { FetchResult, APIFunc } from './inter.d'
import produce from 'immer'
// import { Result } from '@/utils/request/inter.d'


export default function useInit<T, P>(api: APIFunc<T, P>, params: P ,data: T) {
  
  // result 所有的状态保存
  const [result, setResult] = useState<FetchResult<T>>({ loading: true, errMsg: '', data });
  const { loading } = result;

  useEffect(()  => {
    if(!loading) return
    api(params).then(res => {
      // 请求成功  并且接口返回成功
      setResult({
        ...result,
        loading: false,
        errMsg: res.code === 0 ? '' : res.message,
        data: res.data
      })
    }).catch(e => {
      setResult({
        ...result,
        loading: false,
        errMsg: e.message,
        data: data
      })
    })
  },[loading])

  return {
    ...result,
    setData: (data: T) => setResult(produce(result, (proxy: typeof result) => {
      proxy.data = data
    })),
    setLoading: (loading: boolean) => setResult({...result, loading})
  }
}