import React from "react"
import { Card, Space, Table, Tag } from "antd"
import type { TableProps } from "antd"
import AdvancedSearchForm from "@/components/AdvancedSearchForm"
import api from "./api"
import { FormTypeEnum } from "@/components/AdvancedSearchForm/type"
import { useRequest } from "ahooks"
import dayjs from "dayjs"

type DataType = {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const Article: React.FC = () => {
  const { data, loading, run } = useRequest(api.getArticles)

  const handleSearch = async (values: Record<string, any>) => {
    run(values)
  }

  const formItems = [
    { type: FormTypeEnum.input, name: "author", label: "Author" },
    { type: FormTypeEnum.input, name: "title", label: "Title" },

    {
      type: FormTypeEnum.select,
      name: "kind",
      label: "KIND",
      options: [
        { label: "op1", value: 1 },
        { label: "op2", value: 2 },
      ],
    },
  ]

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "UID",
      dataIndex: "uid",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag} color={"green"}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <AdvancedSearchForm items={formItems} onSearch={handleSearch} />
      <Card>
        <Table
          rowKey={"uid"}
          loading={loading}
          columns={columns}
          dataSource={data?.data}
        />
      </Card>
    </Space>
  )
}

export default Article
