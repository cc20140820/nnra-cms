export enum FormTypeEnum {
  Input = "Input",
  Select = "Select",
  MultipleSelect = "Multiple_Select",
  RangePicker = "Range_Picker",
}

type SelectOptionType = {
  label: string
  value: string | number
}

export type FormItemType = {
  type: FormTypeEnum
  name: string
  label: string
  options?: SelectOptionType[]
}

export type AdvancedSearchFormProps = {
  items: FormItemType[]
  onSearch: (values: any) => void
}
