const proxy = {
  '/api/users/': {
    target: 'http://localhost:3001/',
    "pathRewrite": {
      "^/api/users/": ""
    }
  }
};

module.exports = proxy;
