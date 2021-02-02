import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PickerDetailProps from './inter.d'
import './index.scss'

export default function PickerDetail({
    dateTitle = '日期',
    dateValue = '',
    submitTitle = '提交时间',
    submitValue = '',
    projectName = '项目名称',
    projectValue = '',
    workerTitle = '工友',
    worker = '未选择',
    showWorker = false
}:PickerDetailProps){

    return (<View>
        <View className="person-record-overtime person-record-date">
            <View className="person-record-modify-title person-record-date-title">{dateTitle}</View>
            <Text className="person-record-modify">{dateValue}</Text>
        </View>
        {showWorker &&
        <View className="person-record-overtime person-record-date">
        <View className="person-record-modify-title person-record-date-title">{workerTitle}</View>
        <Text className="person-record-modify">{worker}</Text>
        </View>}
        <View className="person-record-overtime person-record-date">
            <View className="person-record-modify-title person-record-date-title">{submitTitle}</View>
            <Text className="person-record-modify">{submitValue}</Text>
        </View>
        <View className="person-record-overtime person-record-date">
            <View className="person-record-modify-title person-record-date-title">{projectName}</View>
            <Text className="person-record-modify">{projectValue}</Text>
        </View>
    </View>)
}
