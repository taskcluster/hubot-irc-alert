module.exports = {
  use: [
    '@neutrinojs/airbnb-base',
    '@neutrinojs/node',
    ['@neutrinojs/mocha', {
      exit: true,
    }]
  ]
};
