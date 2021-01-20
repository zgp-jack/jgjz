import { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import Content from '../person_content/index'
import ContentInput from '../person_input/index'
import ShrinkBar from '../shrinkbar/index'
import { IMGCDNURL } from '@/config/index'
import BorrowPostData from './inter.d'

export default function Borrew() {

  // 借支提交数据
  const [postData, setPostData] = useState<BorrowPostData>({
    expend_type: 4,
    business_type: '',
    date: '',
    group_id: '',
    note:  '',
    money: '0.00'
  })

  // 用户更新数据
  const userUpdatePostData = (val: string, type: string) => {
    let postdata: BorrowPostData = { ...postData }
    postdata[type] = val
    setPostData(postdata)
  }

  // 提交借支数据
  const userPostAcion = () => {
    console.log(postData)
  }

  return (
    <View>
      <ContentInput title='借支' value={postData.money} change={userUpdatePostData} type="money" />
      <Content src={`${IMGCDNURL}gl/Bookkeeping-icon.png`} title={'分类'} text={'生活费'} bool={2} />
      <Content src={`${IMGCDNURL}gl/Bookkeeping-icon.png`} title={'日期'} text={'4'} />
      <Content src={`${IMGCDNURL}gl/Bookkeeping-icon.png`} title={'班组长'} text={'张合'} />
      <Content src={`${IMGCDNURL}gl/Bookkeeping-icon.png`} title={'备注'} text={'盛大开放打快速反击看到副书记'} bool={1} />
      <ShrinkBar />

      <View className="person-record-btn">
        <Button className="person-record-resave">保存并再记一笔</Button>
        <Button className="person-record-save" onClick={() => userPostAcion()}>确认记工</Button>
      </View>

    </View>
  )
}


Borrew.options = {
  addGlobalClass: true
}