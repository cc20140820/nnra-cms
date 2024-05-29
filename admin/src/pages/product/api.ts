import ins from "@/services/instance"

const Api = {
  getProductList: () => ins.get("/posts"),
}

export default Api
