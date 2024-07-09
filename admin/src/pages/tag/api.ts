import ins from "@/services/instance"
import { PageParams, ListResponse } from "@/services/type"
import { TagType } from "./type"

const Api = {
  getTags: (params: PageParams): Promise<ListResponse<TagType>> => {
    return ins.get("/tag", { params })
  },
  addTag: (data: Pick<TagType, "name">) => ins.post(`/tag`, data),
  removeTag: (id: string) => ins.delete(`/tag/${id}`),
  updateTag: (params: Pick<TagType, "name" | "id">) =>
    ins.patch(`/tag`, params),
}

export default Api
