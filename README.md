# 使用方法

1. 在[百度千帆大模型控制台](https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application)创建应用
2. 在根目录下添加 .env.local 文件
3. pnpm i
4. pnpm dev 本地运行 / pnpm build 打包

```bash
# .env.local
VITE_APP_KEY={"client_id":"xxx","client_secret":"xxx"}
```

> 关于 client_id 与 client_secret：
>
> 密钥放在 local 文件里只为避免参与版本管理，并不起保密作用
>
> access_token 好像有有效期，所以干脆每次进入项目都获取一遍
>
> 所以请注意：**如果项目不加权限控制直接部署在公网上，则任何人都能看到你的密钥**

# Nginx 部署方法

打包上传到服务器后，在 nginx 对应站点的配置文件中配置反向代理

```nginx
location /api/
{
  proxy_pass https://aip.baidubce.com/;
}
```
