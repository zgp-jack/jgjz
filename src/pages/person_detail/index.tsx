import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import ModifyBorrow from './modify_borrow/index'
import ModifyExpenditure from './modify_expenditure/index'
import ModifyMoney from './modify_money/index'
import ModifyDay from './modify_day/index'
import ModifyAmoumt from './modify_amount/index'
import './index.scss'

function PersonDetail(){
    /* type(0)--支出  type(1)--借支  type(2)--工天   type(3)--工钱  type(4)--工量
    */
    const type:number = 0;
    return (
        <View>
          {type == 0 && <ModifyBorrow />}
          {type == 1 && <ModifyExpenditure />}
          {type == 2 && <ModifyDay />}
          {type == 3 && <ModifyMoney />}
          {type == 4 && <ModifyAmoumt />}
        </View>
    )
}
export default PersonDetail
PersonDetail.config = {
    navigationBarTitleText: '修改借支',
}