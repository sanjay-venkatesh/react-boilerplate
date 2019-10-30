var cookie = "";
const PROXY_DOMAIN = "https://app.test.com";

module.exports = {
  "/api": {
    target: PROXY_DOMAIN,
    changeOrigin: true,
    headers: {
      cookie: cookie
    }
  }
};
