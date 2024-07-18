# nnra-cms
nest-next-react-antd-cms

The CMS system developed by nest.js and next.js is used to implement SSR server-side rendering and generate static HTML, which is conducive to SEO.Suitable for enterprises to build SEO-type websites.

### folder structure
The following is the directory structure of the entire project, which provides various functions and pits covering middle and back-end development.

```bash
├── admin                   # 管理后台
├── server                  # 后端nest服务
└── web                     # 前台
```

### stack summary

#### admin
- Typescript
- UI library: ant design
- 状态管理: context & zustand
- CSS 模块化方案: css modules
- 网络请求: axios & useRequest
- 其他前端工具库：ahooks,constate,dayjs


#### server
- Nest 
- Typescript
- uuid

#### web
- todo

------

### 功能记录

#### 封装通用返回类型
接口的返回格式建议参考统一的接口规范，方便做统一的错误处理:
```
interface Response<T> {
  success: boolean
  data: T
  errorCode: string
  errorMessage: string
  showType: number
  traceId: string
  host: string
}
```

分页场景采用如下的格式:
```
interface ListRes<T> {
  list: T[]
  current?: number
  pageSize?: number
  total?: number
}
```

#### API 改造 & RESTful API 设计规范

[科普文：一杯茶的时间，搞懂 RESTful API](https://apifox.com/blog/a-cup-of-tea-time-to-understand-restful-api/)

- 使用 HTTP 方法（如 GET、POST、PUT 和 DELETE）来描述操作
- 通过改变 URL 来表示不同的版本，例如 https://example.com/api/v1/resources 和 https://example.com/api/v2/resources
- URL明确标识资源，形式固定，可读性强，根据名词和 HTTP 动词就可以操作这些资源
- 使用正确的 HTTP 状态码
- 统一返回数据格式
- 使用 API 管理工具，比如 Apifox，可以一键生成 API 文档。

ps: REST 是一种风格，而不是一种约束，过于理想的 RESTful API 会付出太多的成本哟

#### 主题切换 & 多语言

#### 登录 & 鉴权
