import React, { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  AppstoreOutlined,
  MailOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  theme,
  Typography,
  Space,
  ConfigProvider,
} from "antd"
import styles from "./mainLayout.module.css"

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
    token: { colorBgContainer, colorBgBase },
  } = theme.useToken()
  const navigate = useNavigate()
  let location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [pageName, setPageName] = useState("")
  const [isDark, setIsDark] = useState(false)

  const userOptions: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => navigate("/login")}>Logout</a>,
    },
  ]

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`)
  }

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
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
    <ConfigProvider
      theme={{
        token: {},
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Layout: {
            // headerBg: "#ffffff",
            headerBg: "transparent",
            bodyBg: "transparent",
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100%" }}>
        <Sider
          width={240}
          style={{
            background: colorBgContainer,
            position: "fixed",
            overflow: "auto",
          }}
          className={styles.siderMenu}
        >
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

        <Layout style={{ marginLeft: 240 }}>
          <Header
            style={{
              // height: layout?.header?.heightLayoutHeader || 56,
              // lineHeight: `${
              //   token.layout?.header?.heightLayoutHeader || 56
              // }px`,
              backgroundColor: "transparent",
              zIndex: 0,
            }}
          />
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "fixed",
              width: "100%",
              zIndex: 10,
              insetBlockStart: 0,
              insetInlineEnd: 0,
              borderBlockEnd: "1px solid rgba(5,5,5,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ height: 46 }}
                src={process.env.PUBLIC_URL + "/lion.svg"}
                alt="logo"
              />
            </div>
            <Space direction="horizontal">
              <Button
                icon={isDark ? <MoonOutlined /> : <SunOutlined />}
                shape="default"
                onClick={toggleTheme}
              />
              <Dropdown menu={{ items: userOptions }} placement="bottomRight">
                <Button icon={<UserOutlined />}>User</Button>
              </Dropdown>
            </Space>
          </Header>

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
    </ConfigProvider>
  )
}

export default MainLayout
