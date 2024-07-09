export interface PageParams {
  current: number
  pageSize: number
}

export interface Response<T> {
  success: boolean
  data: T
  errorMessage: string
}

export interface ListResponse<T> {
  list: T[]
  current?: number
  pageSize?: number
  total?: number
}
