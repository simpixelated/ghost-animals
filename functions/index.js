const serverless = require('serverless-http')
const express = require('express');

const expressApp = () => {
  const app = express();
  const basePath = (process.env.NODE_ENV === 'development') ? '/' : '/.netlify/functions/index';
  app.set('port', process.env.PORT || 3002);
  app.use(basePath, (req, res, next) => {
    res.header('Content-Type','application/json');

    // TODO: disable if no longer developing
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

  app.get(basePath, (req, res) => {
    res.json([{
      name: 'Raven',
      emoji: '🐦',
    }, {
      name: 'Wolf',
      emoji: '🐺'
    }, {
      name: 'Spider',
      emoji: '🕷'
    }, {
      name: 'Bat',
      emoji: '🦇'
    }, {
      name: 'Black Cat',
      emoji: '😸'
    }]);
  })

  app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });

  return app;
};

// Export lambda handler
exports.handler = serverless(expressApp());
