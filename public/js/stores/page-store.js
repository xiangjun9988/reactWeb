var PageDispatcher = require('../dispatcher/page-dispatcher.js'),
    PageConstants = require('../constants/page-constant.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    $ = require('ajax');

var CHANGE_EVENT = "change";

var loginData = loginUser;

function getLoginUser(data){
    loginData = data;
}
function outLogin(){
    loginData ={
        isLogin:false,
        uName:'一起编',
        uImg:'/images/userImg.jpg',
        uClass:'',
        userNav:[
            {url:'',icon:'wx-Calendar',newMsg:false,text:'我的任务'},
            {url:'',icon:'wx-Wallet',newMsg:false,text:'资金账户'},
            {url:'',icon:'wx-Calendar',newMsg:false,text:'公告'},
            {url:'',icon:'wx-Like2',newMsg:false,text:'喜欢'}
        ]
    }
    $.post('/loginout',{},function(data){
        });
}
function handleMyLove(taskId){
    if(!loginData.isLogin){
        return false;
    }
    $.post('/likes',{taskid:taskId},function(data){
         if(data==1 || data==0){
             console.log('添加成功');
         }else{
             console.log('添加失败')
         }
    });
}
var PageStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getLoginUser: function() {
        return loginData;
    }
});

PageDispatcher.register(function(payload) {
    var action = payload;
    switch(payload.actionType){
        case PageConstants.GETLOGINUSER:
            getLoginUser(payload.data);
            break;
        case PageConstants.OUTLOGIN:
            outLogin();
            break;
        case PageConstants.MYLOVE:
            handleMyLove(payload.taskId);
            break;
    }
    PageStore.emitChange();
    return true;
});

module.exports = PageStore;