import React, { useState } from "react"
import { Button, Card, Col, Row, Space, Table, Divider, App } from "antd"
import type { TableProps } from "antd"
import { useRequest } from "ahooks"
import { TagType, TagModalValueType } from "./type"
import TagModal from "./components/TagModal"
import { BasicPageWrapper } from "@/components"
import api from "./api"

const Tag: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<TagType | undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false)
  const { modal } = App.useApp()

  const { data, loading, refresh } = useRequest(api.getTags)

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: TagModalValueType) => {
    if (append) {
      currentRow
        ? await api.updateTag({ ...append, id: currentRow.id })
        : await api.addTag(append)
      refresh()
    }
    setCurrentRow(undefined)
    setModalOpen(false)
  }

  const handleDelete = (record: TagType) => {
    modal.confirm({
      title: "Are you sure?",
      content: `You will delete tag ${record?.name}`,
      onOk: async () => {
        await api.removeTag(record?.id)
        refresh()
      },
    })
    return
  }

  const handleEdit = (record: TagType) => {
    setModalOpen(true)
    setCurrentRow(record)
  }

  const columns: TableProps<TagType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Color",
      dataIndex: "color",
      width: "30%",
      render: (text) => (
        <Space>
          <div style={{ width: 12, height: 12, backgroundColor: text }}></div>
          {text}
        </Space>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <BasicPageWrapper
      title="Tags"
      desc="pe you are making progress on your project! Feel free to read the
          latest news about Strapi. We are giving our best to improve the
          product based on your feedback."
    >
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
      <TagModal
        open={modalOpen}
        record={currentRow}
        onClose={handleCloseModal}
      />
    </BasicPageWrapper>
  )
}

export default Tag
