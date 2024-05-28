import React from "react"
import { ConfigProvider, Button } from "antd"

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </ConfigProvider>
  )
}

export default App
