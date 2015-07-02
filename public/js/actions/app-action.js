import AppDispatcher from '../dispatcher/app-dispatcher.js';
import AppConstants from '../constants/app-constant.js';

export default {
	defaultForm: (taskClass) => {
		AppDispatcher.dispatch({
			actionType:AppConstants.DEFAULTFORM,
			taskClass:taskClass
		});
	},
	showForm: (data) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.SHOWFORM,
			data:data
		});
	},
	login: (url,data) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.LOGIN,
			url: url,
			data: data
		});
	},
	Register: (url,data) => {
		AppDispatcher.dispatch({
			actionType:AppConstants.REGISTER,
			url: url,
			data: data
		});
	},
	PostInfo: (url,data) => {
		AppDispatcher.dispatch({
			actionType:AppConstants.POSTINFO,
			url: url,
			data: data
		});
	},
	Hint: (msg,time) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.HINT,
			msg: msg,
			time: time
		});
	}
}
