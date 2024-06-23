import ins from "@/services/instance"

const Api = {
  getCategories: (params: any) => ins.get("/category", params),
  addCategory: (params: any) => ins.post(`/category`, params),
  removeCategory: (id: string) => ins.delete(`/category/${id}`),
  updateCategory: (params: any) => ins.patch(`/category`, params),
}

export default Api
