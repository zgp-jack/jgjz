import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ModifyBorrow from './modify_borrow/index'
import ModifyExpenditure from './modify_expenditure/index'
import ModifyMoney from './modify_money/index'
import ModifyDay from './modify_day/index'
import ModifyAmoumt from './modify_amount/index'
import './index.scss'

export default function PersonDetail(){

  const router = useRouter()
  /** 类型 type(1)--支出  type(2)--借支  type(3)--工天   type(4)--工钱  type(5)--工量 */
  const { type = '2',id = '' } = router.params
  console.log(type, id)

    return (
        <View>
          {type == '1' && <ModifyBorrow />}
          {type == '2' && <ModifyExpenditure />}
          {type == '3' && <ModifyDay />}
          {type == '4' && <ModifyMoney />}
          {type == '5' && <ModifyAmoumt />}
        </View>
    )
}

PersonDetail.config = {
    navigationBarTitleText: '修改借支',
}