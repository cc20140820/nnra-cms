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
import { Button, Dropdown, Layout, Menu, theme, Typography, Space } from "antd"
import { useAdminStore } from "@/store"
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

const SIDER_WIDTH = 240

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, Layout: { headerHeight } = {} },
  } = theme.useToken()

  const navigate = useNavigate()
  let location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [pageName, setPageName] = useState("")

  const isDark = useAdminStore((state) => state.isDark)
  const toggleTheme = useAdminStore((state) => state.toggleTheme)

  const userOptions: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => navigate("/login")}>Logout</a>,
    },
  ]

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
      <Sider
        width={SIDER_WIDTH}
        style={{
          background: colorBgContainer,
          height: `calc(100% - ${headerHeight ?? 64}px)`,
          insetBlockStart: headerHeight ?? 64,
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
      <Layout style={{ marginInlineStart: SIDER_WIDTH }}>
        <Header
          style={{
            zIndex: 0,
            backgroundColor: "transparent",
          }}
        />
        <Header className={styles?.topHeader}>
          <div className={styles.flexCenterWrap}>
            <img
              style={{ height: 46 }}
              src={process.env.PUBLIC_URL + "/wave.svg"}
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
        <Layout className={styles.layoutWrap}>
          <Title level={3}>{pageName}</Title>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
