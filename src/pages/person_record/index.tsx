import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, Textarea, Button } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

let type = [
    {nmae:'记工天',typenum:0},
    {nmae:'记工量',typenum:1},
    {nmae:'记工钱',typenum:2},
];
let record_type:string = '记工天';
function PersonRecord(){

    return (
        <View className="person-record">
            <View className="person-record-top">
                <View className="person-record-top-item record-active">记工天</View>
                <View className="person-record-top-item">记工量</View>
                <View className="person-record-top-item">记工钱</View>
            </View>
            {record_type == "记工天" && <View>
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
            {record_type == ""

            }
            <View className="person-record-btn">
                <Button className="person-record-resave">保存并再记一笔</Button>
                <Button className="person-record-save">确认记工</Button>
            </View>
        </View>
    )
}
export default observer(PersonRecord)
PersonRecord.config = {
    navigationBarTitleText: '个人'+record_type,
} as Config