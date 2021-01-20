import Taro, { Config, useState } from '@tarojs/taro'
import { View, Text, Image, Textarea, Button, Input } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import MoreWorkTime from '../person_tally/components/moreworktime/index'
import './index.scss'

let type = [
    {name:'记工天',typenum:0},
    {name:'记工量',typenum:1},
    {name:'记工钱',typenum:2},
];
let worknum = [
    {name:'一个工', selected: true, id:"onework"},
    {name:'半个工', selected: false, id:"halfwork"},
    {name:'休息', selected: false, id:"rest"},
    {name:'0小时', selected: false, id:"morework"}
];
let overnum = [
    {name:'无加班', selected: true, id:"novertime"},
    {name:'0小时', selected: false, id:'moreovertime'}
];
let record_type:string = "记工天";
function PersonRecord(){
    // 切换记工type
    const [recordnum, setRecordnum] = useState<number>(type[0].typenum);
    // input 交互值
    const [quantity, setQuantity] = useState<string>('0');
    // 选中input 样式
    const [amountInput, setAmountIput] = useState<boolean>(false);
    // 上班时间默认数据
    const [worktime, setWorkTime] = useState(worknum);
    // 加班时间默认数据
    const [overtime, setOverTime] = useState(overnum);
    // 是否显示 加班时间
    const [isovertime, setIsovetTime] = useState<boolean>(true);
    //是否显示加班组件
    const [isMoreWorkTime, setIsMoreWorkTime] = useState<boolean>(false);

    const Changetype = (e) => {
        switch(e.target.id){
            case "recordDay":
                setRecordnum(type[0].typenum);
                break;
            case "recordamout":
                setRecordnum(type[1].typenum);
                break;
            case "recordmoney":
                setRecordnum(type[2].typenum);
                break;
        }
    }
    const SelectWorkTime = (e) => {
        if(!e.target.id) return false;
        let worklist = JSON.parse(JSON.stringify(worktime));
        worklist.forEach((item) => e.target.id == item.id ? item.selected = true:item.selected = false)
        setWorkTime(worklist)
    }
    const SelectMoreWork = (e) => {
        e.stopPropagation()
        setIsMoreWorkTime(true);
    }
    const SelectOverTime = (e) => {
        if(!e.target.id) return false;
        let overlist = JSON.parse(JSON.stringify(overnum));
        overlist.forEach((item) => e.target.id == item.id ? item.selected = true:item.selected = false)
        setOverTime(overlist);
    }
    const WorktimeCancle = (e) => {
        setIsMoreWorkTime(false);
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
                <View className="person-record-worktime" onClick={SelectWorkTime}>
                    <Text className="worktime-text">上班时长</Text>
                    <View className={worktime[0].selected?"worktime worktime-active":"worktime"} id="onework">1个工</View>
                    <View className={worktime[1].selected?"worktime worktime-active":"worktime"} id="halfwork">半个工</View>
                    <View className={worktime[2].selected?"worktime worktime-active":"worktime"} id="rest">休息</View>
                    <View className={worktime[3].selected?"worktime worktime-active worktime-select":"worktime worktime-select"} onClick={SelectMoreWork}>
                        <Text className="worktime-select-time" id="morework">0小时</Text>
                    </View>
                </View>
                {isovertime && <View className="person-record-overtime person-record-worktime" onClick={SelectOverTime}>
                    <Text className="worktime-text">加班时长</Text>
                    <View className={overtime[0].selected?"worktime worktime-active":"worktime"} id="novertime">无加班</View>
                    <View className={overtime[1].selected?"worktime worktime-select worktime-active":"worktime worktime-select"}>
                        <Text className="worktime-select-time" id="moreovertime">24小时</Text>
                    </View>
                    <Text className="overtime-icon" onClick={(e) => {e.stopPropagation();setIsovetTime(false)}}></Text>
                </View>}
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
                {!isovertime && <View className="person-record-component-item">加班时长</View>}
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
            {isMoreWorkTime && <MoreWorkTime WorktimeCancle={WorktimeCancle} />}
        </View>
    )
}
export default observer(PersonRecord)
PersonRecord.config = {
    navigationBarTitleText: '个人记工天',
} as Config