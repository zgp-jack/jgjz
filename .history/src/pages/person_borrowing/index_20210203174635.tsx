import Taro, { useState, Config, useRouter, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Borrow from './components/borrow'
import Expenditure from './components/expenditure'
import tallyConfig from './config'
import classnames from 'classnames'
import { PersonlLastSuccessAccountPage } from '@/config/store'
import './index.scss'

export default function PersonTally(){
<<<<<<< HEAD

  // 获取页面参数 type 记录成功之后  1: 销毁到首页  0: 返回上一页
  const router = useRouter()
  const { type = '0' } = router.params

  useEffect(()=>{
    Taro.setNavigationBarTitle({title: '个人记账'})
  },[])

=======
  Taro.setNavigationBarTitle({ title: '个人记账' })
  Taro.setNavigationBarColor({ backgroundColor: '#0099FF', frontColor: '#ffffff' })
>>>>>>> yangchao
  // 获取 历史记工成功页面
  let personlLastType: number = Taro.getStorageSync(PersonlLastSuccessAccountPage)
  // 当前选中的tab
  const [id, setId] = useState<number>(personlLastType || tallyConfig[0].id)
  // 用户改变tab
  const userChangeTab = (id: number, title: string) => {
    setId(id)
  }

  return (
    <View>
      <View className="person-record-top">
        {tallyConfig.map((item) => 
          <View 
            className={classnames({
              "person-record-top-item": true,
              "record-active": id === item.id
            })} 
            key={item.id}
            onClick={() => userChangeTab(item.id, item.title)}
          >{item.title}</View>
        )}
      </View>
      <View className="record-content">
        {id === 4 && <Borrow type={type} /> }
        {id === 5 && <Expenditure type={type} /> }
      </View>
    </View>
  )
}

PersonTally.config = {
  navigationBarTitleText: '个人记账',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config