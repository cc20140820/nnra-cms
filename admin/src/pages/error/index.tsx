import { useNavigate, useRouteError } from "react-router-dom"
import { Button, Result } from "antd"

export default function ErrorPage() {
  const error: any = useRouteError()
  const navigate = useNavigate()

  console.info("react-router 报错:", error)

  return (
    <Result
      status={error.status}
      title={error.statusText}
      subTitle={error.data}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  )
}
