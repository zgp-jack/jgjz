import Taro, { useState } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

function ContentInput({type, quantity}){
    const [amountInput, setAmountIput] = useState<boolean>(false);
    return (
        <View className="person-record-work">
            <View className={amountInput?"work-amount input-active":"work-amount"}>
                <Text className="work-amount-text">{type}</Text>
                <Input type="number" value={quantity} placeholder='0' className="work-amount-input"  onFocus={()=>(setAmountIput(true))} onBlur={()=>(setAmountIput(false))} />
            </View>
        </View>
    )
}
export default ContentInput
