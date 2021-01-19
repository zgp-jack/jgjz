import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image, Textarea } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import './index.scss'

function Content({src='', title, text, bool=0}){
    /* bool(0)--默认(有叉) bool（1）--备注  bool(2)--分类（要箭头） bool(3)--报销（宽度）bool(4)--修改
    */
    return (
        <View>
            <View className={bool==1?"person-record-note person-record-overtime person-record-date":"person-record-overtime person-record-date"}>
                {src && <Image className="person-record-date-img" src={src} />}
                {bool != 4 ?<Text className={bool==3?"person-record-date-title record-reimbursable":"person-record-date-title"}>{title}</Text>
                :<View className="person-record-modify-title person-record-date-title">{title}</View>}
                {bool != 1 && <Text className={bool==4?"person-record-modify":"person-record-date-text"}>{text}</Text>}
                {bool == 1 && <Textarea autoHeight className="person-record-date-textarea" value={text} placeholder="..." ></Textarea>}
                {(bool == 0 || bool == 3) && <Text className="overtime-icon"></Text>}
                {bool == 2 && <Text className="unit-icon"></Text>}
            </View>
        </View>
    )
}
export default observer(Content)