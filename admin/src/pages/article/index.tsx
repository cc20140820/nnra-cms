import React from "react"
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Divider,
  Typography,
} from "antd"
import type { TableProps } from "antd"
import dayjs from "dayjs"
import AdvancedSearchForm from "@/components/AdvancedSearchForm"
import { FormTypeEnum } from "@/components/AdvancedSearchForm/type"
import ArticleModal from "./components/ArticleModal"
import {
  ArticleMainProvider,
  useArticleMainContext,
} from "./hooks/useArticleMain"
import { PAGE_SIZE } from "./constant"

const { Paragraph } = Typography

type RecordType = {
  id: string
  author: string
  title: string
  categoryId: string
  tagIds: string[]
  content: string
  createdAt: string
}

const Article: React.FC = () => {
  const {
    categoryMap,
    tagMap,
    currentPage,
    data,
    loading,
    contextModal,
    handleSearch,
    handleCreate,
    handlePageChange,
    handleEdit,
    handleDelete,
  } = useArticleMainContext()

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
      options: tagMap,
    },
    {
      type: FormTypeEnum.RangePicker,
      name: "createdAt",
      label: "Created",
    },
  ]

  const columns: TableProps<RecordType>["columns"] = [
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
        {/* AdvancedSearchForm属于应用级别的业务组件，故不采用context */}
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
      {contextModal}
      <ArticleModal />
    </>
  )
}

const EnhancedArticle: React.FC = () => {
  return (
    <ArticleMainProvider>
      <Article />
    </ArticleMainProvider>
  )
}

export default EnhancedArticle
