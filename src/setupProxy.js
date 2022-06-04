const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.zhuwenfu.top',
      changeOrigin: true,
      pathRewrite: {
        '^api': ''
      }
    })
  )
}