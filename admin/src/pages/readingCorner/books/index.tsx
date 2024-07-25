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
  Image,
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
import { ArticleType } from "./type"
import { STATIC_URL_PREFIX } from "@/utils/constant"
import { useTranslation } from "react-i18next"

const { Paragraph } = Typography

const Article: React.FC = () => {
  const { t, i18n } = useTranslation()

  const {
    categoryMap,
    tagMap,
    currentPage,
    data,
    loading,
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

  const columns: TableProps<ArticleType>["columns"] = [
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Cover",
      dataIndex: "cover",
      render: (text) => (
        <Image width={80} src={`${STATIC_URL_PREFIX}${text}`} />
      ),
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
          {tagIds.map((tagId) => {
            const label = tagMap.find((v) => v.value === tagId)?.label
            const color = tagMap.find((v) => v.value === tagId)?.color
            return (
              <Tag key={tagId} color={color}>
                {label}
              </Tag>
            )
          })}
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
        <Paragraph type="secondary">{t("Welcome to React")}</Paragraph>
        {/* AdvancedSearchForm属于业务组件，故不采用context */}
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
              dataSource={data?.list}
              pagination={{
                total: data?.total,
                current: currentPage,
                pageSize: PAGE_SIZE,
                onChange: handlePageChange,
              }}
            />
          </Space>
        </Card>
      </Space>
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
