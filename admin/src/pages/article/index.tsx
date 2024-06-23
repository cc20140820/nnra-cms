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
import { useRequest } from "ahooks"
import dayjs from "dayjs"
import AdvancedSearchForm from "@/components/AdvancedSearchForm"
import { FormTypeEnum } from "@/components/AdvancedSearchForm/type"
import ArticleModal, { FormValuesType } from "./components/ArticleModal"
import api from "./api"

const { Paragraph } = Typography

type DataType = {
  id: string
  tagIds: string[]
}

const PAGE_SIZE = 10

const Article: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useState({})
  const [categoryMap, setCategoryMap] = useState<
    { label: string; value: string }[]
  >([])
  const [tagMap, setTagMap] = useState<{ label: string; value: string }[]>([])
  const [currentRow, setCurrentRow] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const { data, loading, run, refresh } = useRequest(api.getArticles, {
    defaultParams: [{ current: 1, pageSize: PAGE_SIZE }],
    onSuccess: (_, [params]) => {
      setCurrentPage(params.current)
    },
  })

  useRequest(api.getCategories, {
    onSuccess: (data) => {
      const res = data?.data?.list.map((v: any) => ({
        label: v.name,
        value: v.id,
      }))
      setCategoryMap(res)
    },
  })

  useRequest(api.getTags, {
    onSuccess: (data) => {
      const res = data?.data?.list.map((v: any) => ({
        label: v.name,
        value: v.id,
      }))
      setTagMap(res)
    },
  })

  const handleSearch = async (values: Record<string, any>) => {
    if (Array.isArray(values.createdAt) && values.createdAt.length > 0) {
      values.createdAt = [
        dayjs(values.createdAt[0]).format("YYYY-MM-DD"),
        dayjs(values.createdAt[1]).format("YYYY-MM-DD"),
      ]
    }
    setSearchParams(values)
    run({ ...values, current: 1, pageSize: PAGE_SIZE })
  }

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: FormValuesType) => {
    if (append) {
      currentRow
        ? await api.updateArticle({ ...append, id: currentRow.id })
        : await api.addArticle(append)
      refresh()
    }
    setCurrentRow(null)
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Are you sure?",
      content: `You will delete record ${id}`,
      onOk: async () => {
        await api.removeArticle(id)
        refresh()
      },
    })
    return
  }

  const handleEdit = (record: any) => {
    setModalOpen(true)
    setCurrentRow(record)
  }

  const handlePageChange = (current: number, pageSize: number) => {
    run({ ...searchParams, current, pageSize })
  }

  const formItems = [
    { type: FormTypeEnum.Input, name: "author", label: "Author" },
    { type: FormTypeEnum.Input, name: "title", label: "Title" },
    {
      type: FormTypeEnum.Select,
      name: "categoryId",
      label: "Category",
      options: categoryMap,
    },
    {
      type: FormTypeEnum.MultipleSelect,
      name: "tagIds",
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
      name: "createdAt",
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
      render: (text) => categoryMap.find((v) => v.value === text)?.label,
    },
    {
      title: "Tags",
      dataIndex: "tagIds",
      render: (_, { tagIds }) => (
        <>
          {tagIds.map((tagId) => (
            <Tag key={tagId} color={"green"}>
              {tagMap.find((v) => v.value === tagId)?.label}
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
      title: "Created",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
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
              dataSource={data?.data?.list}
              pagination={{
                total: data?.data?.total,
                current: currentPage,
                pageSize: PAGE_SIZE,
                onChange: handlePageChange,
              }}
            />
          </Space>
        </Card>
      </Space>
      {contextHolder}
      <ArticleModal
        open={modalOpen}
        record={currentRow}
        categoryMap={categoryMap}
        tagMap={tagMap}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Article
