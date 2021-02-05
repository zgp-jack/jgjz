import Taro, { useState, Config, useRouter, useEffect, useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RecordDay from './record_day/index'
import RecordAmoumt from './record_amount/index'
import RecordMoney from './record_money/index'
import recordConfig from './config'
import { getRandomShareInfo } from '@/utils/index'
import classnames from 'classnames'
import { PersonlLastSuccessRecordPage } from '@/config/store'
import './index.scss'

export default function PersonRecord(){

  // 获取页面参数 type 记录成功之后  1: 销毁到首页  0: 返回上一页
  const router = useRouter()
  const { type = '0' } = router.params

  useShareAppMessage(() => {
    return { ...getRandomShareInfo() }
  })

  useEffect(()=>{
    Taro.setNavigationBarTitle({title: '个人记工'})
  },[])

  // 获取 历史记工成功页面
  let personlLastType: number = Taro.getStorageSync(PersonlLastSuccessRecordPage)
  Taro.setNavigationBarTitle({ title: '个人记工' })
  Taro.setNavigationBarColor({ backgroundColor: '#0099FF', frontColor: '#ffffff' })
  // 切换记工type值
  const [recordnum, setRecordnum] = useState<number>(personlLastType || recordConfig[0].id);
  // 切换Tap
  const Changetype = (id:number,title:string) => {
    setRecordnum(id)
    Taro.setNavigationBarTitle({ title: `个人${title}` }) 
  }
  return (
    <View className="person-record">
      <View className="person-record-top" >
        {recordConfig.map((item) => 
          <View className={classnames({
            "person-record-top-item": true,
            "record-active": item.id === recordnum
          })} key={item.id} onClick={() => Changetype(item.id,item.name)}>{item.name}
          </View>
        )}
      </View>
      <View className="record-content">
        {recordnum == 1 && <RecordDay type={type} /> } 
        {recordnum == 2 && <RecordAmoumt type={type} />}
        {recordnum == 3 && <RecordMoney type={type} />}
      </View>
    </View>
  )
}
PersonRecord.config = {
  navigationBarTitleText: '个人记工',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config