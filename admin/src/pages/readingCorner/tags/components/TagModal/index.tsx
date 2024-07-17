import React from "react"
import { Form, Input, Modal, ColorPicker } from "antd"
import { TagModalType, TagModalValueType } from "../../type"
import { Color } from "antd/es/color-picker/color"

function TagModal(props: TagModalType) {
  const { open, record, onClose } = props
  const [form] = Form.useForm()

  const onCreate = (values: TagModalValueType) => {
    values.color = (values.color as Color).toHexString()
    onClose(values)
  }

  const initialValues = {
    name: record?.name,
    color: record?.color,
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
          initialValues={initialValues}
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
      <Form.Item name="color" label="Color" rules={[{ required: true }]}>
        <ColorPicker showText />
      </Form.Item>
    </Modal>
  )
}

export default TagModal
