import Taro from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { observer } from '@tarojs/mobx'
import { VersionLimitParams } from './inter.d'
import './index.scss'
function Versionlimit({
  show = false,
}: VersionLimitParams) {
  /** 用户登录 */
  const userToOldVersion = () => {
    Taro.navigateToMiniProgram({
      appId: "wx3abff5d74de220d2",
      path: "",
      extraData: {},
      envVersion: "release",
      /*低下回调在工具里面报错*/
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.error('跳转失败', err)
      },
    })
  }
  return (
    <Block>
      {show &&
      <View className='version-limit-box'>
        <View className="version-tips">新版记工记账 研发中</View>
        <View className="version-deail">您可以继续前往旧版记工</View>
        <Image className="version-limit-icon" src={`${IMGCDNURL}gl/old_version.png`} onClick={() => userToOldVersion()}></Image>
      </View>}
    </Block>
  )
}

export default observer(Versionlimit)