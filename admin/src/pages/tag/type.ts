export type TagType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type TagModalType = {
  open: boolean
  record: any
  onClose: (append?: Pick<TagType, "name">) => void
}
