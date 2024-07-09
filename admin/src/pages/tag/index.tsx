import React, { useState } from "react"
import { Button, Card, Col, Row, Space, Table, Divider, Modal } from "antd"
import type { TableProps } from "antd"
import { useRequest } from "ahooks"
import { TagType } from "./type"
import TagModal from "./components/TagModal"
import api from "./api"

const PAGE_SIZE = 10

const Tag: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentRow, setCurrentRow] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, contextModal] = Modal.useModal()

  const { data, loading, run, refresh } = useRequest(api.getTags, {
    defaultParams: [{ current: 1, pageSize: PAGE_SIZE }],
    onSuccess: (_, [params]) => {
      setCurrentPage(params.current)
    },
  })

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: Pick<TagType, "name">) => {
    if (append) {
      currentRow
        ? await api.updateTag({ ...append, id: currentRow.id })
        : await api.addTag(append)
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
        await api.removeTag(id)
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
    run({ current, pageSize })
  }

  const columns: TableProps<TagType>["columns"] = [
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
                <Space>
                  <Button onClick={refresh}>Refresh</Button>
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
      {contextModal}
      <TagModal
        open={modalOpen}
        record={currentRow}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default Tag
