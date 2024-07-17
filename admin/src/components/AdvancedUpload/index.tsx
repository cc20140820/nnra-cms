import React, { useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { message, Upload } from "antd"
import type { GetProp, UploadProps } from "antd"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

type AdvancedUploadType = {
  value?: string
  onChange?: (val: string) => void
}
const STATIC_URL_PREFIX = "http://localhost:3000/"

// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader()
//   reader.addEventListener("load", () => callback(reader.result as string))
//   reader.readAsDataURL(img)
// }

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt1M = file.size / 1024 / 1024 < 1
  if (!isLt1M) {
    message.error("Image must smaller than 1MB!")
  }
  return isJpgOrPng && isLt1M
}

const AdvancedUpload: React.FC<AdvancedUploadType> = (props) => {
  const { value = "", onChange } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(value)

  const handleChange: UploadProps["onChange"] = (info) => {
    console.log("???", info)
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response?.url)
      onChange && onChange(info.file.response?.url)
      setLoading(false)
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Upload
      name="file" // 发到后台的文件参数名
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://localhost:3000/api/basic/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          alt="avatar"
          src={`${STATIC_URL_PREFIX}${imageUrl}`}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default AdvancedUpload
