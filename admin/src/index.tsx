import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// 严格模式会进行两次渲染来检测潜在的问题，但导致了useRequest请求了两次
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)

// reportWebVitals(console.log)
