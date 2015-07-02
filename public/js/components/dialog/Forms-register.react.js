import React from 'react';
import AppAction from '../../actions/app-action';
	var $ = require('ajax');
// 用户注册
export default class FormsRegister extends React.Component {
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) );
	}
	constructor(props){
		super(props);
		this.state = {
			userInfo:{
				userName:'',
				userPwd:'',
				userPwd2:'',
				userPhone:'',
				userEmail:'',
				AuthCode:''
			},
			get: false,
			Time:60,
			btnText:'获取手机验证码'
		}
		this._bind(
			'handleName', 
			'handlePwd', 
			'handlePwd2', 
			'handlePhone',
			'handleAuthCode',
			'handleEmail',
			'handleSubmit',
			'getAuthCode');
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
	handlePwd2(e){
		var userInfo = this.state.userInfo;
		userInfo.userPwd2 = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handlePhone(e){
		var userInfo = this.state.userInfo;
		userInfo.userPhone = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handleAuthCode(e){
		var userInfo = this.state.userInfo;
		userInfo.AuthCode = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handleEmail(e){
		var userInfo = this.state.userInfo;
		userInfo.userEmail = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	getAuthCode(e){
		e.preventDefault();
		if(!this.state.get) return;
		this.timeout =setInterval(function(){
			if(this.state.Time===0){
				this.setState({
					get: false,
					Time:60,
					btnText:'获取手机验证码'
				});
				clearTimeout(this.timeout)
				return;
			}
			this.setState({
				get:false,
				btnText:this.state.Time+'秒后重新获取',
				Time:this.state.Time-1
			});
		}.bind(this), 1000);
		$.post('/public/sendgo', 
			{userPhone:this.state.userInfo.userPhone}, 
			function(data, textStatus, xhr) {
				if(data===0){
					if(this.state.Time===0){
						this.setState({
							get: false,
							Time:60,
							btnText:'重新获取'
						});
						clearTimeout(this.timeout)
						return;
					}
				}
		}.bind(this));
	}
	handleSubmit(e) {
		e.preventDefault();
		var userInfo = this.state.userInfo;
	    // ajax登陆
		AppAction.Register(this.props.ajaxUrl,userInfo)
	}
	render(){
		var userInfo = this.state.userInfo;
		return (
			<form id="register-wp" className="fadeIn animated" onSubmit={this.handleSubmit.bind(this)}>
				<fieldset>
					<legend>用户注册</legend>
					<label htmlFor="userName">
						<span className="wx-user"></span>
						<em></em>
						<div>
							<input id="userName" type="text" 
								placeholder="请输入您的用户名"
								onChange={this.handleName} 
								value={userInfo.userName} />
						</div>
					</label>
					<label htmlFor="userPwd">
						<span className="wx-unlocked"></span>
						<em></em>
						<div>
							<input id="userPwd" type="password" 
								placeholder="请输入您的密码"
								onChange={this.handlePwd} 
								value={userInfo.userPwd} />
						</div>
					</label>
					<label htmlFor="userPwd2">
						<span className="wx-unlocked"></span>
						<em></em>
						<div>
							<input id="userPwd2" type="password" 
								placeholder="确认密码"
								onChange={this.handlePwd2} 
								value={userInfo.userPwd2} />
						</div>
					</label>
					<label htmlFor="userPhone">
						<span className="wx-iphone"></span>
						<em></em>
						<div>
						<input ref="userPhone" id="userPhone" type="number" 
							placeholder="请输入您的手机号码"
							onChange={this.handlePhone} 
							value={userInfo.userPhone} />
						</div>
					</label>
					<label htmlFor="userPhoneBtn">
						<span></span>
						<em></em>
						<div>
						<button className="getAuthCode" onClick={this.getAuthCode} >{this.state.btnText}</button>
						</div>
					</label>
					<label htmlFor="AuthCode">
						<span className="wx-key"></span>
						<em></em>
						<div>
						<input ref="AuthCode" id="AuthCode" type="number" 
							placeholder="请输入手机验证码"
							onChange={this.handleAuthCode} 
							value={userInfo.AuthCode} />
						</div>
					</label>
					<label htmlFor="userEmail">
						<span className="wx-email"></span>
						<em></em>
						<div>
							<input id="userEmail" type="email" 
								placeholder="请输入您的邮箱"
								onChange={this.handleEmail} 
								value={userInfo.userEmail} />
						</div>
					</label>
					<input className="btn" type="submit" value="注 册" />
				</fieldset>
			</form>
		);
	}
}