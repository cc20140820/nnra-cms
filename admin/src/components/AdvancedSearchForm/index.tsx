import React, { useState } from "react"
import { DownOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row, Select, Space, theme } from "antd"
import { AdvancedSearchFormProps, FormItemType } from "./type"

const { Option } = Select

const AdvancedSearchForm = (props: AdvancedSearchFormProps) => {
  const { items, onSearch } = props
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgBase,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  }

  const renderItems = (items: FormItemType[]) => {
    return (
      <>
        {items.map((item, index) => (
          <Col key={index} span={6}>
            <Form.Item name={item.name} label={item.label}>
              {item.type === "input" && <Input placeholder="placeholder" />}
              {item.type === "select" && (
                <Select>
                  {(item.options || []).map((op, i) => (
                    <Option key={i} value={op.value}>
                      {op.label}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        ))}
      </>
    )
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
      <Row gutter={24}>{renderItems(items)}</Row>
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
