// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests to your Node.js server
  app.use(
    '/api/v1', // Change this to match your backend API route
    createProxyMiddleware({
      target: 'http://localhost:4000', // Your Node.js server address
      changeOrigin: true,
    })
  );
};
