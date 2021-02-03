/**
 * @Author: jsxin
 * @Date: 2021-01-18 16:49:36
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 17:45:01
 * @params api: 请求接口的方法  params: 请求接口的参数  delay:是否需要延迟请求
 * @Description: 数据加载列表hooks 适用于分页请求
 * @tips 使用该hooks 在其页面需要添加 PageListProvider 容器 @/components/list_provider
 */
import Taro, {useState, useEffect} from '@tarojs/taro'
import {FetchResult, APIFunc, PageParams} from './inter.d'
import produce from 'immer'

const defaultParams: { page: number } = {
  page: 1
}

export default function useList<P extends PageParams, R>(
  /** 请求方法 P: params 类型  R: 返回结果数据类型 */
  api: APIFunc<P, R>,
  /** 请求方法的参数 */
  params: P,
  /** 是否需要延迟请求 */
  delay?: boolean
) {
  /** result 所有的状态保存 */
  const [result, setResult] = useState<FetchResult<P, R>>({
    loading: true,
    errMsg: '',
    increasing: false,
    params: {...defaultParams, ...params},
    list: [],
    page: params.page || defaultParams.page,
    hasmore: true
  });

  const {loading, increasing, list, page, hasmore} = result;

  useEffect(() => {
    if (!loading || delay) {
      return
    }
    ;
    getLists();
  }, [loading, delay])

  useEffect(() => {
    increasing && hasmore && getLists({page: page})
  }, [increasing])

  const getLists = (params?) => {
    const _params = params ? setParams(params) : result.params
    api(_params).then(res => {
      // 请求成功  并且接口返回成功
      setResult(produce(result, (proxy: typeof result) => {
        proxy.list = _params.page === 1 ? [...res.data] : [...list, ...res.data]
        proxy.loading = false
        proxy.increasing = false
        proxy.errMsg = res.code === 0 ? '' : res.message,
          proxy.page = page + 1,
          proxy.hasmore = res.data.length ? true : false
      }))
      Taro.stopPullDownRefresh()
    }).catch(e => {
      setResult(produce(result, (proxy: typeof result) => {
        proxy.loading = false
        proxy.increasing = false
        proxy.errMsg = e.message
      }))
      Taro.stopPullDownRefresh()
    })
  }

  /** 设置请求参数 */
  const setParams = (options: Partial<P>, refreshing?: boolean) => {
    const _params: P = refreshing ? {...params, ...options, ...defaultParams} : {...params, ...options};
    setResult({...result, params: _params})
    if (refreshing) {
      setResult(produce(result, (proxy: typeof result) => {
        proxy.loading = true
        proxy.params = _params
      }))
    } else {
      setResult({...result, params: _params})
    }
    return _params;
  }

  return {
    /** result所有字段 */
    ...result,
    /** 修改页面参数 */
    setParams,
    /** 加载下一页 */
    setIncreasing: (increasing: boolean) => setResult(produce(result, (proxy: typeof result) => {
      proxy.increasing = increasing
    })),
    /** 刷新当前列表 */
    setLoading: (loading: boolean) => setResult(produce(result, (proxy: typeof result) => {
      proxy.loading = loading,
        proxy.page = defaultParams.page,
        proxy.params.page = defaultParams.page
    })),
    // 更新List中的某条数据
    updateList: (item: R, index: number) => {
      const nextState = produce(result, (proxy: typeof result) => {
        proxy.list[index] = {...item}
      })
      setResult(nextState)
    },
    push: (item: R) => {
      setResult(produce(result, (proxy: typeof result) => {
        proxy.list.push(item)
      }))
    },
    unshift: (item: R) => {
      setResult(produce(result, (proxy: typeof result) => {
        proxy.list.unshift(item)
      }))
    },
    pop: () => {
      setResult(produce(result, (proxy: typeof result) => {
        if (proxy.list.length > 0) {
          proxy.list.pop()
        }
      }))
    },
    shift: () => {
      setResult(produce(result, (proxy: typeof result) => {
        if (proxy.list.length > 0) {
          proxy.list.shift()
        }
      }))
    },
    splice: (start: number, number: number) => {
      setResult(produce(result, (proxy: typeof result) => {
        if (proxy.list.length > 0) {
          proxy.list.splice(start, number)
        }
      }))
    }
  }
}
