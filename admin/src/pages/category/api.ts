import ins from "@/services/instance"

const Api = {
  getCategories: (params: any) => ins.post("/category", params),
  addCategory: (params: any) => ins.post(`/category/add`, params),
  removeCategory: (id: string) => ins.delete(`/category/${id}`),
  updateCategory: (params: any) => ins.patch(`/category`, params),
}

export default Api
