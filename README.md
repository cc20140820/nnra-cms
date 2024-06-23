# nnra-cms
nest-next-react-antd-cms

The CMS system developed by nest.js and next.js is used to implement SSR server-side rendering and generate static HTML, which is conducive to SEO.Suitable for enterprises to build SEO-type websites.

目录结构

admin  管理后台
server 后端服务
web    用户前端


### TODO
自增业务主键
封装返回类型、分页数据类型

目前文章管理基础功能已经实现，但是代码层面比较粗糙，需要打磨成最佳实践，有以下几点有待优化：
- categoryName 是由前端映射还是后端处理，处理的话是查询的时候添加该字段还是 在新增的时候添加该字段？
- 前端主页面，代码量大，可以看看是否有可以做拆分
- 接口restful api 虽然method严格遵守了规范，比如update使用了Patch，delete使用Delete，add使用Post，但是在浏览器控制台显示不友好，无法一眼看出是具体是哪个接口
- 业务主键目前使用的uuid，但是过于冗长，需要探索更优方案
- tag 可以添加颜色选择