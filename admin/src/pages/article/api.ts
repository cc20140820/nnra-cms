import ins from "@/services/instance"

const Api = {
  getArticles: (params: any) => ins.post("/articles", params),
  getArticleByUid: (uid: string) => ins.get(`/articles/${uid}`),
}

export default Api
