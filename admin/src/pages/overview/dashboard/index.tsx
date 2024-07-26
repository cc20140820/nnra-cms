import React, { useState } from "react"
import { Card } from "antd"
import { BasicPageWrapper } from "@/components"

const App: React.FC = () => {
  console.log(1)
  return (
    <BasicPageWrapper title={"title"} desc="ssds">
      <Card>dashboard</Card>
    </BasicPageWrapper>
  )
}

export default App
