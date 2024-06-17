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
    values.created_at = [
      dayjs(values.created_at[0]).format("YYYY-MM-DD"),
      dayjs(values.created_at[1]).format("YYYY-MM-DD"),
    ]
    run(values)
  }

  const formItems = [
    { type: FormTypeEnum.Input, name: "author", label: "Author" },
    { type: FormTypeEnum.Input, name: "title", label: "Title" },
    {
      type: FormTypeEnum.Select,
      name: "category",
      label: "Category",
      options: [
        { label: "category1", value: 1 },
        { label: "category2", value: 2 },
        { label: "category3", value: 3 },
      ],
    },
    {
      type: FormTypeEnum.MultipleSelect,
      name: "tags",
      label: "Tags",
      options: [
        { label: "tag1", value: 1 },
        { label: "tag2", value: 2 },
        { label: "tag3", value: 3 },
        { label: "tag4", value: 4 },
        { label: "tag5", value: 5 },
      ],
    },
    {
      type: FormTypeEnum.RangePicker,
      name: "created_at",
      label: "Created",
    },
  ]

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
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
