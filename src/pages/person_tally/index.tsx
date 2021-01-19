import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import Content from './components/person_content/index'
import ContentInput from './components/person_input/index'
import ShrinkBar from './components/shrinkbar/index'
import './index.scss'

function PersonTally(){
    let type = [
        {name:'借支',typenum:true,id:"recordDay"},
        {name:'支出',typenum:false,id:"recordamout"}
    ];
    const [recordtype, setRecordtype] = useState(type);
    const [recordInput, setRecordInput] = useState<string>('借支');
    const [quantity, setQuantity] = useState<number>(0);
    const Change = (ids) => {
        let list = JSON.parse(JSON.stringify(type));
        list.forEach(item => {
            if(item.id == ids){
                item.typenum = true;
                setRecordInput(item.name)
            }else{
                item.typenum = false
            }
        })
        setQuantity(0);
        setRecordtype(list)
    }
    return (
        <View>
            <View className="person-record-top" onClick={(e) => Change(e.target.id)} >
                {recordtype.map(item => 
                    <View className={item.typenum?"person-record-top-item record-active":"person-record-top-item"} id={item.id}>{item.name}</View>
                )}
            </View>
            {recordInput =="借支" && <View>
                <ContentInput type={recordInput} quantity={quantity} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'分类'} text={'生活费'} bool={2} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'日期'} text={'4'}  />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'班组长'} text={'张合'}  />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={'盛大开放打快速反击看到副书记'} bool={1} />
                <ShrinkBar />
            </View>}
            {recordInput =="支出" && <View>
                <ContentInput type={recordInput} quantity={quantity} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'分类'} text={'买材料'} bool={2} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'是否可报销'} text={'可报销'} bool={3} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'日期'} text={'4'}  />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'班组长'} text={'王一鸣组长'}  />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={'盛大开放打快速反击看到副书记'} bool={1} />
                <ShrinkBar />
            </View>}
            <View className="person-record-btn">
                <Button className="person-record-resave">保存并再记一笔</Button>
                <Button className="person-record-save">确认记工</Button>
            </View>
        </View>
    )
}
export default observer(PersonTally)
PersonTally.config = {
    navigationBarTitleText: '个人记借支',
}