import Taro, {useDidShow, useEffect, useState} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import useInit from '@/hooks/init'
import { IMGCDNURL, ADDRESSBOOKTYPE_GROUP_ADD, ADDRESSBOOKTYPE_GROUP_DEL } from '@/config/index'
import PromptBox from '@/components/popup/index'
import { editWordkerInfo } from '@/pages/address_book/api'
import msg from '@/utils/msg'
import { InputValue } from '@/components/popup/index.d'
import { WorkerData } from './index.d'
import getWorkerList, { removePerson} from './api'
import './index.scss'

interface RecordWorkProps {
  workerId: number[]
  setWorkerId: (data: number[]) => void
  workNote: number
  startDate: string
  type: number
}

function RecordWork({workerId, setWorkerId, workNote, startDate, type}: RecordWorkProps) {
  const { data, setLoading} = useInit(getWorkerList, {
    business_time: startDate,
    action: type,
    workNote: workNote
  }, {business_worker_id: [], note_worker: []})
  const [worker, setWorker] = useState<WorkerData[]>([])
  const [emptyArray, setEmptyCount] = useState<WorkerData[]>([])
  // 是否全选标记
  const [allChoose, setAllchoose] = useState<boolean>(false);
  /**是否显示编辑工友弹窗*/
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  /**当前长按选中的工友信息*/
  const [selectWorker, setSelectWorker] = useState<WorkerData>({
    id: 1, is_self: 0, name: '', name_color: '', name_py: '', tel: ''
  });
  /** 是否第一次显示 */
  const [firstShow, setFirstShow] = useState<boolean>(false)

  /**定时器*/
  let timeOutEvent = 0

  useEffect(() => {
    setLoading(true)
  }, [startDate])

  useEffect(() => {
    if (!data || !data.business_worker_id) return
    let businessWorker = JSON.parse(JSON.stringify(data.business_worker_id));
    let workerData = JSON.parse(JSON.stringify(data.note_worker));
    workerData.forEach((item: any) => {
      businessWorker.forEach((obj: any) => {
        if (type == 1 || type == 2 || type == 3){
          if (obj == item.id) {
            item.recorded = true
          }
        }
      })
      /**处理工友数据是自己*/ 
      if (item.is_self) {
        item.name = item.name + "自己"
      }
      /**截取工友名字后两个字*/ 
      item.alias = item.name.substring(item.name.length - 2)
    })
    /**为了ui显示增加空工友数据*/ 
    let emptyObjCount = 6 - (workerData.length + 2) % 6;
    let emptCount: WorkerData[] = []
    for (let index = 0; index < emptyObjCount; index++) {
      emptCount.push({id: 0, is_self: 0, name: '', name_color: '', name_py: '', tel: '', check: false, recorded: false})
    }
    setWorker(workerData);
    setEmptyCount(emptCount)
  },[data])
  
  useDidShow(()=>{
    if(firstShow){
      setLoading(true)
    }
    setFirstShow(true)
  })
  /**
  * @name: chooseWorker
  * @params index 选中工友列表对应下标
  * @return void
  * @description 点击工友选中或者取消选中
  */
  const chooseWorker = function (index:number) {
    /**复制一份工友数据*/
    let workerData = JSON.parse(JSON.stringify(worker))
    /**点击对应下标工友数据*/
    let workerItem = workerData[index];
    /**已选中工友id*/
    let workerIdArray = [...workerId]
    /**如果工友是选中状态那么就取消选择并删除选中工友数组id对应数据*/
    if (workerItem.check) {
      // 改变选中状态为未选中
      workerItem.check = false;
      // 查找保存的选中工友id数组中是否有当前点击的数据id
      let i = workerIdArray.findIndex(item => item == workerItem.id);
      // 选中工友id数组中有该信息就从选中数组中删除
      if (i !== -1) workerIdArray.splice(i, 1)
    }else{
    /**如果工友是未选中状态那么就选择并改变为选中状态，添加工友id到工友id数组中*/
      workerItem.check = true;
      let i = workerIdArray.findIndex(item => item == workerItem.id);
      /**添加数据到选中工友id数组中*/ 
      if (i == -1) workerIdArray.push(workerItem.id);
    }
    let noRecordData = workerData.filter((item:any)=>{
      return !item.recorded;
    })
    let allStatus = noRecordData.every((item:any)=>{
      return item.check == true;
    })
    setAllchoose(allStatus)
    // 保存选择后数据
    setWorker(workerData)
    setWorkerId(workerIdArray)
  }

  /**
  * @name: chooseAll
  * @params null
  * @return void
  * @description 点击 全部未记  选中所有未记录工友 点击取消全选，取消所有选中
  */
  const chooseAll = function () {
    /**已选中工友id*/
    let workerIdArray = [...workerId]
    /**复制一份工友数据*/
    let workerData = JSON.parse(JSON.stringify(worker))
    /**如果是未全部全选点击选中全部未记录*/ 
    if(!allChoose){
      /**循环遍历数据，处理所有未记录的工友为选中状态 所有未记录未选中的数据id*/
      let allNoChosse = workerData.reduce((pre:number[],item:any)=>{
        let chooseArray: number[] = pre
        if (!item.recorded && !item.check){
          item.check = true;
          chooseArray.push(item.id)  
        }
        return chooseArray
      },[])
      /**保存最新的选中工友数据*/ 
      setWorkerId(workerIdArray.concat(allNoChosse))
      setAllchoose(true)
    }else{
      /**如果是全部选中未记录，点击取消选中全部*/ 
      let allNoChosse = workerData.reduce((pre:number[],item: any) => {
        let chooseArray: number[] = pre;
        // 更改选中状态
        if (!item.recorded && item.check) {
          item.check = false;
        }
        if (!item.recorded && !item.check){
          chooseArray.push(item.id)  
        }
        return chooseArray
      },[])
      /**更新选中工友id数组*/ 
      allNoChosse.forEach((item:any)=>{
        let findIndex = workerIdArray.findIndex((obj:any)=>{
          return item == obj
        })
        if (findIndex != -1){
          workerIdArray.splice(findIndex,1)
        }
      })
      setWorkerId(workerIdArray)
      setAllchoose(false)
    }
    /**保存数据*/ 
    setWorker(workerData)
  }


  /**
  * @name: longPress
  * @params index 长按选择工友下标
  * @return void
  * @description 长按工友信息，弹出工友修改弹窗
  */
  /**长按触发事件*/ 
  const longPress = (index:number) => {
    timeOutEvent = 0
    /**长按选中的工友信息*/ 
    setSelectWorker(worker[index])
    /**弹出修改工友框*/ 
    setIsShowEdit(true)
  } 


  /**
  * @name: touchActionStart
  * @params index 长按选择工友下标
  * @return void
  * @description 触摸开始事件，触摸事件到达触发弹窗
  */
  const touchActionStart = function (index:number) {
    /**定时器*/ 
    let timeOver = setTimeout(function(){
      longPress(index)
    }, 1000);
    /**保存定时器*/ 
    timeOutEvent = Number(timeOver)
  }


  /**
  * @name: touchActionEnd
  * @params index 点击工友下标
  * @return void
  * @description 触摸结束事件，清除定时器，如果是打击选中工友
  */
  const touchActionEnd = function (index:number) {
    /**清除定时器*/ 
    clearTimeout(timeOutEvent);
    /**如果定时器标识不为0 为单击事件，选中工友*/ 
    if (timeOutEvent != 0) {
      chooseWorker(index)
    }
    return false;
  }
  

  /**
  * @name: touchMove
  * @params null
  * @return void
  * @description 触摸过程移动，清除定时器并不做任何操作
  */
  const touchMove = function () {
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
  }


  /**
  * @name: editWorkerConfirm
  * @params inputData 输入框编辑数据
  * @return void
  * @description 修改工友-接口请求
  */
  const editWorkerConfirm = (inputData: InputValue) => {
    /**发送编辑请求*/ 
    editWordkerInfo(selectWorker.id, { name: inputData.name, tel: inputData.tel || '' }).then(res => {
      msg(res.message)
      if (res.code != 0) {
        return
      }
      setLoading(true)
      /**隐藏修改弹窗*/ 
      setIsShowEdit(false)
    })
  }
  


  /**
  * @name: movePerson
  * @params null
  * @return void
  * @description 移除工友事件
  */
  const movePerson = () => {
    removePerson({ workId: selectWorker.id, work_note: workNote}).then((res) => {
      msg(res.message)
      if (res.code == 0) {
        setLoading(true)
        setIsShowEdit(false)
      }
    })
  }

  return (
    <View className='record-work-check-person'>
      <View className='record-work-check-person'>
        {/* 头部选择工友文案与全部选择 */}
        <View className='record-work-person-head'>
          <View className='record-work-person-title'>
            <View className='record-work-person-tip'>选择工友（已选<Text className='record-work-person-text'>{workerId.length}</Text>人）</View>
            {data.business_worker_id.length == data.note_worker.length ? '' : <View className='record-work-person-all' onClick={() => chooseAll()}>{allChoose ? '取消全选' : ((type == 1 || type == 2 || type == 3) ? '全选未记' : '全选')}</View>}
          </View>
          <View className='record-work-person-disc'>{(type == 1 || type == 2 || type == 3) ? '黄色块代表此工友当日已有记工' : '长按名字可编辑'}</View>
        </View>
      </View>
      {/* 工友数据列表 */}
      <View className='record-work-person-content'>
        {worker.map((obj, index) => (
          <View className='record-work-person-item' key={obj.id}>
            <View
              className={obj.check ? (obj.recorded ? 'record-work-person-box choose-box recorded-choose-box' : 'record-work-person-box choose-box') : (obj.recorded ? 'record-work-person-box recorded-box' : 'record-work-person-box')}
              onTouchStart={() => touchActionStart(index)}
              onTouchEnd={()=> touchActionEnd(index)}
              onTouchMove={()=> touchMove()}
            >{obj.alias}
              {(obj.recorded && !obj.check) &&
              <Image src={`${IMGCDNURL}yc/recorded.png`} mode='widthFix' className='recorded-image'></Image>}
              {obj.check &&
              <Image src={`${IMGCDNURL}yc/choose-box.png`} mode='widthFix' className='choose-image'></Image>}
            </View>
            <Text className='record-work-person-text'>{obj.name}</Text>
          </View>)
        )}
        <View className='record-work-person-add' onClick={() => Taro.navigateTo({ url: '/pages/address_book/index?type=groupAdd' })}>
          <View className='record-work-person-box'><Image 
            src={`${IMGCDNURL}yc/add.png`}
            mode='widthFix'
          /></View>
          <Text className='record-work-person-text'>添加</Text>
        </View>
        {/* 删除工友 */}
        <View className='record-work-person-del' onClick={() => Taro.navigateTo({ url: '/pages/address_book/index?type=leave' })}>
          <View className='record-work-person-box'><Image
            src={`${IMGCDNURL}yc/del.png`}
            mode='widthFix'
          /></View>
          <Text className='record-work-person-text'>删除</Text>
        </View>
        {/* ui显示用空内容 */}
        {emptyArray.map((_, index) => (
          <View className='record-work-person-item' key={index}></View>
        ))}
      </View>
      {isShowEdit && <PromptBox
        titleText='编辑工友'
        confirmText='确定修改'
        titleButtonText='离场'
        inputGroup={[
          { name: 'name', title: "姓名（必填）", placeholder: '请输入工友的姓名', value: selectWorker.name },
          { name: 'tel', title: "电话号码", placeholder: '请输入工友的电话号码(可不填)', value: selectWorker.tel }
        ]}
        confirm={(inputData) => editWorkerConfirm(inputData)}
        cancel={() => setIsShowEdit(false)}
        delet={() => movePerson()}
      ></PromptBox>}
    </View>
  )
}

export default RecordWork
