import { View, Text, Image } from '@tarojs/components'
import '@/pages/AddressBook/components/selected/index.scss'
export default function TestComponent() {
  return (
    <View className="selectd">
      <View className="selectd_right">
        <Text>已选择</Text>
        <Text>3个工友</Text>
      </View>
      <View className="selectd_left">
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
        <View>
          <Text>张三</Text>
          <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/delete.png"></Image>
        </View>
      </View>

    </View>
  )
}