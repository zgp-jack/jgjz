import { View, Button } from  '@tarojs/components'
import Content from '../person_content/index'
import ContentInput from '../person_input/index'
import ShrinkBar from '../shrinkbar/index'


export default function Expenditure(){
  return (
    <View>
      <ContentInput type={recordInput} quantity={quantity} />
      <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'分类'} text={'买材料'} bool={2} />
      <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'是否可报销'} text={'可报销'} bool={3} />
      <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'日期'} text={'4'} />
      <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'班组长'} text={'王一鸣组长'} />
      <Content src={"https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"} title={'备注'} text={'盛大开放打快速反击看到副书记'} bool={1} />
      <ShrinkBar />

      <View className="person-record-btn">
        <Button className="person-record-resave">保存并再记一笔</Button>
        <Button className="person-record-save">确认记工</Button>
      </View>

    </View>
  )
}

Expenditure.options = {
  addGlobalClass: true
}