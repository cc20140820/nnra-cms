// TODO: 不要公共地暴露这个密钥。 我们这里这样做是为了清楚地说明代码正在做什么，
// 但在生产系统中，你必须要使用恰当的措施来 保护这个密钥 ，例如机密库 、环境变量、配置服务等。
export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
