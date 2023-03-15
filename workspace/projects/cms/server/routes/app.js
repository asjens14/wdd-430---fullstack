var express = require('express');
var router = express.Router();
const path = require('path')

console.log(__dirname)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join('C:/git/wdd-430---fullstack/workspace/', 'dist/cms/index.html'));
});

module.exports = router;
