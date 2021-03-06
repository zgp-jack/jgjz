import { View, Input } from '@tarojs/components'
import Taro, { eventCenter, useEffect, useState } from '@tarojs/taro'
import {PromptBoxProps, InputValue} from './index.d'
import './index.scss'


const PromptBox = ({
  /**默认显示左下角取消按钮*/ 
  showCancel = true,
  /**默认显示右下角确定按钮*/
  showConfirm = true,
  /**默认显示弹窗标题*/
  showTitle = true,
  /**默认显示右上方弹窗按钮*/ 
  showTitleButton = true,
  /**默认右上角按钮显示内容*/
  titleButtonText = '删除',
  /**默认弹窗左下角文本*/ 
  cancelText = '取消',
  /**默认右下角按钮文本*/ 
  confirmText = '确定修改',
  /**默认弹窗标题文本*/ 
  titleText = '修改分类',
  /**默认左下角按钮颜色*/ 
  cancelColor = '#797979',
  /**默认右下角按钮颜色*/ 
  confirmColor = '#0099FF',
  /**默认弹窗中输入框内容*/ 
  inputGroup = [{ name: 'input', title: '标题1', placeholder: '请输入你的标题', value: '', maxlength: 20, disabled:false,type:'text'}],
  /**左下角按钮事件*/ 
  cancel,
  /**右上角按钮事件*/
  delet,
  /**右下角按钮事件*/
  confirm
}: PromptBoxProps) => {

  // 输入框最大输入长度
  const inputMaxLength: number = 20

  // 初始化组件数据默认返回值
  let normal_data: InputValue = {}
  inputGroup.forEach((d) => {
    normal_data[d.name] = d.value
  })

  //输入框输入的数据
  const [data, setData] = useState<InputValue>(normal_data)
  
  /**
   * @name: enterInput
   * @params e: 输入事件对象 
   * @return void
   * @description 输入框输入数据设置到当前data中
  */
  const enterInput = (e: any)=>{
    //获取输入数据，并根据输入框name分别保存
    data[e.target.dataset.name] = e.detail.value.replace(/\s+/g, "")//去空格
    // 保存到data中
    setData({...data})
  }

  return (
    <View className='prompt-container'>
      <View className='prompt-box' >
        {/* 弹窗头部标题与按钮事件 */}

        {showTitle ? <View className='prompt-title' >{titleText}
          {showTitleButton ? <View className='prompt-title-button' onClick={() => delet && delet()}>{titleButtonText}</View> : ''}
        </View> : ''}

        {/* 弹窗中输入框内容 */}
        <View className='prompt-content'>     
          {inputGroup.map((item)=>(
            item.title ? (<View className='input-container' style={{ color: (item.disabled) ? "#a7a7a7" : "" }} key={item.name}><View className='input-title' >{item.title}</View><Input className='input-box' type={item.type ? item.type:"text"} placeholder={item.placeholder} data-name={item.name} maxLength={item.maxlength || inputMaxLength} value={item.value} onInput={(e) => enterInput(e)} focus={item.name == 'name' ? true : false} disabled={ !!item.disabled}   ></Input></View>) 
            : 
              <Input className='input-box' key={item.name} type='text' placeholder={item.placeholder} maxLength={item.maxlength || inputMaxLength} disabled={!!item.disabled} data-name={item.name} value={item.value} onInput={(e) => enterInput(e)}></Input>
          ))}
        </View>

        {/* 弹窗底部按钮与点击事件 */}
        <View className='prompt-footer' >
          {showCancel ? <View className='prompt-btn' style={{ color: cancelColor }} onClick={() => cancel && cancel()}>{cancelText}</View> : ''}
          {showConfirm ? <View className='prompt-btn' style={{ color: confirmColor }} onClick={() => confirm && confirm(data)}>{confirmText}</View> : ''}
        </View>
      </View>
    </View>
  )
}

export default PromptBox
