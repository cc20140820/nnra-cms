import { ReactNode } from "react"
import { Typography, Space } from "antd"

const { Title, Paragraph } = Typography

type BasicPageWrapperType = {
  title: string
  desc?: string
  children: ReactNode
}

function BasicPageWrapper(props: BasicPageWrapperType) {
  const { title, desc, children } = props

  return (
    <>
      <Title level={3}>{title}</Title>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Paragraph type="secondary">{desc}</Paragraph>
        {children}
      </Space>
    </>
  )
}

export default BasicPageWrapper
