const express = require('express');
const userRoute = require('./userRoute');
const bookRoute = require('./bookRoute');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: userRoute,
    },{
      path: '/',
      route: bookRoute,
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
