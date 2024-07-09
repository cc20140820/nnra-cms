export type CategoryType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type CategoryModalType = {
  open: boolean
  record: CategoryType | undefined
  onClose: (append?: Pick<CategoryType, "name">) => void
}
