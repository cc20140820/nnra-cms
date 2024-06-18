import ins from "@/services/instance"

const Api = {
  getArticles: (params: any) => ins.post("/articles", params),
  getArticleById: (id: string) => ins.get(`/articles/${id}`),
  addArticle: (params: any) => ins.post(`/articles/add`, params),
  removeArticle: (id: string) => ins.delete(`/articles/${id}`),
  updateArticle: (params: any) => ins.patch(`/articles`, params),
}

export default Api
