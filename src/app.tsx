import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import WorkTeam from './pages/work_team/record_work/index'
import CounterStore from '@/store/counter'
import ClassifyType from '@/store/classify'
import ClassifySubitem from '@/store/classify/subitem'
import User from '@/store/user'
import './app.scss'
// import Remember from "@/pages/remember";
import './styles/common.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  CounterStore,
  ClassifyType,
  ClassifySubitem,
  User
}

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /*
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   ! 页面的请使用_区分，不要用驼峰，页面后面请清楚的标注当时是哪个页面
   */
  config: Config = {
    pages: [
      'pages/work_team/record_work/index',
      'pages/index/index', // 首页
      'pages/person_record/index',
      'pages/person_borrowing/index',
      'pages/person_detail/index',
      'pages/remember/index',
      'pages/feedback/index',
      'pages/login/index',
      'pages/account_book_list/index',
      'pages/identity_selection/index',
      'pages/example_mobx/index', // 示例 mobx 使用
      'pages/example_useInit/index', // 示例 useInit 使用
      'pages/example_useLists/index', // 示例 useLists 使用
      'pages/address_book/index', // 通讯录
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <WorkTeam />
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
