import React from "react"
import { Typography, Card, Space } from "antd"
import LoginForm from "./loginForm"
import logo from "@/assets/logo.svg"
import styles from "./index.module.css"
import { useNavigate } from "react-router-dom"

const { Title } = Typography

function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/")
  }

  return (
    <div className={styles.loginWrap}>
      <Space direction={"horizontal"}>
        <img src={logo} className={styles.logo} alt="wave_logo" />
        <Title level={3} style={{ textAlign: "center" }}>
          Wave Admin
        </Title>
      </Space>

      <Card style={{ width: 520 }}>
        <LoginForm onSubmit={handleLogin} />
      </Card>
    </div>
  )
}

export default Login
