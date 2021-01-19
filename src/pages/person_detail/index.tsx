import Taro, { useState } from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import { observer, useLocalStore } from '@tarojs/mobx'
import ContentInput from '../person_tally/components/person_input/index'
import Content from '../person_tally/components/person_content/index'
import WorkTime from '../person_tally/components/work_time/index'
import OverTime from '../person_tally/components/over_time/index'
import './index.scss'

function PersonDetail(){
    /* type(0)--支出  type(1)--借支  type(2)--工天   type(3)--工钱  type(4)--工量
    */
    const [recordInput, setRecordInput] = useState<string>('金额');
    const [quantity, setQuantity] = useState<number>(0);
    const typeString:string = '工量';
    const type:number = 4;
    return (
        <View>
            {type == 0 && <View>
                <ContentInput type={recordInput} quantity={quantity} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'分类'} text={'请选择分类'} bool={2} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'是否可报销'} text={'可报销'} bool={3} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={'盛大开放打快速反击看到副书记'} bool={1} />
                <Content title={'日期'} text={'2020 - 11 - 03'} bool={4} />
                <Content title={'班组长'} text={'张三'} bool={4} />
                <Content title={'提交时间：'} text={'2020年11月03日  11:00'} bool={4} />
                <Content title={'项目名称：'} text={'肇庆富力尚悦居工地-扇灰班组'} bool={4} />
            </View>}
            {type == 1 && <View>
                <ContentInput type={recordInput} quantity={quantity} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'分类'} text={'请选择分类'} bool={2} />
                {/* <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'是否可报销'} text={'可报销'} bool={3} /> */}
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={''} bool={1} />
                <Content title={'日期'} text={'2020 - 11 - 03'} bool={4} />
                <Content title={'班组长'} text={'张三'} bool={4} />
                <Content title={'提交时间：'} text={'2020年11月03日  11:00'} bool={4} />
                <Content title={'项目名称：'} text={'肇庆富力尚悦居工地-扇灰班组'} bool={4} />
            </View>}
            {type == 2 && <View>
                <View className="person-record-time">
                    <WorkTime />
                    <OverTime modify={true} />
                </View>
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={''} bool={1} />
                <Content title={'日期'} text={'2020 - 11 - 03'} bool={4} />
                <Content title={'班组长'} text={'张三'} bool={4} />
                <Content title={'提交时间：'} text={'2020年11月03日  11:00'} bool={4} />
                <Content title={'项目名称：'} text={'肇庆富力尚悦居工地-扇灰班组'} bool={4} />
            </View>}
            {type == 3 && <View>
                <ContentInput type={recordInput} quantity={quantity} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={''} bool={1} />
                <Content title={'日期'} text={'2020 - 11 - 03'} bool={4} />
                <Content title={'班组长'} text={'张三'} bool={4} />
                <Content title={'提交时间：'} text={'2020年11月03日  11:00'} bool={4} />
                <Content title={'项目名称：'} text={'肇庆富力尚悦居工地-扇灰班组'} bool={4} />
            </View>}
            {type == 4 && <View>
                <ContentInput type={recordInput} quantity={quantity} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'单位'} text={'平方米'} bool={2} />
                <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'分项'} text={'包柱子'} bool={2} />
                <Content title={'日期'} text={'2020 - 11 - 03'} bool={4} />
                <Content title={'班组长'} text={'张三'} bool={4} />
                <Content title={'提交时间：'} text={'2020年11月03日  11:00'} bool={4} />
                <Content title={'项目名称：'} text={'肇庆富力尚悦居工地-扇灰班组'} bool={4} />
            </View>}
            <View className="person-record-btn">
                <Button className="person-record-resave">删除</Button>
                <Button className="person-record-save">保存修改</Button>
            </View>
        </View>
    )
}
export default observer(PersonDetail)
PersonDetail.config = {
    navigationBarTitleText: '修改借支',
}