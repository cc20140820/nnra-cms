import React, { useState } from "react"
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Divider,
  Modal,
  Typography,
} from "antd"
import type { TableProps } from "antd"
import CategoryModal from "./components/CategoryModal"
import { useRequest } from "ahooks"
import { CategoryType } from "./type"
import api from "./api"

const { Paragraph } = Typography

const Category: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<CategoryType | undefined>(
    undefined
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, contextModal] = Modal.useModal()

  const { data, loading, refresh } = useRequest(api.getCategories)

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: Pick<CategoryType, "name">) => {
    if (append) {
      currentRow
        ? await api.updateCategory({ ...append, id: currentRow.id })
        : await api.addCategory(append)
      refresh()
    }
    setCurrentRow(undefined)
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Are you sure?",
      content: `You will delete record ${id}`,
      onOk: async () => {
        await api.removeCategory(id)
        refresh()
      },
    })
    return
  }

  const handleEdit = (record: CategoryType) => {
    setModalOpen(true)
    setCurrentRow(record)
  }

  const columns: TableProps<CategoryType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      // width: "30%",
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
        <Paragraph type="secondary">
          We hope you are making progress on your project! Feel free to read the
          latest news about Strapi. We are giving our best to improve the
          product based on your feedback.
        </Paragraph>
        <Card>
          <Space direction="vertical" style={{ display: "flex" }}>
            <Row justify={"end"}>
              <Col>
                <Space>
                  <Button onClick={refresh}>Reload</Button>
                  <Button type="primary" onClick={handleCreate}>
                    New
                  </Button>
                </Space>
              </Col>
            </Row>
            <Table
              rowKey={"id"}
              loading={loading}
              columns={columns}
              dataSource={data}
            />
          </Space>
        </Card>
      </Space>
      {contextModal}
      <CategoryModal
        open={modalOpen}
        record={currentRow}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Category
