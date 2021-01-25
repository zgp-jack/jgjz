import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import classnames from 'classnames'
import { SEARCH_PROPS } from '../../index.d'
import './index.scss'

export default function TestComponent(props: SEARCH_PROPS) {
  const { addClick, onSearch, value = '',type } = props
  return (
    <View className="search">
      {type == 'alone' && <View className="search_alone">
        <Text className="people_num">工友工30人</Text>
        <View className="add">
          <View className="add_botton">
            <Text>添加工友</Text>
          </View>
        </View>
      </View>}
      <View className="search_group">
        <View className={classnames({
          "input_box": true,
          "input_box_active": !value,
        })} >
          <Image className="input_box_img" src={`${IMGCDNURL}ws/search.png`} ></Image>
          <Input 
            className="input_box_input"  
            type="text" 
            placeholder="请输入名字或者手机号码查询"
            onInput={(e: any) => {onSearch && onSearch(e.detail.value)}}
            value={value}
          ></Input>
          {value && <Image className="input_box_clear" src={`${IMGCDNURL}ws/search-clear.png`} onClick={() => onSearch && onSearch('')} ></Image>}
        </View>
        {!value && type == 'group' && 
        <View className="add">
          <View className="add_botton" onClick={()=>addClick()}>
            <Text>添加工友</Text>
          </View>
        </View>}
      </View>
    </View>
  )
}