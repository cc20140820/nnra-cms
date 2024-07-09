export type TagType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type TagModalType = {
  open: boolean
  record: TagType | undefined
  onClose: (append?: Pick<TagType, "name">) => void
}
