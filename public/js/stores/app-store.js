import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constant.js';
import {EventEmitter} from 'events';
import PageAction from '../actions/page-action.js';
import PageStore from './page-store.js';
import Immutable from 'immutable';
import $ from 'ajax';

let CHANGE_EVENT = "change";

let iDefault = Immutable.fromJS( {
	isLogin:false,//是否登录
	isRegister:false,//是否注册
	isMakeOffer:false,//是否报价
	isReceiving:false,//是否接单
	successInfo:{
		isSuccess:false,//报名成功
		successTitle:'',
		successText:'',
		successUrl:''
	},
	loadingInfo:{
		isShow:false,
		LoadingText	:'Loading...'
	}//是否加载
} );
let isDialog = iDefault.toJS();

// 获取登录信息
let loginInfo = loginUser;
// 数据验证
function validator(data){
	let re = /\S/;
	let rePhone = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	let reEmail = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
	let reUrl = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	let isError = false;
    let i;
    for(i in data){
    	switch(i){
    		case 'userPhone':
    			isError = !rePhone.test(data[i]);
    			break;
    		case 'userEmail':
    			isError = !reEmail.test(data[i]);
    			break;
    		case 'userUrl':
    			isError = false;
    			break;
    		case 'userPwd2':
    			isError = !(data['userPwd'] === data[i]);
    			break;
    		default:
    			isError = !re.test(data[i]);
    			break;

    	}

    	if(isError){
    		break;
    	}
    }
    console.log(i,data)
   return (isError);
}
// 登录
function _login(url,data){
	var test = data;
	if(validator(data)){
		_loading('请填写完整信息!')
		return false;
	}
	_loading('加载中...')
	$.post(url,data,function(data){
		var data = JSON.parse(data);
		var userInfo = data.userInfo;
		if(data.islogin==1){
            loginUser.isLogin = true;
			switch(test.taskClass){
				case 0 :
      		var data ={
              isLogin:true,
              uName:userInfo.uName,
              uImg:userInfo.uImg,
              uClass:userInfo.uClass,
              userNav:userInfo.userNav
          }
					PageAction.getLoginUser(data);
					successNode('登录信息','登录成功！','')
					break;
				case 1 :
					showForm(1);
					break;
				case 2 :
					showForm(2);
					break;
				default:
					showForm('isLogin');
			}
		}else{
			_loading('登录失败!')
		}
	})
}

function _ajax(url,data){
	if(validator(data)){
		_loading('请填写完整信息!')
		return false;
	}
	var test = data;
	var successTitle,successText,successUrl;
	_loading('加载中...')
	$.post(url,data,function(data){
		if(data==1){
			showForm();
			switch(test.taskClass){
				case 1 :
					successTitle = '报价信息';
					successText = '报价成功！';
					successUrl = false;
					break;
				case 2 :
					successTitle = '接单信息';
					successText = '接单成功！';
					successUrl = false;
					break;
				default:
					showForm('isLogin');
			}
			successNode(successTitle,successText,successUrl);
		}else if(data== -2){
			var text = test.taskClass === 1 ? '已经报价' : '已经接单';
			_loading(text)
		}else{
			_loading('提交失败！')
		}
	})
}

// 提醒
function _loading(text,time){
	var loading = isDialog.loadingInfo;
	loading.isShow=true;
	loading.LoadingText=text;
	var time = time ? time : 1000;
	setTimeout(function(){
		if(loading.isShow){
			loading.isShow=false;
			loading.LoadingText='';
			_AppStore.emitChange();
		}
	},time);
}
// 完成提示
function successNode(title,text,url){
	isDialog = iDefault.set('successInfo',{
		isSuccess:true,
		successTitle:title,
		successText:text,
		successUrl:url
	}).toJS();
}
function t(taskId){
    $.post('/offerauth',{taskId:taskId},function(data){
        if(data==0){
            successNode('提醒信息','您已参加此活动！','')
            return false;
        }
    })
}
// 选择表单
function showForm(data){
	var forms = ['isLogin','isMakeOffer','isReceiving','isRegister','isSuccess'];
	var doms = forms[data];
	if(data === 1 || data === 2){
        t(data);
    }
	if(data != 3 && data!=undefined && !loginUser.isLogin){
		doms = forms[0];
	}
	isDialog = iDefault.set(doms,true).toJS();
	_loading('loading...','1000');
}


class AppStore extends EventEmitter {
    getForm() {
        return isDialog;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb)
    }
}

let _AppStore = new AppStore();

export default _AppStore;

AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(payload.actionType){
        case AppConstants.DEFAULTFORM:
            defaultForm(payload.taskClass);
            break;
        case AppConstants.SHOWFORM:
            showForm(payload.data);
            break;
        case AppConstants.LOGIN:
            _login(payload.url,payload.data,payload);
            break;
        case AppConstants.REGISTER:
            _ajax(payload.url,payload.data);
            break;
        case AppConstants.POSTINFO:
            _ajax(payload.url,payload.data);
            break;
        case AppConstants.HINT:
            _loading(payload.msg,payload.time);
            break;
    }
    _AppStore.emitChange();
    return true;
});
