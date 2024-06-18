import React from "react"
import { DatePicker, Form, Input, Modal, Radio, Select } from "antd"
import dayjs, { Dayjs } from "dayjs"

export type FormValuesType = {
  author: string
  title: string
  categoryId: number
  tags: number[]
  createdAt: Dayjs | Date
  content?: string
}

type ArticleModalType = {
  open: boolean
  record: any
  onClose: (append?: FormValuesType) => void
}

const tagMap = [
  { label: "tag1", value: 1 },
  { label: "tag2", value: 2 },
  { label: "tag3", value: 3 },
  { label: "tag4", value: 4 },
  { label: "tag5", value: 5 },
]

function ArticleModal(props: ArticleModalType) {
  const { open, record, onClose } = props
  const [form] = Form.useForm()

  const onCreate = (values: FormValuesType) => {
    const createdDate = values.createdAt as Dayjs
    values.createdAt = createdDate.toDate()
    onClose(values)
  }

  return (
    <Modal
      open={open}
      title="Create a new article"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => onClose()}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="article_modal"
          initialValues={
            record ? { ...record, createdAt: dayjs(record?.createdAt) } : null
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
        <DatePicker disabled={!!record} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value={1}>category1</Radio>
          <Radio value={2}>category2</Radio>
          <Radio value={3}>category3</Radio>
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
