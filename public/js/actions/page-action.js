var PageDispatcher = require('../dispatcher/page-dispatcher.js'),
    PageAppConstants = require('../constants/page-constant.js');

var PageAction = {
    getLoginUser: function(data){
        PageDispatcher.dispatch({
            actionType: PageAppConstants.GETLOGINUSER,
            data:data
        });
    },
    outLogin: function(){
        PageDispatcher.dispatch({
            actionType: PageAppConstants.OUTLOGIN,
        });
    },
    handleMyLove: function(taskId){
        PageDispatcher.dispatch({
            actionType: PageAppConstants.MYLOVE,
            taskId:taskId
        });
    }
}

module.exports = PageAction;