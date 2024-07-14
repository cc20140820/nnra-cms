import ins from "@/services/instance"
import { PageParams, ListRes } from "@/services/type"
import { ArticleType } from "./type"
import { CategoryType } from "../category/type"
import { TagType } from "../tag/type"

const Api = {
  getArticles: (params: PageParams): Promise<ListRes<ArticleType>> =>
    ins.post("/articles", params),
  getArticleById: (id: string) => ins.get(`/articles/${id}`),
  addArticle: (params: ArticleType) => ins.post(`/articles/add`, params),
  removeArticle: (id: string) => ins.delete(`/articles/${id}`),
  updateArticle: (params: ArticleType) => ins.patch(`/articles`, params),

  // other field
  getCategories: (): Promise<CategoryType[]> => ins.get("/category"),
  getTags: (): Promise<TagType[]> => ins.get("/tag"),
}

export default Api
