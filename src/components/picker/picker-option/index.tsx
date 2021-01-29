import Taro, {useEffect, useState} from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import './index.scss'
import editpng from '@/images/bianj.png'
import remove from '@/images/shanc.png'
import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import PickerOptionsProps from './inter.d'
import LoadFooter from '@/components/load_footer'

export default function PickerOption({
                                       data = [],
                                       show,
                                       close,
                                       confirm,
                                       add,
                                       edit,
                                       del,
                                       status = true
                                     }: PickerOptionsProps) {

  return (
    <PopupBottom show={show} closePopup={close}>
      <View className="picker-option">
        <PickerBar centerText="选择分项" confirmClick={close}>
          <View className="picker-bar-children" onClick={() => add()}>添加</View>
        </PickerBar>
        <View className="picker-option-body">
          <ScrollView
            className='picker-body-scroll'
            scrollY
          >
            {!status && <LoadFooter text='数据加载中...'/>}
            {data.map((item, index) => (
              <View className="picker-option-item" key={item.id} onClick={() => confirm(item)}>
                <View className="option-item-name">{item.name}</View>
                <View className="option-item-icons">
                  <View className="option-item-icon-bor" onClick={(e) => {
                    e.stopPropagation();
                    edit(item, index)
                  }}>
                    <Image className="option-item-icon" src={editpng}/>
                  </View>
                  <View className="option-item-icon-bor" onClick={(e) => {
                    e.stopPropagation();
                    del(item.id, index)
                  }}>
                    <Image className="option-item-icon" src={remove}/>
                  </View>
                </View>
              </View>
            ))
            }
          </ScrollView>
        </View>
      </View>
    </PopupBottom>
  )
}
