export enum FormTypeEnum {
  input = "input",
  select = "select",
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
  onSearch?: (values: Record<string, any>) => void
}
