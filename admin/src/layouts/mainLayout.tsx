import React, { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Layout, Menu, theme, Typography } from "antd"

const { Title } = Typography
const { Header, Content, Sider } = Layout
type MenuItem = Required<MenuProps>["items"][number] & {
  children: { key: string; label: string }[]
}

const menus: MenuItem[] = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "one", label: "Dashboard" },
      { key: "two", label: "Option 2" },
      { key: "three", label: "Option 3" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "four", label: "Option 4" },
      { key: "five", label: "Option 5" },
    ],
  },
]

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const navigate = useNavigate()
  let location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [pageName, setPageName] = useState("")

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`)
  }

  useEffect(() => {
    const key = location.pathname.replace("/", "")
    const parentKey = menus.find(
      (menu) => menu?.children.findIndex((child) => child.key === key) > -1
    )?.key as string
    const pageLabel =
      menus
        .find((menu) => menu.key === parentKey)
        ?.children.find((sub) => sub.key === key)?.label || ""
    setSelectedKeys([key])
    setOpenKeys([parentKey])
    setPageName(pageLabel)
  }, [location])

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div
          className="demo-logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ height: 50 }}
            src={process.env.PUBLIC_URL + "/lion.svg"}
            alt="logo"
          />
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            onSelect={({ selectedKeys }: Record<string, any>) =>
              setSelectedKeys(selectedKeys)
            }
            openKeys={openKeys}
            onOpenChange={(_openKeys: string[]) => setOpenKeys(_openKeys)}
            style={{ height: "100%", borderRight: 0 }}
            items={menus}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Title level={3}>{pageName}</Title>
          <Content
            style={{
              // padding: 24,
              margin: 0,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
