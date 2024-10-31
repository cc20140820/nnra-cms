import ins from "@/services/instance"
import { CategoryType } from "./type"

const Api = {
  getCategories: (): Promise<CategoryType[]> => ins.get("/category"),
  addCategory: (data: Pick<CategoryType, "name">) =>
    ins.post(`/category`, data),
  removeCategory: (id: string) => ins.delete(`/category/${id}`),
  updateCategory: (data: Pick<CategoryType, "name" | "id">) =>
    ins.patch(`/category`, data),
}

export default Api
