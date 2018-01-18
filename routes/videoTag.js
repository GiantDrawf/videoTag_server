const router = require('koa-router')();
const videoTagController = require('../server/controllers/videoTagController');

router.get('/queryVideoInfo', videoTagController.queryVideoInfo);

router.get('/queryAllTags', videoTagController.queryAllTags);


module.exports = router;