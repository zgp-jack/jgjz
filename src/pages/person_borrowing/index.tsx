import Taro, { useState, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Borrow from './components/borrow'
import Expenditure from './components/expenditure'
import tallyConfig from './config'
import classnames from 'classnames'
import './index.scss'

export default function PersonTally(){
  // 当前选中的tab
  const [id, setId] = useState<number>(tallyConfig[0].id)
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
      {id === 4 && <Borrow /> }
      {id === 5 && <Expenditure /> }
    </View>
  )
}

PersonTally.config = {
  navigationBarTitleText: '个人记账',
  navigationBarBackgroundColor: '#0099ff',
  navigationBarTextStyle: 'white',
  backgroundTextStyle: "dark"
} as Config