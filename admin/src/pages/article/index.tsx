import React, { useState } from "react"
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Divider,
  Modal,
  Typography,
} from "antd"
import type { TableProps } from "antd"
import AdvancedSearchForm from "@/components/AdvancedSearchForm"
import api from "./api"
import { FormTypeEnum } from "@/components/AdvancedSearchForm/type"
import ArticleModal, { FormValuesType } from "./components/ArticleModal"
import { useRequest } from "ahooks"
import dayjs from "dayjs"

const { Text, Paragraph } = Typography

type DataType = {
  id: string
  tagIds: string[]
}

const Article: React.FC = () => {
  const [searchParams, setSearchParams] = useState({})
  const [currentRow, setCurrentRow] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const { data, loading, run } = useRequest(api.getArticles)

  const handleSearch = async (values: Record<string, any>) => {
    if (values.created_at[0] && values.created_at[1]) {
      values.created_at = [
        dayjs(values.created_at[0]).format("YYYY-MM-DD"),
        dayjs(values.created_at[1]).format("YYYY-MM-DD"),
      ]
    }
    setSearchParams(values)
    run(values)
  }

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: FormValuesType) => {
    if (append) {
      currentRow
        ? await api.updateArticle({ ...append, id: currentRow.id })
        : await api.addArticle(append)
      run(searchParams)
    }
    setCurrentRow(null)
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Delete record",
      content: "Are you sure?",
      onOk: async () => {
        await api.removeArticle(id)
        run(searchParams)
      },
    })
    return
  }

  const handleEdit = (record: any) => {
    setModalOpen(true)
    setCurrentRow(record)
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
      dataIndex: "categoryId",
    },
    {
      title: "Tags",
      dataIndex: "tagIds",
      render: (_, { tagIds }) => (
        <>
          {tagIds.map((tagId) => (
            <Tag key={tagId} color={"green"}>
              {tagId}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      width: "30%",
      render: (text) => <Paragraph ellipsis={{ rows: 2 }}>{text}</Paragraph>,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <AdvancedSearchForm items={formItems} onSearch={handleSearch} />
        <Card>
          <Space direction="vertical" style={{ display: "flex" }}>
            <Row justify={"end"}>
              <Col>
                <Button type="primary" onClick={handleCreate}>
                  New
                </Button>
              </Col>
            </Row>
            <Table
              rowKey={"id"}
              loading={loading}
              columns={columns}
              dataSource={data?.data}
            />
          </Space>
        </Card>
      </Space>
      {contextHolder}
      <ArticleModal
        open={modalOpen}
        record={currentRow}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Article
