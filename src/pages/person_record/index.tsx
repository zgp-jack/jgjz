import Taro, { Config, useState } from '@tarojs/taro'
import { View, Text, Image, Textarea, Button, Input } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

let type = [
    {name:'记工天',typenum:0},
    {name:'记工量',typenum:1},
    {name:'记工钱',typenum:2},
];
let record_type:string = "记工天";
function PersonRecord(){
    const config = {
        navigationBarTitleText: '个人' + record_type
    }
    const [recordnum, setRecordnum] = useState<number>(type[0].typenum);
    const [quantity, setQuantity] = useState<string>('0');
    const [amountInput, setAmountIput] = useState<boolean>(false);

    const Changetype = (e) => {
        switch(e.target.id){
            case "recordDay":
                setRecordnum(type[0].typenum);
                config.navigationBarTitleText = '个人' + type[0].name;
                break;
            case "recordamout":
                setRecordnum(type[1].typenum);
                config.navigationBarTitleText = '个人' + type[1].name;
                break;
            case "recordmoney":
                setRecordnum(type[2].typenum);
                config.navigationBarTitleText = '个人' + type[2].name;
                break;
        }
    }
    return (
        <View className="person-record">
            <View className="person-record-top" onClick={Changetype} >
                <View className={recordnum==0?"person-record-top-item record-active":"person-record-top-item"} id="recordDay">记工天</View>
                <View className={recordnum==1?"person-record-top-item record-active":"person-record-top-item"} id="recordamout">记工量</View>
                <View className={recordnum==2?"person-record-top-item record-active":"person-record-top-item"} id="recordmoney">记工钱</View>
            </View>
            {recordnum == 0 && <View>
            <View className="person-record-time">
                <View className="person-record-worktime">
                    <Text className="worktime-text">上班时长</Text>
                    <View className="worktime worktime-active">1个工</View>
                    <View className="worktime">半个工</View>
                    <View className="worktime">休息</View>
                    <View className="worktime worktime-select">
                        <Text className="worktime-select-time">0小时</Text>
                    </View>
                </View>
                <View className="person-record-overtime person-record-worktime">
                    <Text className="worktime-text">加班时长</Text>
                    <View className="worktime">无加班</View>
                    <View className="worktime worktime-select worktime-active">
                        <Text className="worktime-select-time">24小时</Text>
                    </View>
                    <Text className="overtime-icon"></Text>
                </View>
            </View>
            <View className="person-record-overtime person-record-date">
                <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                <Text className="person-record-date-title">日期</Text>
                <Text className="person-record-date-text">共选择<Text className="person-record-date-day">4</Text>天</Text>
                <Text className="overtime-icon"></Text>
            </View>
            <View className="person-record-overtime person-record-date person-record-team">
                <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                <Text className="person-record-date-title">班组长</Text>
                <Text className="person-record-date-text">王一鸣组长</Text>
                <Text className="overtime-icon"></Text>
            </View>
            <View className="person-record-overtime person-record-date person-record-note">
                <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                <Text className="person-record-date-title">备注</Text>
                <Textarea autoHeight className="person-record-date-textarea" value="老板今天还没发工资，好难过老板今天还没发工资，好难过" placeholder="..." ></Textarea>
            </View>
            <View className="person-record-component">
                <View className="person-record-component-item">今天11月2日</View>
                <View className="person-record-component-item">班组长</View>
                <View className="person-record-component-item">加班时长</View>
            </View> </View>}
            {recordnum == 1 && <View className="person-record-work">
                <View className={amountInput?"work-amount input-active":"work-amount"}>
                    <Text className="work-amount-text">工量</Text>
                    <Input type="number" value={quantity} placeholder='0' className="work-amount-input" onFocus={()=>(setAmountIput(true))} onBlur={()=>(setAmountIput(false))} />
                </View>
                <View className="person-record-overtime person-record-date person-record-team">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">单位</Text>
                    <Text className="person-record-date-text">平方米</Text>
                    <Text className="unit-icon"></Text>
                </View>
                <View className="person-record-overtime person-record-date person-record-team">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">分项</Text>
                    <Text className="person-record-date-text">挂窗帘</Text>
                </View>
                <View className="person-record-overtime person-record-date">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">日期</Text>
                    <Text className="person-record-date-text">共选择<Text className="person-record-date-day">4</Text>天</Text>
                    <Text className="overtime-icon"></Text>
                </View>
                <View className="person-record-overtime person-record-date person-record-team">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">班组长</Text>
                    <Text className="person-record-date-text">王一鸣组长</Text>
                    <Text className="overtime-icon"></Text>
                </View>
                <View className="person-record-overtime person-record-date person-record-note">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">备注</Text>
                    <Textarea autoHeight className="person-record-date-textarea" value="老板今天还没发工资，好难过老板" placeholder="..." ></Textarea>
                </View>
                <View className="person-record-component">
                    <View className="person-record-component-item">今天11月2日</View>
                    <View className="person-record-component-item">班组长</View>
                </View>
            </View>}
            {recordnum == 2 && <View className="person-record-work">
                <View className={amountInput?"work-amount input-active":"work-amount"}>
                    <Text className="work-amount-text">金额</Text>
                    <Input type="number" value={quantity} placeholder='0' className="work-amount-input" onFocus={()=>(setAmountIput(true))} onBlur={()=>(setAmountIput(false))} />
                </View>
                <View className="person-record-overtime person-record-date">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">日期</Text>
                    <Text className="person-record-date-text">共选择<Text className="person-record-date-day">4</Text>天</Text>
                    <Text className="overtime-icon"></Text>
                </View>
                <View className="person-record-overtime person-record-date person-record-team">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">班组长</Text>
                    <Text className="person-record-date-text">王一鸣组长</Text>
                    <Text className="overtime-icon"></Text>
                </View>
                <View className="person-record-overtime person-record-date person-record-note">
                    <Image className="person-record-date-img" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png" />
                    <Text className="person-record-date-title">备注</Text>
                    <Textarea autoHeight className="person-record-date-textarea" value="老板今天还没发工资，好难过老板" placeholder="..." ></Textarea>
                </View>
                <View className="person-record-component">
                    <View className="person-record-component-item">今天11月2日</View>
                    <View className="person-record-component-item">班组长</View>
                </View>
            </View>}
            <View className="person-record-btn">
                <Button className="person-record-resave">保存并再记一笔</Button>
                <Button className="person-record-save">确认记工</Button>
            </View>
        </View>
    )
}
export default observer(PersonRecord)
PersonRecord.config = {
    navigationBarTitleText: '个人记工天',
} as Config