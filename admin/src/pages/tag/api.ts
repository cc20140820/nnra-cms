import ins from "@/services/instance"

const Api = {
  getArticles: (params: any) => ins.post("/tag", params),
  addTag: (params: any) => ins.post(`/tag/add`, params),
  removeTag: (id: string) => ins.delete(`/tag/${id}`),
  updateTag: (params: any) => ins.patch(`/tag`, params),
}

export default Api
