import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button} from '@tarojs/components'
import './index.scss'

export default function Index(){
  return (
    <View className='index'>
        <View className="">
            <Text className="">当前共1个项目</Text>
            <Text className="">新建+</Text>
        </View>
        <View className="">
            <View className="">个人记工</View>
            <View className="">
                <Text className="">默认班主记工记账</Text>
                <View className="">修改 <Image className="account-right-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png"></Image> </View>
            </View>
            <View className="">
                <View className=""><Image className="account-gong-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image> 记工</View>
                <View className=""><Image className="account-zhang-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/record-work-icon.png"></Image>记账</View>
            </View>
            <Button>进入记工账本</Button>
        </View>
        <View className="">
            <View className="">班组记工</View>
            <View className="">
                <Text className="">默认班主记工记账</Text>
                <View className="">修改 <Image className="account-right-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/common/arrow-right.png"></Image> </View>
            </View>
            <View className="">
                <View className=""><Image className="account-gong-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/Bookkeeping-icon.png"></Image>记工</View>
                <View className=""><Image className="account-zhang-icon" src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/gl/record-work-icon.png"></Image>记账</View>
            </View>
            <Button>进入记工账本</Button>
        </View>

    </View>
  )
}
