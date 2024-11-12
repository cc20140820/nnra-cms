import { Color } from "antd/es/color-picker"

export type TagType = {
  id: string
  name: string
  color: Color | string
  createdAt: string
  updatedAt: string
}

export type TagModalValueType = Pick<TagType, "name" | "color">

export type TagModalType = {
  open: boolean
  record: TagType | undefined
  onClose: (append?: TagModalValueType) => void
}
