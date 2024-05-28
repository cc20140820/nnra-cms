import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "./pages/error"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import MainLayout from "./layouts/mainLayout"
import { ConfigProvider } from "antd"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <div>index</div> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)

reportWebVitals(console.log)
