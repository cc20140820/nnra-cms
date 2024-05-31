import React from "react"
import { theme, ConfigProvider } from "antd"
import { useAdminStore } from "@/store"
import MainLayout from "@/layouts/mainLayout"

const HEADER_HEIGHT = 64

const App: React.FC = () => {
  const isDark = useAdminStore((state) => state.isDark)
  return (
    <ConfigProvider
      theme={{
        token: {},
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Layout: {
            headerBg: "rgba(255, 255, 255, 0.6)",
            headerHeight: HEADER_HEIGHT,
          },
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  )
}

export default App
