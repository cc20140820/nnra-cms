import React, { useState } from "react"
import { DownOutlined } from "@ant-design/icons"
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
  DatePicker,
  TimeRangePickerProps,
} from "antd"
import { AdvancedSearchFormProps, FormItemType, FormTypeEnum } from "./type"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

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

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  ]

  const renderItems = (items: FormItemType[]) => {
    return (
      <>
        {items
          .filter((_, index) => (expand ? true : index < 6))
          .map((item, index) => (
            <Col key={index} span={8}>
              <Form.Item name={item.name} label={item.label}>
                {item.type === FormTypeEnum.Input && <Input />}
                {item.type === FormTypeEnum.Select && (
                  <Select allowClear options={item.options || []} />
                )}
                {item.type === FormTypeEnum.MultipleSelect && (
                  <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    options={item.options || []}
                  />
                )}
                {item.type === FormTypeEnum.RangePicker && (
                  <RangePicker
                    style={{ width: "100%" }}
                    format={"YYYY-MM-DD"}
                    presets={rangePresets}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
      </>
    )
  }

  const onFinish = (values: any) => {
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
              onSearch({})
              form.resetFields()
            }}
          >
            Clear
          </Button>
          {items.length > 6 && (
            <Button
              type={"link"}
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand)
              }}
            >
              <DownOutlined rotate={expand ? 180 : 0} /> Collapse
            </Button>
          )}
        </Space>
      </div>
    </Form>
  )
}

export default AdvancedSearchForm
