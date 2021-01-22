import Taro, { useState } from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import ContentInput from '@/components/picker_input/index'
import WorkTime from '../person_borrowing/components/work_time/index'
import OverTime from '../person_borrowing/components/over_time/index'
import ModifyBorrow from './modify_borrow/index'
import ModifyExpenditure from './modify_expenditure/index'
import ModifyMoney from './modify_money/index'
import ModifyDay from './modify_day/index'
import ModifyAmoumt from './modify_amount/index'
import './index.scss'

function PersonDetail(){
    /* type(0)--支出  type(1)--借支  type(2)--工天   type(3)--工钱  type(4)--工量
    */
    const [recordInput, setRecordInput] = useState<string>('金额');
    const [quantity, setQuantity] = useState<number>(0);
    const typeString:string = '工量';
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
export default observer(PersonDetail)
PersonDetail.config = {
    navigationBarTitleText: '修改借支',
}