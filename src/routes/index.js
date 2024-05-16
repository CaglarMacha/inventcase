// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
const express = require('express');
const authRoute = require('./userRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: authRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
