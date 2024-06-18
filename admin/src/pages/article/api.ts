import ins from "@/services/instance"

const Api = {
  getArticles: (params: any) => ins.post("/articles", params),
  getArticleByUid: (uid: string) => ins.get(`/articles/${uid}`),
  addArticle: (params: any) => ins.post(`/articles/add`, params),
}

export default Api
