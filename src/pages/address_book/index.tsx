import Taro, { useState, useEffect, Config, eventCenter, useRouter } from '@tarojs/taro'
import { observer, useLocalStore } from '@tarojs/mobx'
import AccountBookInfo from '@/store/account/index'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Selectd from './components/selected/index'
import Search from './components/search/index'
import { IMGCDNURL, ADDRESSBOOKTYPE_ALONE, ADDRESSBOOKTYPE_LEAVE, ADDRESSBOOKTYPE_GROUP, ADDRESSBOOKTYPE_GROUP_ADD, ADDRESSBOOKTYPE_GROUP_LEAVE, ADDRESSBOOKTYPE_ALONE_DEL } from '@/config/index'
import { AddressBookConfirmEvent } from '@/config/events'
import { ADDRESS_BOOK_LIST, PERSON_DATA, ADD_PERSON_PARAMS, ADD_NOTE_WORKERS_PARAMS, GET_NOTE_WORKERS_PARAMS } from './index.d'
import { InputValue } from '@/components/popup/index.d'
import classnames from 'classnames'
import msg, { showActionModal } from '@/utils/msg'
import { getWorkers, postAdd_Person, deletedPerson, editWordkerInfo, addNoteWorkers, deleteNoteWorkers, getNoteWorkers } from './api'
import { isNumber, isRequire } from '@/utils/v/index'
import PromptBox from '@/components/popup/index'
import './index.scss'

function AddressBook() {
  //获取账本id
  const localStore = useLocalStore(() => AccountBookInfo);
  const { accountBookInfo } = localStore
  // 获取当前显示的类型 默认个人选择
  const router = useRouter()
  let { type = ADDRESSBOOKTYPE_GROUP, data } = router.params
  // debugger
  const [routerData,setRouterData] = useState<{id:number,name:string}>({id:0,name:''})
  // 不通的type显示不同的页面标题
  if (type == ADDRESSBOOKTYPE_GROUP || type == ADDRESSBOOKTYPE_GROUP_ADD) {
    Taro.setNavigationBarTitle({
      title: '请选择需要添加的工友'
    })
  } else if (type == ADDRESSBOOKTYPE_LEAVE) {
    Taro.setNavigationBarTitle({
      title: '请选择需要离场的工友'
    })
  } else if (type == ADDRESSBOOKTYPE_ALONE || type == ADDRESSBOOKTYPE_GROUP_LEAVE || type == ADDRESSBOOKTYPE_ALONE_DEL) {
    Taro.setNavigationBarTitle({
      title: '请选择班组长'
    })
  }
  /** 通信录列表数据 */
  const [list, setList] = useState<ADDRESS_BOOK_LIST[]>([])
  /** 已选择的工友 */
  const [selectd, setSelectd] = useState<PERSON_DATA[]>([])
  /** 统计工友数量 */
  const [workerLen, setWorkerLen] = useState<number>(0)
  useEffect(() => {
    if (!accountBookInfo.id) return
    //单选班组长 上一个页面传过来的已选中数据
    if (type == ADDRESSBOOKTYPE_ALONE && data) {
      let d = JSON.parse(data)
      setRouterData(JSON.parse(data))
    }
    if (type == ADDRESSBOOKTYPE_GROUP_ADD || type == ADDRESSBOOKTYPE_GROUP || type == ADDRESSBOOKTYPE_ALONE || type == ADDRESSBOOKTYPE_ALONE_DEL) {
      /** 获取所有通讯录列表 */
      getWorkers(type == ADDRESSBOOKTYPE_ALONE_DEL ? { action: "select" } : { work_note: accountBookInfo.id }).then((res) => {
        setList(res.data)
        statisticsWorkrLen(res.data)
      })
    } else if (type == ADDRESSBOOKTYPE_LEAVE || type == ADDRESSBOOKTYPE_GROUP_LEAVE) {
      //获取已在当前账本中的工人
      let params: GET_NOTE_WORKERS_PARAMS = {
        business_time: '',
        action: "select",
        workNote: accountBookInfo.id
      }
      getNoteWorkers(params).then(res => {
        if (res.code != 0) {
          msg(res.message)
          Taro.navigateBack()
          return
        }
        //如果上一个 页面有 传数据 过来
        if (data) {
          let newData: PERSON_DATA[] = JSON.parse(data)
          //上一个页面传过来的数据 默认选中
          let newListData = res.data.note_worker
          newListData.map((Pitem, Pindex) => {
            newData.map((dataItem) => {
              if (Pitem.id == dataItem.id) {
                newListData[Pindex].is_check = true
              }
            })
          })
          //上一个页面传过来的数据 默认选中
          let newSelectd: PERSON_DATA[] = []
          newData.map((dataItem) => {
            newSelectd.push(dataItem)
          })
          setSelectd(newSelectd)
          let note_worker: ADDRESS_BOOK_LIST = {
            name_py: "no",
            data: newListData
          }
          setList([note_worker])
        } else {
          //过滤掉已离场的工人
          let filterDeletedData = res.data.note_worker.filter(item => {
            return item.is_deleted != 1
          })
          let note_worker: ADDRESS_BOOK_LIST = {
            name_py: "no",
            data: filterDeletedData
          }
          setList([note_worker])
        }
      })
    }


  }, [])

  /** 未选择check图片 */
  const normalCheckImg: string = `${IMGCDNURL}ws/check.png`
  /** 不可选择check图片 */
  const disableCheckImg: string = `${IMGCDNURL}ws/on_check.png`
  /** 已选择check图片 */
  const onCheckdImg: string = `${IMGCDNURL}ws/ckeckd.png`

  /**是否显示添加工友弹窗*/
  const [addPopupShow, setAddPopupShow] = useState<boolean>(false);
  /**是否显示编辑工友弹窗*/
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  /** 筛选工友数据 列表 */
  const [filterList, setFilterList] = useState<PERSON_DATA[]>([]);
  // 输入框的值
  const [value, setValue] = useState<string>('')
  /** 编辑工友默认数据 */
  const [editItemData, setEditItemData] = useState<PERSON_DATA>({
    id: 0,
    name: "",
    tel: "",
    name_py: "",
    name_color: "",
    is_deleted: 0,
    is_self: 0,
    is_in_work_note: 0,
    is_check: false
  })
  /** 字母定位ID */
  const [viewTo, setViewTo] = useState<string>("")
  /** 是否一全选 全选勾勾控制*/
  const [isAllSelect, setIsAllSelect] = useState<boolean>(false)
  /** 统计工友数量  */
  const statisticsWorkrLen = (data?: ADDRESS_BOOK_LIST[]) => {
    let NewList = data ? data : JSON.parse(JSON.stringify(list))
    if (type == ADDRESSBOOKTYPE_ALONE) {
      let workNum: number = 0
      NewList.map(Pitem => {
        Pitem.data.map(() => {
          workNum++
        })
      })
      setWorkerLen(workNum)
    }
  }
  /** 点击字母跳转相应位置 */
  const toView = (viewId: string) => {
    setViewTo(viewId == "view#" ? 'view_' : viewId)
  }
  /** 选中或者取消选中 */
  const selectItem = (pIndex: number, cIndex: number, isInNote: number) => {
    // 判断是单选 则拿到当前数据然后退出
    if (type === ADDRESSBOOKTYPE_ALONE) {
      let data: PERSON_DATA = list[pIndex].data[cIndex]
      eventCenter.trigger(AddressBookConfirmEvent, data)
      Taro.navigateBack()
      return
    }
    // 如果是 多选或者 离场 的情况 那么久选择或者取消
    if (isInNote) return
    let newListData: ADDRESS_BOOK_LIST[] = [...list]
    /** 添加is_check 表示是否选中 */
    newListData[pIndex].data[cIndex].is_check = !newListData[pIndex].data[cIndex].is_check
    setList(newListData)
    /** 已选中的工友数据 */
    let selectdArr: PERSON_DATA[] = []
    /** 找出已选中的工友 保存到selectd中 */
    /** 不在账本中的工友数量 */
    let onWorkLen: number = 0
    newListData.map((pItem) => {
      pItem.data.map((cItem) => {
        cItem.is_check ? selectdArr.push(cItem) : ''
        /** 找出不在账本中的工友数量 */
        cItem.is_in_work_note == 0 || !cItem.is_in_work_note ? onWorkLen++ : ''
      })
    })
    /** 当前选中的数量 是否==不在账本中的工友数量 相等说明全选 */
    selectdArr.length == onWorkLen ? setIsAllSelect(true) : setIsAllSelect(false)
    setSelectd(selectdArr)
  }
  /** 删除已选中的工友 */
  const deletePerson = (item: PERSON_DATA) => {
    let newListData: ADDRESS_BOOK_LIST[] = [...list]
    let newSelectd: PERSON_DATA[] = [...selectd]
    /** 从已选中里 过滤掉 当前删除的这一条*/
    setSelectd(newSelectd.filter(SelectdItem => SelectdItem.id != item.id))
    /** 从列表数据中 找到删除的这一条数据 改变is_check */
    newListData.map(pItem => {
      pItem.data.map(cItiem => {
        if (cItiem.id == item.id) {
          cItiem.is_check = false
        }
      })
    })
    setList(newListData)
    setIsAllSelect(false)
  }
  /** 随机选择一个颜色 */
  const randomColor = (): string => {
    let colors: string[] = ['#58C7FF', '#74E8D5', '#A4BFFF', '#79BAFF', '#4ECBF4']
    return colors[Math.floor(Math.random() * 5)]
  }
  /** 添加工友弹窗确定 */
  const addConfirm = (data: InputValue) => {
    if (!data.name) {
      msg("请填写工人名称")
      return
    }
    if (isRequire(data.tel)) {
      if (!isNumber(data.tel) || data.tel.length > 11) {
        msg("请填写正确的手机号")
        return
      }
    }
    /**给后台的参数*/
    let params: ADD_PERSON_PARAMS = {
      name: data.name,
      tel: data.tel || '',
      name_color: randomColor()
    }
    //发送数据给后台
    postAdd_Person(params).then((r) => {
      msg(r.message)
      if (r.code == 0) {
        // 添加成功后的人员信息
        let newPersonData: PERSON_DATA = {
          id: r.data.worker_id,
          is_deleted: 0,
          is_in_work_note: 0,
          is_self: 0,
          name: params.name,
          name_color: params.name_color,
          name_py: r.data.name_py,
          tel: params.tel,
          is_check: true
        }
        //是否是 班组长单选 添加后 直接返回上一页  数据传给上一页
        if (type == ADDRESSBOOKTYPE_ALONE){
          eventCenter.trigger(AddressBookConfirmEvent, newPersonData)
          Taro.navigateBack()
        }else{
          pushNewPerson(newPersonData)
        }
      }
    })
  }
  /** 添加成功后 把数据添加到本地 */
  const pushNewPerson = (newPerson: PERSON_DATA) => {
    let newList: ADDRESS_BOOK_LIST[] = [...list]
    /** 字母表 */
    let letter: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
    /** 现有的字母表 */
    let modernLetter: string[] = []
    newList.map((item) => {
      modernLetter.push(item.name_py)
    })
    /** 如果首字母已存在 */
    if (modernLetter.indexOf(newPerson.name_py) !== -1) {
      newList[modernLetter.indexOf(newPerson.name_py)].data.push(newPerson)
      setList(newList)
    } else {
      /** 如果首字母不存在 */
      let letterIndex: number = letter.indexOf(newPerson.name_py)
      /** 从已存在的字母表中找到当前字母的上一个字母 */
      let lastLetter: string = ''
      for (let i = 0; i < letter.length; i++) {
        if (letterIndex == 0) {
          letterIndex = 0
          break;
        } else {
          letterIndex--
          if (modernLetter.indexOf(letter[letterIndex]) !== -1) {
            lastLetter = letter[letterIndex]
            break;
          }
        }
      }
      /** 需要添加的数据 */
      let newLetterData: ADDRESS_BOOK_LIST = {
        name_py: newPerson.name_py,
        data: [newPerson]
      }

      if (letterIndex == 0) {
        newList.splice(0, 0, newLetterData)
      } else {
        //在newList中插入新的数据
        newList.map((item, index) => {
          if (item.name_py == lastLetter) {
            newList.splice(index + 1, 0, newLetterData)
          }
        })
      }
      setList([...newList])
    }
    /** 修改已选中的数据 */
    let newSelectd = [...selectd]
    newSelectd.push(newPerson)
    setSelectd(newSelectd)
    //统计人数
    statisticsWorkrLen(newList)
  }
  /** 添加工友弹窗取消 */
  const addCancel = () => {
    setAddPopupShow(false)
  }
  /** 弹出添加工友弹窗*/
  const showAddPopup = () => {
    setAddPopupShow(true)
  }
  /** 全选 */
  const allSelect = () => {
    let newListData: ADDRESS_BOOK_LIST[] = [...list]
    let newIsAllSelect: boolean = isAllSelect
    newIsAllSelect = !newIsAllSelect//全选取反
    let newSelectd: PERSON_DATA[] = []
    /** 把工友列表里的 所有工友添加上 is_ckeck=true */
    newListData.map(pItem => {
      pItem.data.map(cItiem => {
        cItiem.is_in_work_note != 1 ? cItiem.is_check = isAllSelect ? false : true : ''
        cItiem.is_in_work_note != 1 ? newSelectd.push(cItiem) : ''
      })
    })
    setList(newListData)
    setIsAllSelect(newIsAllSelect)
    //判断是全选还是取消全选
    newIsAllSelect ? setSelectd(newSelectd) : setSelectd([])
  }
  /** 修改工友  */
  const bossEditWorkerinfo = (data: PERSON_DATA) => {
    setEditItemData(data)
    setIsShowEdit(true)
  }
  /** 修改工友-接口请求 */
  const editWorkerConfirm = (data: InputValue) => {
    if (data.tel != null && isRequire(data.tel)) {
      if (!isNumber(data.tel) || data.tel.length > 11) {
        msg("请填写正确的手机号")
        return
      }
    }
    editWordkerInfo(editItemData.id, { name: data.name, tel: data.tel || '' }).then(res => {
      msg(res.message)
      if (res.code != 0) {
        return
      }

      setIsShowEdit(false)
      /** 所有工友数据 */
      let newList: ADDRESS_BOOK_LIST[] = JSON.parse(JSON.stringify(list))
      /** 修改后的数据 */
      let newWorkerInfo: PERSON_DATA = JSON.parse(JSON.stringify(editItemData))
      newWorkerInfo.name = data.name
      newWorkerInfo.tel = data.tel
      newWorkerInfo.name_py = res.data.name_py
      // 离场的修改逻辑
      if (type == ADDRESSBOOKTYPE_LEAVE) {
        newList[0].data.map((listItem, listIndex) => {
          if (listItem.id == newWorkerInfo.id) {
            newList[0].data.splice(listIndex, 1, newWorkerInfo)
          }
        })
        setList(newList)
        return
      }
      /** 现有的字母表 */
      let modernLetter: string[] = []
      newList.map((item) => {
        modernLetter.push(item.name_py)
      })

      /** 如果name_py没有改变 */
      if (res.data.name_py == editItemData.name_py) {
        newList.map((Pitem, Pindex) => {
          Pitem.data.map((Citem, Cindex) => {
            if (Citem.id == newWorkerInfo.id) {
              newList[Pindex].data[Cindex] = newWorkerInfo
            }
          })
        })
        setList(newList)
        /** 如果修改的name_py 已存在 */
      } else if (modernLetter.indexOf(res.data.name_py) !== -1) {
        /** 删除修改之前的那一条数据 */
        newList.map((Pitem, Pindex) => {
          Pitem.data.map((Citem, Cindex) => {
            if (Citem.id == newWorkerInfo.id) {
              newList[Pindex].data.splice(Cindex, 1)
              if (newList[Pindex].data.length < 1) {
                newList.splice(Pindex, 1)
                modernLetter.splice(Pindex, 1)
              }
              newList[modernLetter.indexOf(res.data.name_py)].data.push(newWorkerInfo)
              setList(newList)
            }
          })
        })
      } else {
        /** 现有字母标中不存在当前字母 */
        /** 所有字母表 */
        let letter: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
        /** 当前字母在所有字母表中的位置 */
        let letterIndex: number = letter.indexOf(res.data.name_py)
        /** 从已存在的字母表中找到当前字母的上一个字母 */
        let lastLetter: string = ''
        for (let i = 0; i < letter.length; i++) {
          if (letterIndex == 0) {
            letterIndex = 0
            break;
          } else {
            letterIndex--
            if (modernLetter.indexOf(letter[letterIndex]) !== -1) {
              lastLetter = letter[letterIndex]
              break;
            }
          }
        }
        /** 需要添加的数据 */
        let newLetterData: ADDRESS_BOOK_LIST = {
          name_py: res.data.name_py,
          data: [newWorkerInfo]
        }
        /** 删除修改之前的那一条数据 */
        newList.map((Pitem, Pindex) => {
          Pitem.data.map((Citem, Cindex) => {
            if (Citem.id == newWorkerInfo.id) {
              newList[Pindex].data.splice(Cindex, 1)
              if (newList[Pindex].data.length < 1) {
                newList.splice(Pindex, 1)
              }
            }
          })
        })
        //在newList中插入新的数据
        if (letterIndex == 0) {
          newList.splice(0, 0, newLetterData)
          console.log(newList)
        } else {
          newList.map((item, index) => {
            if (item.name_py == lastLetter) {
              newList.splice(index + 1, 0, newLetterData)
            }
          })
        }
        setList(newList)
      }
      /** 修改已选中的数据 */
      let newSelectd = [...selectd]
      newSelectd.map((selectItem, selectIndex) => {
        if (selectItem.id == newWorkerInfo.id) {
          newSelectd[selectIndex] = newWorkerInfo
        }
      })
      setSelectd(newSelectd)
      /** 修改搜索出来的数据 */
      let newFilterList = [...filterList]
      /** 判断是否有搜索数据 */
      if (newFilterList.length > 0) {
        newFilterList.map((FItem, Findex) => {
          if (FItem.id == newWorkerInfo.id) {
            newFilterList[Findex] = newWorkerInfo
          }
        })
        setFilterList(newFilterList)
      }
      //重新搜索
      let _lists: PERSON_DATA[] = []
      newList.forEach(item => {
        let items: PERSON_DATA[] = item.data
        for (let i = 0; i < items.length; i++) {
          let data: PERSON_DATA = items[i]
          if (data.name.indexOf(value) !== -1) {
            _lists = [..._lists, data]
          }
        }
      })
      setFilterList(_lists)
    })
  }
  /** 删除事件 */
  const deletPerson = () => {
    //如果需要删除的这一条已经被选中  不做任何操作
    if (editItemData.id == routerData.id){
      return
    }
    let workId = {
      id: editItemData.id
    }
    showActionModal({
      msg: "确定要删除此工友吗", showCancel: true, success: ((r) => {
        if (r.cancel) {
          return
        }
        deletedPerson(workId).then((res) => {
          msg(res.message)
          if (res.code == 0) {
            setIsShowEdit(false)
            /** 在本地list删除当前数据 */
            let newList: ADDRESS_BOOK_LIST[] = [...list]
            let editId: number = editItemData.id
            newList.map((Pitem, Pindex) => {
              Pitem.data.map((Citem, Cindex) => {
                if (Citem.id == editId) {
                  newList[Pindex].data.splice(Cindex, 1)
                  if (newList[Pindex].data.length < 1) {
                    newList.splice(Pindex, 1)
                  }
                  setList(newList)
                }
              })
            })
            /** 删除已选中的数据 */
            let newSelectd: PERSON_DATA[] = [...selectd]
            newSelectd.map((Sitem, Sindex) => {
              Sitem.id == editId ? newSelectd.splice(Sindex, 1) : ''
            })
            //统计人数
            statisticsWorkrLen(newList)
            setSelectd(newSelectd)

            //重新搜索
            let _lists: PERSON_DATA[] = []
            newList.forEach(item => {
              let items: PERSON_DATA[] = item.data
              for (let i = 0; i < items.length; i++) {
                let data: PERSON_DATA = items[i]
                if (data.name.indexOf(value) !== -1) {
                  _lists = [..._lists, data]
                }
              }
            })
            setFilterList(_lists)
          }
        })
      })
    })
  }
  /** 显示修弹窗 */
  const editwork = (editData: PERSON_DATA) => {
    setEditItemData(editData)
    setIsShowEdit(true)
  }
  // 用户搜索操作
  const userSearchAction = (val: string) => {
    setValue(val)
    let lists: ADDRESS_BOOK_LIST[] = JSON.parse(JSON.stringify(list))
    let _lists: PERSON_DATA[] = []
    lists.forEach(item => {
      let items: PERSON_DATA[] = item.data
      for (let i = 0; i < items.length; i++) {
        let data: PERSON_DATA = items[i]
        if(data.tel == null){
          data.tel = ''
        }
        if (data.name.indexOf(val) !== -1 || data.tel.indexOf(val) !== -1) {
          _lists = [..._lists, data]
        }
      }
    })
    setFilterList(_lists)
  }
  // 搜索后的数据 选择
  const filterSelect = (index: number, id: number) => {
    let newSelectd = JSON.parse(JSON.stringify(selectd))
    let newList = JSON.parse(JSON.stringify(list))
    let newFilterList = JSON.parse(JSON.stringify(filterList))
    /** 搜索列表选中或取消 */
    newFilterList[index].is_check = !newFilterList[index].is_check
    setFilterList(newFilterList)
    /** 添加 */
    if (newFilterList[index].is_check) {
      newSelectd.push(newFilterList[index])
    } else {
      /** 删除 */
      newSelectd.map((selectdItem, selectdIndex) => {
        if (selectdItem.id == id) {
          newSelectd.splice(selectdIndex, 1)
        }
      })
    }
    setSelectd(newSelectd)
    //  选中或者取消 所有列表中的数据
    newList.map((listItem, listIndex) => {
      listItem.data.map((dataItem, dataIndex) => {
        if (dataItem.id == id) {
          newList[listIndex].data[dataIndex].is_check = !newList[listIndex].data[dataIndex].is_check
        }
      })
    })
    setList(newList)
  }
  // 离场
  const leave = (id?: number) => {
    let params: ADD_NOTE_WORKERS_PARAMS = {
      worker_ids: '',
      work_note: accountBookInfo.id.toString(),
      action: 'note_workers'
    }
    if (!id) {
      // 拷贝已选中的数据
      let newSelectd: PERSON_DATA[] = JSON.parse(JSON.stringify(selectd))
      //已选中工友的id
      let ids: number[] = []
      newSelectd.map(item => {
        ids.push(item.id)
      })
      params.worker_ids = ids.toString()
    } else {
      params.worker_ids = id.toString()
    }
    //发送离场接口
    deleteNoteWorkers(params).then(res => {
      msg(res.message)
      if (res.code != 0) {
        return
      }
      //判断是单个离场还是批量离场
      if (id) {
        let newList = JSON.parse(JSON.stringify(list))
        let newSelectd = JSON.parse(JSON.stringify(selectd))
        newList[0].data.map((item, index) => {
          if (item.id == id) {
            newList[0].data.splice(index, 1)
          }
        })
        newSelectd.map((selectdItem, selectdIndex) => {
          if (selectdItem.id == id) {
            newSelectd.splice(selectdIndex, 1)
          }
        })
        //关闭修改弹窗
        setIsShowEdit(false)
        setList(newList)
        setSelectd(newSelectd)
        //重新搜索
        let _lists: PERSON_DATA[] = []
        newList.forEach(item => {
          let items: PERSON_DATA[] = item.data
          for (let i = 0; i < items.length; i++) {
            let data: PERSON_DATA = items[i]
            if (data.name.indexOf(value) !== -1) {
              _lists = [..._lists, data]
            }
          }
        })
        setFilterList(_lists)
      } else {
        //批量离场成功-返回上一页
        Taro.navigateBack()
      }
    })
  }
  /** 确定提交 */
  const submitSelect = () => {
    // 拷贝已选中的数据
    let newSelectd: PERSON_DATA[] = JSON.parse(JSON.stringify(selectd))
    // 已选中是否有数据
    if (newSelectd.length < 1) {
      msg("最少选中一个工友")
      return
    }
    //如果type是groupAdd 需要在通讯录发接口
    if (type == ADDRESSBOOKTYPE_GROUP_ADD) {
      let params: ADD_NOTE_WORKERS_PARAMS = {
        worker_ids: '',
        work_note: accountBookInfo.id.toString(),
        action: 'note_workers'
      }
      let ids: number[] = []
      newSelectd.map(item => {
        ids.push(item.id)
      })
      params.worker_ids = ids.toString()
      addNoteWorkers(params).then(res => {
        msg(res.message)
        if (res.code != 0) {
          return
        }
        eventCenter.trigger(AddressBookConfirmEvent, selectd)
        Taro.navigateBack()
      })
    } else if (type == ADDRESSBOOKTYPE_LEAVE) {
      leave()
    }else{
      eventCenter.trigger(AddressBookConfirmEvent, selectd)
      Taro.navigateBack()
    }
  }
  /** 单选-点击搜索内容 直接返回上一页-传入选中数据 */
  const aloneFilterSelect = (data: PERSON_DATA) => {
    // 判断是单选 则拿到当前数据然后退出
    if (type === ADDRESSBOOKTYPE_ALONE) {
      eventCenter.trigger(AddressBookConfirmEvent, data)
      Taro.navigateBack()
    }
  }
  return (
    <View className="AddressBook">
      {/* 已选中工友 */}
      {type !== ADDRESSBOOKTYPE_ALONE && <Selectd selectd={selectd} deletePerson={deletePerson} />}

      {/* 搜索组件 */}
      <Search addClick={showAddPopup} workerLen={workerLen} onSearch={(val) => userSearchAction(val)} value={value} type={type} />
      {/* 通讯录列表 */}
      <ScrollView scrollY scrollIntoView={viewTo} scrollWithAnimation className={classnames({
        "list_content": true,
        "list_content-alone": type === ADDRESSBOOKTYPE_ALONE,
      })} >
        {list.map((pItem, pIndex) => (
          <View className="item" key={pItem.name_py} id={pItem.name_py == "#" ? 'view_' : 'view' + pItem.name_py}>
            {
              // 离场没有首字母
              pItem.name_py !== 'no' && <Text className="title">{pItem.name_py}</Text>
            }
            {pItem.data.map((cItem, cIndex) => (
              <View className="item_person" key={cItem.id}>
                <View className="left" onClick={() => selectItem(pIndex, cIndex, cItem.is_in_work_note)}>

                  {/* 只有当 type 非个人的时候 才会有图片选择   // 判断是否已经在账本中 默认选中 再判断是否已经选中 */}
                  {type !== ADDRESSBOOKTYPE_ALONE && <Image className='item_checkbox' src={cItem.is_in_work_note ? `${disableCheckImg}` : cItem.is_check ? `${onCheckdImg}` : `${normalCheckImg}`} />}
                  <View className="avatar" style={{ background: cItem.name_color }}>{cItem.name.substring(0, 2)}</View>
                  <View className="name_tle">
                    <Text className="name">{cItem.name}{cItem.is_self == 1 ? '(自己)' : ''}</Text>
                    {cItem.tel && <Text className="tel">{cItem.tel}</Text>}
                  </View>
                </View>
                {
                  type != ADDRESSBOOKTYPE_GROUP_LEAVE && type != ADDRESSBOOKTYPE_ALONE_DEL &&
                  <View className="setting" onClick={(e) => { e.stopPropagation(); bossEditWorkerinfo(cItem) }}>
                    <Image className="setting_img" src={`${IMGCDNURL}ws/setting.png`} />
                  </View>
                }
                {type == ADDRESSBOOKTYPE_ALONE_DEL && cItem.is_deleted == 1 && <View className="del"><Text>已删除</Text></View>}
                {type == ADDRESSBOOKTYPE_GROUP_LEAVE && cItem.is_deleted == 1 && <View className="leave"><Text>已离场</Text></View>}
              </View>
            ))
            }
          </View>
        )
        )}
      </ScrollView>

      {/* 筛选列表 */}
      {value &&
        <ScrollView scrollY scrollIntoView={viewTo} scrollWithAnimation className={classnames({
          "list_content": true,
          "list_content-alone": type === ADDRESSBOOKTYPE_ALONE,
          "list_content_filter": true,
        })}>
          {filterList.map((item, pIndex) => (
            <View className="item_person" key={item.id}>
              <View className="left" onClick={() => type === ADDRESSBOOKTYPE_ALONE ? aloneFilterSelect(item) : filterSelect(pIndex, item.id)}>

                {/* 只有当 type 非个人的时候 才会有图片选择   // 判断是否已经在账本中 默认选中 再判断是否已经选中 */}
                {type !== ADDRESSBOOKTYPE_ALONE &&
                  <Image className='item_checkbox'
                    src={item.is_in_work_note ? `${disableCheckImg}` : item.is_check ? `${onCheckdImg}` : `${normalCheckImg}`}
                  />}

                <View className="avatar" style={{ background: item.name_color }}>{item.name.substring(0, 2)}</View>
                <View className="name_tle">
                  <Text className="name">{item.name}{item.is_self == 1 ? '(自己)' : ''}</Text>
                  {item.tel && <Text className="tel">{item.tel}</Text>}
                </View>
              </View>
              {
                type != ADDRESSBOOKTYPE_GROUP_LEAVE && type != ADDRESSBOOKTYPE_ALONE_DEL &&
                <View className="setting" onClick={(e) => { e.stopPropagation(); bossEditWorkerinfo(item) }} >
                  <Image className="setting_img" src={`${IMGCDNURL}ws/setting.png`}/>
                </View>
              }
              {type == ADDRESSBOOKTYPE_ALONE_DEL && item.is_deleted == 1 && <View className="del"><Text>已删除</Text></View>}
              {type == ADDRESSBOOKTYPE_GROUP_LEAVE && item.is_deleted == 1 && <View className="leave"><Text>已离场</Text></View>}
            </View>
          ))
          }
        </ScrollView>}

      {/* 右侧字母表 */}
      {
        // 离场没有首字母
        list.length > 0 && list[0].name_py !== 'no' &&
        <View className="right_nav">
          {list.map((item) => (
            <Text className='right-nav-text' key={item.name_py} onClick={() => toView('view' + item.name_py)}>{item.name_py}</Text>
          ))}
        </View>
      }

      {/* 底部组件 当非个人类型时显示 */}
      {type !== ADDRESSBOOKTYPE_ALONE &&
        <View className="bottom_all">
          <View className="bottom_all_box" onClick={() => allSelect()}>
            <Image className="bottom_all_img" src={isAllSelect ? `${IMGCDNURL}ws/ckeckd.png` : `${IMGCDNURL}ws/check.png`} />
            <Text className="bottom_all_text" >全选</Text>
          </View>
          <View className="button" style={{ background: type == ADDRESSBOOKTYPE_LEAVE ? '#c82928' : "#0099FF" }} onClick={() => submitSelect()}>
            {type == ADDRESSBOOKTYPE_LEAVE ? '离场' : "确定"}（{selectd.length}人）
          </View>
        </View>}
      {/* // 添加工友组件 */}
      {addPopupShow && <PromptBox
        titleText="添加工友"
        showTitleButton={false}
        confirmText="确定"
        inputGroup={[
          { name: 'name', title: "姓名（必填）", placeholder: '请输入对方的姓名', value: '', maxlength: 20, type: 'text'  },
          { name: 'tel', title: "电话号码", placeholder: '请输入对方的电话号码(可不填)', value: '', maxlength: 11, type: 'number'  }
        ]}
        confirm={(data) => addConfirm(data)}
        cancel={addCancel}
      />}

      {/* // 修改工友组件 */}
      {isShowEdit && <PromptBox
        titleText="修改工友"
        confirmText="确定"
        titleButtonText={type == ADDRESSBOOKTYPE_LEAVE ? "离场" : (editItemData.is_self == 1 || editItemData.id == routerData.id ? (editItemData.id == routerData.id ? '已选中':'') : "删除")}
        inputGroup={[
          { name: 'name', title: "姓名（必填）", placeholder: '请输入对方的姓名', value: editItemData.name, maxlength: 20, type: 'text', disabled: editItemData.id == routerData.id ? true : false },
          { name: 'tel', title: "电话号码", placeholder: '请输入对方的电话号码(可不填)', value: editItemData.tel, maxlength: 11, disabled: editItemData.is_self == 1 || editItemData.id == routerData.id ?true:false,type:"number" }
        ]}
        confirm={(data) => editWorkerConfirm(data)}
        cancel={() => setIsShowEdit(false)}
        delet={() => type == ADDRESSBOOKTYPE_LEAVE ? leave(editItemData.id) : deletPerson()}
      />}
    </View>
  )
}

AddressBook.config = {
  navigationBarTitleText: '工友录'
} as Config

export default observer(AddressBook)
