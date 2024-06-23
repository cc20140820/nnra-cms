import ins from "@/services/instance"

const Api = {
  getArticles: (params: any) => ins.get("/tag", params),
  addTag: (params: any) => ins.post(`/tag`, params),
  removeTag: (id: string) => ins.delete(`/tag/${id}`),
  updateTag: (params: any) => ins.patch(`/tag`, params),
}

export default Api
