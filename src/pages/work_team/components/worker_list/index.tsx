import Taro, {useEffect, useState} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import useInit from '@/hooks/init'
import {IMGCDNURL} from '@/config/index'
import {WorkerData} from './index.d'
import getWorkerList from './api'
import './index.scss'

interface RecordWorkProps {
  workerId: number[]
  setWorkerId: (data: number[]) => void
  workNote: number
  startDate: string
}

function RecordWork({workerId, setWorkerId, workNote, startDate}: RecordWorkProps) {
  const {loading, data, errMsg, setLoading} = useInit(getWorkerList, {
    business_time: startDate,
    action: '4',
    workNote: workNote
  }, {business_worker_id: [], note_worker: []})
  const [worker, setWorker] = useState<WorkerData[]>([])
  const [emptyArray, setEmptyCount] = useState<WorkerData[]>([])

  useEffect(() => {
    setLoading(true)
  }, [startDate])
  useEffect(() => {
    if (!data || !data.business_worker_id) return
    let businessWorker = JSON.parse(JSON.stringify(data.business_worker_id));
    let workerData = JSON.parse(JSON.stringify(data.note_worker));
    workerData.forEach((item: any) => {
      businessWorker.forEach((obj: any) => {
        if (obj == item.id) {
          item.recorded = true
        }
      })
      if (item.is_self) {
        item.name = item.name + "自己"
      }
      item.alias = item.name.substring(item.name.length - 2)
    })

    setWorker(workerData);
    let emptyObjCount = 6 - (workerData.length + 2) % 6;
    let emptCount: WorkerData[] = []
    for (let index = 0; index < emptyObjCount; index++) {
      emptCount.push({id: 0, is_self: 0, name: '', name_color: '', name_py: '', tel: '', check: false, recorded: false})
    }
    setEmptyCount(emptCount)
    console.log('workerData', workerData)
  }, [data])


  const chooseWorker = function (index: number) {
    let workerData = JSON.parse(JSON.stringify(worker))
    let workerItem = workerData[index];
    let workerIdArray = [...workerId]
    if (workerItem.check) {
      workerItem.check = false;
      let i = workerIdArray.findIndex(item => item == workerItem.id);
      if (i != -1) workerIdArray.splice(i, 1)
    } else {
      workerItem.check = true;
      let i = workerIdArray.findIndex(item => item == workerItem.id);
      if (i == -1) workerIdArray.push(workerItem.id);
    }
    setWorker(workerData)
    setWorkerId(workerIdArray)
  }


  return (
    <View className='record-work-check-person'>
      <View className='record-work-check-person'>
        <View className='record-work-person-head'>
          <View className='record-work-person-title'>
            <View>选择工友（已选<Text>{workerId.length}</Text>人）</View>
            <View>全选未记</View>
          </View>
          <View className='record-work-person-disc'>黄色块代表此工友当日已有记工</View>
        </View>
      </View>
      <View className='record-work-person-content'>
        {worker.map((obj, index) => (
          <View className='record-work-person-item' key={obj.id}>
            <View
              className={obj.check ? (obj.recorded ? 'record-work-person-box choose-box recorded-choose-box' : 'record-work-person-box choose-box') : (obj.recorded ? 'record-work-person-box recorded-box' : 'record-work-person-box')}
              onClick={() => chooseWorker(index)}
            >{obj.alias}
              {(obj.recorded && !obj.check) &&
              <Image src={`${IMGCDNURL}yc/recorded.png`} mode='widthFix' className='recorded-image'></Image>}
              {obj.check &&
              <Image src={`${IMGCDNURL}yc/choose-box.png`} mode='widthFix' className='choose-image'></Image>}
            </View>
            <Text className='record-work-person-text'>{obj.name}</Text>
          </View>)
        )}
        <View className='record-work-person-add'
              onClick={() => Taro.navigateTo({url: '/pages/address_book/index?id=874&type=group&data=[]'})}>
          <View className='record-work-person-box'><Image
            src={`${IMGCDNURL}yc/add.png`}
            mode='widthFix'
          /></View>
          <Text className='record-work-person-text'>添加</Text>
        </View>
        <View className='record-work-person-del'>
          <View className='record-work-person-box'><Image
            src={`${IMGCDNURL}yc/del.png`}
            mode='widthFix'
          /></View>
          <Text className='record-work-person-text'>删除</Text>
        </View>
        {emptyArray.map((_, index) => (
          <View className='record-work-person-item' key={index}></View>
        ))}
      </View>
    </View>
  )
}

export default RecordWork
