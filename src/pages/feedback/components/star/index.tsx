import { View, Image, Text } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import starConfig from './config'
import './index.scss'
import { useState } from '@tarojs/taro'
import StarProps from './inter.d'

export default function Star({ num = starConfig.length - 1, onStar }: StarProps) {

  // 选中的图片
  const activeImg: string = `${IMGCDNURL}common/star_active.png`
  // 未选中的图片
  const normalImg: string = `${IMGCDNURL}common/star_normal.png`
  // 当前选中的星级
  const [starCurrent, setStarCurrent] = useState<number>(num)

  return (
    <View className='star-container'>
      {starConfig.map((item, index) => (
        <View className='star-item' key={item.id} >
          <View className='star-box' onClick={() => { setStarCurrent(index); onStar(index) } }>
            <Image className='star-img' src={index <= starCurrent ? activeImg : normalImg}></Image>
            <Text className='star-text'>{item.text}</Text>
          </View>
        </View>
      ))}
      
    </View>
  )
}