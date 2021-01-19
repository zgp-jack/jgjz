export interface ADDRESS_BOOK_LIST {
  name_py:string,
  data: PERSON_DATA[]
}
interface PERSON_DATA {
  id:number,
  name:string,
  tel:string|null,
  name_py:string,
  name_color:string,
  is_deleted:number,
  is_self:number,
  is_in_work_note:number
  is_check:boolean
}