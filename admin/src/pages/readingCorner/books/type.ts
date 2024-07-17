import { Dayjs } from "dayjs"

export type ArticleType = {
  id: string
  author: string
  title: string
  categoryId: string
  tagIds: string[]
  createdAt: Dayjs | Date
  content: string
}

export type ArticleSearchType = {
  author: string
  title: string
  categoryId: string
  tagIds: string[]
  createdAt: (Dayjs | Date)[] | string[]
}
