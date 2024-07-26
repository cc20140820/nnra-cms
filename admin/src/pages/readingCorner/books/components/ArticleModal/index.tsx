import { DatePicker, Form, Input, Modal, Select, Row, Col } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useArticleMainContext } from "../../hooks/useArticleMain"
import { ArticleType } from "../../type"
import { AdvancedUpload } from "@/components"

function ArticleModal() {
  const { modalOpen, currentRow, categoryMap, tagMap, handleCloseModal } =
    useArticleMainContext()

  const [form] = Form.useForm()

  const onCreate = (values: ArticleType) => {
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
      width={"60%"}
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
              : undefined
          }
          onFinish={(values) => onCreate(values)}
          clearOnDestroy
        >
          {dom}
        </Form>
      )}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="createdAt"
            label="Created At"
            rules={[{ required: true }]}
          >
            <DatePicker disabled={!!currentRow} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tagIds" label="Tags" rules={[{ required: true }]}>
            <Select mode="multiple" allowClear options={tagMap} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select allowClear options={categoryMap} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cover" label="Cover" rules={[{ required: true }]}>
            <AdvancedUpload />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="content" label="Content">
        <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>
    </Modal>
  )
}

export default ArticleModal
