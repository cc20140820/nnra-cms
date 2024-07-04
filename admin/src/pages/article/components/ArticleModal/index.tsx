import React from "react"
import { DatePicker, Form, Input, Modal, Radio, Select } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useArticleMainContext } from "../../hooks/useArticleMain"

export type FormValuesType = {
  author: string
  title: string
  categoryId: string
  tags: number[]
  createdAt: Dayjs | Date
  content?: string
}

function ArticleModal() {
  const { modalOpen, currentRow, categoryMap, tagMap, handleCloseModal } =
    useArticleMainContext()

  const [form] = Form.useForm()

  const onCreate = (values: FormValuesType) => {
    const createdDate = values.createdAt as Dayjs
    values.createdAt = createdDate.toDate()
    handleCloseModal(values)
  }

  return (
    <Modal
      open={modalOpen}
      title="Create a new article"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => handleCloseModal()}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="article_modal"
          initialValues={
            currentRow
              ? { ...currentRow, createdAt: dayjs(currentRow?.createdAt) }
              : null
          }
          onFinish={(values) => onCreate(values)}
          clearOnDestroy
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="createdAt"
        label="Created At"
        rules={[{ required: true }]}
      >
        <DatePicker disabled={!!currentRow} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          {categoryMap.map((v) => (
            <Radio key={v.value} value={v.value}>
              {v.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item name="tagIds" label="Tags" rules={[{ required: true }]}>
        <Select mode="multiple" allowClear options={tagMap} />
      </Form.Item>
      <Form.Item name="content" label="Content">
        <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>
    </Modal>
  )
}

export default ArticleModal
