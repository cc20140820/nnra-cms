import React from "react"
import { Card, Space } from "antd"
import AdvancedSearchForm from "@/components/AdvancedSearchForm"
import AdvancedTable from "@/components/AdvancedTable"
import api from "./api"

const Product: React.FC = () => {
  const handleSearch = async (values: Record<string, any>) => {
    const res = await api.getProductList()
    console.log(res)
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <AdvancedSearchForm onSearch={handleSearch} />
      <Card>
        <AdvancedTable />
      </Card>
      <Card>
        <AdvancedTable />
      </Card>
    </Space>
  )
}

export default Product
