import ins from "@/services/instance"
import { TagType } from "./type"

const Api = {
  getTags: (): Promise<TagType[]> => ins.get("/tag"),
  addTag: (data: Pick<TagType, "name">) => ins.post(`/tag`, data),
  removeTag: (id: string) => ins.delete(`/tag/${id}`),
  updateTag: (params: Pick<TagType, "name" | "id">) =>
    ins.patch(`/tag`, params),
}

export default Api
