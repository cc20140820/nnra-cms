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
- categoryDesc 是由前端映射还是后端处理，处理的话是查询的时候添加该字段还是 在新增的时候添加该字段？
    结合业务场景来看，如果前端来做，这里的计算量不大，所以并不会影响性能，所以可以考虑前端处理，如果后端处理，考虑到category后期可能有更新操作，所以desc是不会存进collection中的，所以只能在query的时候实时查询，这里可以选择单表查询或者多表查询，多表查询的效率更高，但是有一个潜在的问题，那就是：----
- 前端主页面，代码量大，可以看看是否有可以做拆分
- 接口restful api 虽然method严格遵守了规范，比如update使用了Patch，delete使用Delete，add使用Post，但是在浏览器控制台显示不友好，无法一眼看出是具体是哪个接口
- 业务主键目前使用的uuid，但是过于冗长，需要探索更优方案
- tag 可以添加颜色选择