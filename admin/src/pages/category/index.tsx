import React, { useState } from "react"
import { Button, Card, Col, Row, Space, Table, Divider, Modal } from "antd"
import type { TableProps } from "antd"
import CategoryModal, { FormValuesType } from "./components/CategoryModal"
import { useRequest } from "ahooks"
import api from "./api"

type DataType = {
  id: string
  tagIds: string[]
}

const PAGE_SIZE = 10

const Category: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const { data, loading, refresh } = useRequest(api.getCategories)

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: FormValuesType) => {
    if (append) {
      currentRow
        ? await api.updateCategory({ ...append, id: currentRow.id })
        : await api.addCategory(append)
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
        await api.removeCategory(id)
        refresh()
      },
    })
    return
  }

  const handleEdit = (record: any) => {
    setModalOpen(true)
    setCurrentRow(record)
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      width: "30%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
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
                pageSize: PAGE_SIZE,
              }}
            />
          </Space>
        </Card>
      </Space>
      {contextHolder}
      <CategoryModal
        open={modalOpen}
        record={currentRow}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Category
