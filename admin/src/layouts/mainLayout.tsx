import React, { useEffect, useState } from "react"
import i18n from "i18next"
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
  Dropdown,
  Layout,
  Menu,
  theme,
  Typography,
  Space,
  ConfigProvider,
  App,
  Avatar,
  Switch,
} from "antd"
import { useAdminStore } from "@/store"
import bgImg from "./bgImg.svg"
import styles from "./mainLayout.module.css"
import zhCN from "antd/locale/zh_CN"
import enUS from "antd/locale/en_US"
import "dayjs/locale/zh-cn"
import { Locale } from "antd/es/locale"
import dayjs from "dayjs"

const { Title, Text } = Typography
const { Content, Sider } = Layout
type MenuItem = Required<MenuProps>["items"][number] & {
  children: { key: string; label: string }[]
}

type MainLayoutType = {
  onChangeLng: (v: string) => void
}

const menus: MenuItem[] = [
  {
    key: "sub0",
    label: "Overview",
    icon: <AppstoreOutlined />,
    children: [{ key: "a", label: "Option 1" }],
  },
  {
    key: "sub1",
    label: "Login center",
    icon: <AppstoreOutlined />,
    children: [
      { key: "b", label: "Option 4" },
      { key: "c", label: "Option 5" },
    ],
  },
  {
    key: "sub2",
    label: "Reading corner",
    icon: <MailOutlined />,
    children: [
      { key: "books", label: "Books" },
      { key: "categories", label: "Categories" },
      { key: "tags", label: "Tags" },
    ],
  },
]

const SIDER_WIDTH = 240

const MainLayout: React.FC<MainLayoutType> = (props) => {
  const { onChangeLng } = props
  const {
    token: {
      colorBgContainer,
      colorBorderSecondary,
      colorTextHeading,
      colorTextSecondary,
    },
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
      key: "lng",
      label: <a>Language</a>,
      children: [
        {
          key: "zh-cn",
          label: <a onClick={() => onChangeLng("zh_cn")}>简体中文</a>,
        },
        {
          key: "en",
          label: <a onClick={() => onChangeLng("en")}>English</a>,
        },
      ],
    },
    {
      key: "logout",
      label: <a onClick={() => navigate("/login")}>Logout</a>,
    },
  ]

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`)
  }

  useEffect(() => {
    const pathname = location.pathname.replace("/", "")

    const parentKey = menus.find(
      (menu) => menu?.children.findIndex((child) => child.key === pathname) > -1
    )?.key as string

    const pageLabel =
      menus
        .find((menu) => menu.key === parentKey)
        ?.children.find((sub) => sub.key === pathname)?.label || ""

    setSelectedKeys([pathname])
    setOpenKeys([parentKey])
    setPageName(pageLabel)
  }, [location.pathname])

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        width={SIDER_WIDTH}
        style={{
          background: colorBgContainer,
          height: "100vh",
        }}
        className={styles.siderMenu}
      >
        <div
          className={styles.logoWrap}
          style={{ borderBottomColor: colorBorderSecondary }}
        >
          <img
            style={{ height: 32, width: 32 }}
            src={process.env.PUBLIC_URL + "/wave.svg"}
            alt="logo"
          />
          <Space direction={"vertical"} size={2}>
            <Text
              className={styles.logoTitle}
              style={{ color: colorTextHeading }}
            >
              Wave Dashboard
            </Text>
            <Text
              className={styles.logoSubTitle}
              style={{ color: colorTextSecondary }}
            >
              Workplace
            </Text>
          </Space>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={({ selectedKeys }: Record<string, any>) =>
            setSelectedKeys(selectedKeys)
          }
          openKeys={openKeys}
          onOpenChange={(_openKeys: string[]) => setOpenKeys(_openKeys)}
          style={{ borderRight: 0 }}
          items={menus}
          onClick={handleMenuClick}
        />
        <div
          className={styles.userWrap}
          style={{ borderTopColor: colorBorderSecondary }}
        >
          <Dropdown menu={{ items: userOptions }}>
            <Space size={12}>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<UserOutlined />}
              />
              <Text className={styles.userName}>Admin</Text>
            </Space>
          </Dropdown>
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            onChange={toggleTheme}
            value={isDark}
          />
        </div>
      </Sider>
      <Layout style={{ marginInlineStart: SIDER_WIDTH }}>
        <Layout className={styles.layoutWrap}>
          <div className={styles.bgImgWrap}>
            <img src={bgImg} alt="bg" />
          </div>
          <div style={{ zIndex: 1 }}>
            <Title level={3}>{pageName}</Title>
            <Content>
              <App>
                <Outlet />
              </App>
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  )
}

const EnhancedMainLayout: React.FC = () => {
  const [locale, setLocal] = useState<Locale>(enUS)
  const isDark = useAdminStore((state) => state.isDark)
  const changeLanguage = (v: string) => {
    setLocal(v === "en" ? enUS : zhCN)
    dayjs.locale(v === "en" ? "en" : "zh")
    i18n.changeLanguage(v)
  }

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        cssVar: true,
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <MainLayout onChangeLng={changeLanguage} />
    </ConfigProvider>
  )
}

export default EnhancedMainLayout
