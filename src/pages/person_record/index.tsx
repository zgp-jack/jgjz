import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import RecordDay from './record_day/index'
import RecordAmoumt from './record_amount/index'
import RecordMoney from './record_money/index'
import recordConfig from './config'
import classnames from 'classnames'
import './index.scss'
function PersonRecord(){
    // 切换记工type值
    const [recordnum, setRecordnum] = useState<number>(0);
    // 切换Tap
    const Changetype = (id,title) => {
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
            {recordnum == 0 && <RecordDay /> } 
            {recordnum == 1 && <RecordAmoumt />}
            {recordnum == 2 && <RecordMoney />}
        </View>
    )
}
export default observer(PersonRecord)
PersonRecord.config = {
    navigationBarTitleText: '个人记工天',
}