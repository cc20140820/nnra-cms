import ins from "@/services/instance"
import { PageParams, ListRes } from "@/services/type"
import { ArticleType } from "./type"
import { CategoryType } from "../categories/type"
import { TagType } from "../tags/type"

const Api = {
  getArticles: (params: PageParams): Promise<ListRes<ArticleType>> =>
    ins.post("/book", params),
  getArticleById: (id: string) => ins.get(`/book/${id}`),
  addArticle: (params: ArticleType) => ins.post(`/book/add`, params),
  removeArticle: (id: string) => ins.delete(`/book/${id}`),
  updateArticle: (params: ArticleType) => ins.patch(`/book`, params),

  // other field
  getCategories: (): Promise<CategoryType[]> => ins.get("/category"),
  getTags: (): Promise<TagType[]> => ins.get("/tag"),
}

export default Api
