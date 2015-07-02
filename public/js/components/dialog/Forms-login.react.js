import React from 'react';
import AppAction from '../../actions/app-action';

// 用户登录
export default class FormsLogin extends React.Component {
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) );
	}
	constructor(props) {
		super(props);
		this.state = {
			userInfo:{
				userName:'',
				userPwd:'',
				taskClass:this.props.taskClass
			}
		}
		this._bind('handleName', 'handlePwd', 'handleSubmit');
	}
	handleIsRegister(){
		// 现示注册表单
		AppAction.showForm(3);
	}
	handleName(e){
		var userInfo = this.state.userInfo;
		userInfo.userName = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handlePwd(e){
		var userInfo = this.state.userInfo;
		userInfo.userPwd = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handleSubmit(e) {
		e.preventDefault();
	    // ajax登陆
		AppAction.login(this.props.ajaxUrl, this.state.userInfo);
	}
	render(){
		var userInfo = this.state.userInfo;
		return (
			<form id="login-wp" className="fadeIn animated" 
				onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>用户登录</legend>
					<label htmlFor="userName">
						<span className="wx-user"></span>
						<em></em>
						<div className="field">
							<input ref="userName" id="userName" type="text" 
								placeholder="请输入您的用户名"
								onChange={this.handleName} 
								value={userInfo.userName} />
						</div>
					</label>
					<label htmlFor="userPwd">
						<span className="wx-unlocked"></span>
						<em></em>
						<div className="field">
							<input id="userPwd" type="password" 
								placeholder="请输入您的密码"
								onChange={this.handlePwd} 
								value={userInfo.userPwd} />
						</div>
					</label>
					<input className="btn" type="submit" value="登 录" />
					<button onClick={this.handleIsRegister} 
						className="btn" type="button">注 册</button>
				</fieldset>
			</form>
		);
	}
}