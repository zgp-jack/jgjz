import Taro, { useState, useEffect, Config, eventCenter, useRouter } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Selectd from './components/selected/index'
import Search from './components/search/index'
import { IMGCDNURL, ADDRESSBOOKTYPE_ALONE, ADDRESSBOOKTYPE_LEAVE, ADDRESSBOOKTYPE_GROUP } from '@/config/index'
import { AddressBookConfirmEvent } from '@/config/events'
import { ADDRESS_BOOK_LIST, PERSON_DATA, ADD_PERSON_PARAMS } from './index.d'
import { InputValue } from '@/components/popup/index.d'
import classnames from 'classnames'
import msg from '@/utils/msg'
import { getWorkers, postAdd_Person, deletedPerson, editWordkerInfo } from './api'
import PromptBox from '@/components/popup/index'
import './index.scss'
import {objDeepCopy} from '@/utils/index'


export default function AddressBook() {

  // 获取当前显示的类型 默认个人选择
  const router = useRouter()
  const { type = ADDRESSBOOKTYPE_GROUP, id ,data } = router.params

  /** 通信录列表数据 */
  const [list, setList] = useState<ADDRESS_BOOK_LIST[]>([])
  /** 已选择的工友 */
  const [selectd, setSelectd] = useState<PERSON_DATA[]>([])
  useEffect(() => {
    console.log(id)
    if (!id) return
    /** 获取所有通讯录列表 */
    /** 保存一份获取到的数据 */
    getWorkers({ work_note: id }).then((res) => {
      let newData: PERSON_DATA[] = JSON.parse(data)
      //如果上一个 页面有 传数据 过来
      if (newData) {
        //上一个页面传过来的数据 默认选中
        let newListData = res.data
        newListData.map((Pitem,Pindex)=>{
          Pitem.data.map((Citem, Cindex)=>{
            newData.map((dataItem)=>{
              if (Citem.id == dataItem.id) {
                newListData[Pindex].data[Cindex].is_check = true
              }
            })
          })
        })
        //上一个页面传过来的数据 默认选中
        let newSelectd:PERSON_DATA[] = []
        newData.map((dataItem)=>{
          newSelectd.push(dataItem)
        })
        setSelectd(newSelectd)
        setList(newListData)
      }
    })

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
  /** 点击字母跳转相应位置 */
  const toView = (viewId: string) => {
    setViewTo(viewId == "view#" ? 'view_' : viewId)
  }
  /** 选中或者取消选中 */
  const selectItem = (pIndex: number, cIndex: number, isInNote: number) => {
    // 判断是单选 则拿到当前数据然后退出
    if (type === ADDRESSBOOKTYPE_ALONE) {
      let data: PERSON_DATA = list[pIndex].data[cIndex]
      eventCenter.trigger(AddressBookConfirmEvent, [data])
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
        cItem.is_in_work_note == 0 ? onWorkLen++ : ''
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
  /**随机选择一个颜色*/
  const randomColor = (): string => {
    let colors: string[] = ['#58C7FF', '#74E8D5', '#A4BFFF', '#79BAFF', '#4ECBF4']
    return colors[Math.floor(Math.random() * 5)]
  }
  /** 添加工友弹窗确定 */
  const addConfirm = (data: InputValue) => {
    if (data.name) {
      setAddPopupShow(false)
    } else {
      msg("请填写工人名称")
      return
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
        pushNewPerson(newPersonData)
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
  const bossEditWorkerinfo = (i: number, data: PERSON_DATA) => {
    setEditItemData(data)
    setIsShowEdit(true)
  }
  /** 修改工友-接口请求 */
  const editWorkerConfirm = (data: InputValue) => {
    editWordkerInfo(editItemData.id, { name: data.name, tel: data.tel || '' }).then(res => {
      msg(res.message)
      if (res.code != 0) {
        return
      }
      setIsShowEdit(false)
      /** 所有工友数据 */
      let newList: ADDRESS_BOOK_LIST[] = [...list]
      /** 现有的字母表 */
      let modernLetter: string[] = []
      newList.map((item) => {
        modernLetter.push(item.name_py)
      })
      /** 修改后的数据 */
      let newWorkerInfo: PERSON_DATA = JSON.parse(JSON.stringify(editItemData))
      newWorkerInfo.name = data.name
      newWorkerInfo.tel = data.tel
      newWorkerInfo.name_py = res.data.name_py
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
              newList[modernLetter.indexOf(res.data.name_py)].data.push(newWorkerInfo)
              if (newList[Pindex].data.length < 1) {
                newList.splice(Pindex, 1)
              }
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
    })
  }
  /** 删除事件 */
  const deletPerson = () => {
    let workId = {
      id: editItemData.id
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
        setSelectd(newSelectd)
      }
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
    let lists: ADDRESS_BOOK_LIST[] = objDeepCopy(list)
    let _lists: PERSON_DATA[] = []
    lists.forEach(item => {
      let items: PERSON_DATA[] = item.data
      for (let i = 0; i < items.length; i++) {
        let data: PERSON_DATA = items[i]
        if (data.name.indexOf(val) !== -1) {
          _lists = [..._lists, data]
        }
      }
    })
    setFilterList(_lists)
  }
  // 搜索后的数据 选择
  const filterSelect = (index: number, id: number) => {
    let newSelectd = [...selectd]
    let newList = [...list]
    let newFilterList = [...filterList]
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
    setFilterList(newFilterList)
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
  /** 确定提交 */
  const submitSelect = () => {
    eventCenter.trigger(AddressBookConfirmEvent, selectd)
    Taro.navigateBack()
  }

  return (
    <View className="AddressBook">
      {/* 已选中工友 */}
      {type !== ADDRESSBOOKTYPE_ALONE && <Selectd selectd={selectd} deletePerson={deletePerson} />}

      {/* 搜索组件 */}
      <Search addClick={showAddPopup} onSearch={(val) => userSearchAction(val)} value={value} />
      {/* 通讯录列表 */}
      <ScrollView scrollY scrollIntoView={viewTo} scrollWithAnimation className={classnames({
        "list_content": true,
        "list_content-alone": type === ADDRESSBOOKTYPE_ALONE,
      })} >
        {list.map((pItem, pIndex) => (
          <View className="item" key={pItem.name_py} id={pItem.name_py == "#" ? 'view_' : 'view' + pItem.name_py}>
            <Text className="title">{pItem.name_py}</Text>
            {pItem.data.map((cItem, cIndex) => (
              <View className="item_person" key={cItem.id}>
                <View className="left" onClick={() => selectItem(pIndex, cIndex, cItem.is_in_work_note)}>

                  {/* 只有当 type 非个人的时候 才会有图片选择   // 判断是否已经在账本中 默认选中 再判断是否已经选中 */}
                  {type !== ADDRESSBOOKTYPE_ALONE && <Image className='item_checkbox' src={cItem.is_in_work_note ? `${disableCheckImg}` : cItem.is_check ? `${onCheckdImg}` : `${normalCheckImg}`} />}

                  <View className="avatar" style={{ background: cItem.name_color }}>{cItem.name.substring(0, 2)}</View>
                  <View className="name_tle">
                    <Text className="name">{cItem.name}</Text>
                    {cItem.tel && <Text className="tel">{cItem.tel}</Text>}
                  </View>
                </View>
                <View className="setting">
                  <Image className="setting_img" src={`${IMGCDNURL}ws/setting.png`} onClick={(e) => { e.stopPropagation(); bossEditWorkerinfo(cIndex, cItem) }} ></Image>
                </View>
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
              <View className="left" onClick={() => filterSelect(pIndex, item.id)}>

                {/* 只有当 type 非个人的时候 才会有图片选择   // 判断是否已经在账本中 默认选中 再判断是否已经选中 */}
                {type !== ADDRESSBOOKTYPE_ALONE &&
                  <Image className='item_checkbox'
                    src={item.is_in_work_note ? `${disableCheckImg}` : item.is_check ? `${onCheckdImg}` : `${normalCheckImg}`}
                  />}

                <View className="avatar" style={{background: item.name_color}}>{item.name.substring(0, 2)}</View>
                <View className="name_tle">
                  <Text className="name">{item.name}</Text>
                  {item.tel && <Text className="tel">{item.tel}</Text>}
                </View>
              </View>
              <View className="setting">
                <Image className="setting_img" src={`${IMGCDNURL}ws/setting.png`} onClick={(e) => {
                  e.stopPropagation();
                }}></Image>
              </View>
            </View>
          ))
          }
        </ScrollView>}


      {/* 右侧字母表 */}
      <View className="right_nav">
        {list.map((item) => (
          <Text className='right-nav-text' key={item.name_py} onClick={() => toView('view' + item.name_py)}>{item.name_py}</Text>
        ))}
      </View>
      {/* 底部组件 当非个人类型时显示 */}
      {type !== ADDRESSBOOKTYPE_ALONE &&
        <View className="bottom_all">
          <View className="bottom_all_box" onClick={() => allSelect()}>
            <Image className="bottom_all_img" src={isAllSelect ? `${IMGCDNURL}ws/ckeckd.png` : `${IMGCDNURL}ws/check.png`} />
            <Text className="bottom_all_text" >全选</Text>
          </View>
          <View className="button" onClick={() => submitSelect()}>
            确定（{selectd.length}人）
          </View>
        </View>}
      {/* // 添加工友组件 */}
      {addPopupShow && <PromptBox
        titleText="添加工友"
        showTitleButton={false}
        confirmText="确定"
        inputGroup={[
          {name: 'name', title: "姓名（必填）", placeholder: '请输入对方的姓名', value: ''},
          {name: 'tel', title: "电话号码", placeholder: '请输入对方的电话号码(可不填)', value: ''}
        ]}
        confirm={(data) => addConfirm(data)}
        cancel={addCancel}
      ></PromptBox>}

      {/* // 修改工友组件 */}
      {isShowEdit && <PromptBox
        titleText="修改工友"
        confirmText="确定"
        inputGroup={[
          {name: 'name', title: "姓名（必填）", placeholder: '请输入对方的姓名', value: editItemData.name},
          {name: 'tel', title: "电话号码", placeholder: '请输入对方的电话号码(可不填)', value: editItemData.tel}
        ]}
        confirm={(data) => editWorkerConfirm(data)}
        cancel={() => setIsShowEdit(false)}
        delet={() => deletPerson()}
      ></PromptBox>}
    </View>
  )
}

AddressBook.config = {
  navigationBarTitleText: '选择需要添加的工友'
} as Config
