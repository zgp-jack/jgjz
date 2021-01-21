import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface MoreWorkTimeType {
    num:number,
    id:string,
    selected:false
}
export default function MoreWorkTime({WorktimeCancle}){
    let moreworktimedata:MoreWorkTimeType[] = [];
    for(let i=0.5;i<=24;i+=0.5){
        moreworktimedata.push({num:i,id:'ids'+i,selected:false});
    }
    const [worktime, setWorkTime] = useState<MoreWorkTimeType[]>(moreworktimedata)
    const SelectWorkTime = (e) => {
        if(!e.target.id) return false;
        let worktimelist = JSON.parse(JSON.stringify(moreworktimedata));
        worktimelist.forEach((item) => e.target.id == item.id ? item.selected = true:item.selected = false)
        setWorkTime(worktimelist)
    }
    return (
        <View className="moreworktime">
            <View className="moreworktime-content">
                <View className="moreworktime-btn">
                    <Text className="moreworktime-cancle" onClick={WorktimeCancle}>取消</Text>
                    <Text className="moreworktime-title">选择上班时长</Text>
                    <Text className="moreworktime-confim">确定</Text>
                </View>
                <View className="moreworktime-list" onClick={SelectWorkTime}>
                    {worktime.map((item) => 
                        <View className={item.selected?"worktime-active moreworktime-item":"moreworktime-item"} id={item.id}>{item.num}小时</View>
                    )}
                </View>
            </View>
        </View>
    )
}