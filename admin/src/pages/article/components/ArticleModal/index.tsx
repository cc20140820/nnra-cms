import React from "react"
import { Form, Input, Modal, Radio, Select } from "antd"

export type FormValuesType = {
  author: string
  title: string
  category: number
  tags: number[]
  content?: string
}

type ArticleModalType = {
  open: boolean
  onClose: (append?: FormValuesType) => void
}

function ArticleModal(props: ArticleModalType) {
  const { open, onClose } = props
  const [form] = Form.useForm()

  const tagMap = [
    { label: "tag1", value: 1 },
    { label: "tag2", value: 2 },
    { label: "tag3", value: 3 },
    { label: "tag4", value: 4 },
    { label: "tag5", value: 5 },
  ]

  const onCreate = (values: FormValuesType) => {
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
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={1}>category1</Radio>
          <Radio value={2}>category2</Radio>
          <Radio value={3}>category3</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
        <Select mode="multiple" allowClear options={tagMap} />
      </Form.Item>
      <Form.Item name="content" label="Content">
        <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>
    </Modal>
  )
}

export default ArticleModal
