var express = require("express");
var proxy = require("http-proxy-middleware");
var app = express();

app.use(
  ["**/*.action", "/servlet2"],//正则匹配任何以.action结尾，以/servlet2开头的请求
  proxy({
    target: "http://172.16.2.5",
    changeOrigin: true,
    timeout: 20000 //20秒超时
  })
);
app.use(
  "/",
  proxy({
    // 代理跨域目标
    target: "http://localhost:8888",
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function (proxyRes, req, res) {
      //proxyRes.headers['Cache-Control'] = 'no-Cache';
    },
    pathRewrite: {} //覆盖路径
    // 修改响应信息中的cookie域名
    //cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
  })
);
app.listen(3000);
console.log("Proxy server is listen at port 3000...");
