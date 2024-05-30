import React, { useState } from "react"
import { DownOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row, Select, Space, theme } from "antd"

const { Option } = Select

type AdvancedSearchFormProps = {
  onSearch?: (values: Record<string, any>) => void
}

const AdvancedSearchForm = (props: AdvancedSearchFormProps) => {
  const { onSearch } = props
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgBase,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const getFields = () => {
    const count = expand ? 10 : 6
    const children = []
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  // required: true,
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  // required: true,
                  message: "Select something!",
                },
              ]}
              initialValue="1"
            >
              <Select>
                <Option value="1">111</Option>
                <Option value="2">222</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      )
    }
    return children
  }

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    onSearch?.(values)
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <div style={{ textAlign: "right" }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields()
            }}
          >
            Clear
          </Button>
          <Button
            type={"link"}
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </Button>
        </Space>
      </div>
    </Form>
  )
}

export default AdvancedSearchForm
