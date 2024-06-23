import React from "react"
import { Form, Input, Modal } from "antd"

export type FormValuesType = {
  name: string
}

type ArticleModalType = {
  open: boolean
  record: any
  onClose: (append?: FormValuesType) => void
}

function TagModal(props: ArticleModalType) {
  const { open, record, onClose } = props
  const [form] = Form.useForm()

  const onCreate = (values: FormValuesType) => {
    onClose(values)
  }

  return (
    <Modal
      open={open}
      title="Create a new tag"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => onClose()}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="tag_modal"
          initialValues={record}
          onFinish={(values) => onCreate(values)}
          clearOnDestroy
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Modal>
  )
}

export default TagModal
