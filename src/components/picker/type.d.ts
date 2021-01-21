export interface PickerProps {
  close: () => void
  show: boolean
  confirm: (activeTime: PickerData) => void
}

export interface PickerData {
  id: number
  value: string
}

export interface PickerBarProps {
  centerText: string
  confirmClick: () => void
  confirmBtn?: boolean
}
