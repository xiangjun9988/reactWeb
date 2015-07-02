var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
  var s = ''
  res.render('index', { 
  						title: 'Express',
                        reactOut:s 
						});
});
router.get('/TaskListPage', function(req, res, next) {
  res.render('TaskListPage', { 
  						title: 'Express' 
						});
});
router.get('/TaskPage', function(req, res, next) {
  res.render('TaskPage', { 
  						title: 'Express' 
						});
});
router.get('/CapitalPage', function(req, res, next) {
  res.render('CapitalPage', { 
  						title: 'Express' 
						});
});
router.get('/NoticePage', function(req, res, next) {
  res.render('NoticePage', { 
  						title: 'Express' 
						});
});
router.get('/NoticeListPage', function(req, res, next) {
  res.render('NoticeListPage', { 
  						title: 'Express' 
						});
});
router.get('/LoveListPage', function(req, res, next) {
  res.render('LoveListPage', { 
  						title: 'Express' 
						});
});
router.get('/MessageListPage', function(req, res, next) {
  res.render('MessageListPage', { 
  						title: 'Express' 
						});
});
router.get('/MessagePage', function(req, res, next) {
  res.render('MessagePage', { 
  						title: 'Express' 
						});
});
router.get('/MyTaskListPage', function(req, res, next) {
  res.render('MyTaskListPage', { 
  						title: 'Express' 
						});
});
router.get('/MyTaskPage', function(req, res, next) {
  res.render('MyTaskPage', { 
  						title: 'Express' 
						});
});

router.post('/logingo', function(req, res, next) {
  res.send({
    islogin: true,
    userInfo: {
        isLogin:true,
        uName:'何潇',
        uImg:'/images/IMG_0548.GIF',
        uClass:'成都市/高新区',
        userNav:[
            {url:'',icon:'wx-Calendar',newMsg:false,text:'我的任务'},
            {url:'',icon:'wx-Wallet',newMsg:false,text:'资金账户'},
            {url:'',icon:'wx-Calendar',newMsg:false,text:'公告'},
            {url:'',icon:'wx-Like2',newMsg:false,text:'喜欢'}
        ]
        
    }
  });
});

router.post('/offerinsert', function(req, res, next) {
  res.send('1');
});

module.exports = router;
