import React from 'react';
import AppAction from '../../actions/app-action';

// 接单信息
export default class FormsRegister extends React.Component {
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) );
	}
	constructor(props) {
		super(props);
		this.state = {
			userInfo:{
				taskId:this.props.taskId,
				taskClass:this.props.taskClass,
				userName:'',
				userPhone:'',
				userEmail:'',
				userUrl:''
			}
		};
		this._bind(
			'handleName', 
			'handlePhone',
			'handleEmail',
			'handleUrl',
			'handleSubmit');
	}
	handleName(e) {
		var userInfo = this.state.userInfo;
		userInfo.userName = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handlePhone(e) {
		var userInfo = this.state.userInfo;
		userInfo.userPhone = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handleEmail(e) {
		var userInfo = this.state.userInfo;
		userInfo.userEmail = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handleUrl(e) {
		var userInfo = this.state.userInfo;
		userInfo.userUrl = e.target.value;
		this.setState({
			userInfo:userInfo
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		var userInfo = this.state.userInfo;
		// ajax报名
		AppAction.PostInfo(this.props.ajaxUrl,userInfo);
	}
	render(){
		var userInfo = this.state.userInfo;
		return (
			<form id="Receiving-wp" className="fadeIn animated" onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>接单信息</legend>
					<label htmlFor="userName">
						<span className="wx-user"></span>
						<em></em>
						<div>
							<input ref="userName" id="userName" type="text" 
								placeholder="姓名" 
								onChange={this.handleName}
								value={userInfo.userName} />
						</div>
					</label>
					<label htmlFor="userPhone">
						<span className="wx-iphone"></span>
						<em></em>
						<div>
							<input ref="userPhone" id="userPhone" type="number" 
								placeholder="联系方式"
								onChange={this.handlePhone}
								value={userInfo.userPhone} />
						</div>
					</label>
					<label htmlFor="userEmail">
						<span className="wx-email"></span>
						<em></em>
						<div>
							<input ref="userEmail" id="userEmail" type="email" 
								placeholder="邮箱" 
								onChange={this.handleEmail} 
								value={userInfo.userEmail} />
						</div>
					</label>
					<label htmlFor="userUrl">
						<span className="wx-url"></span>
						<em></em>
						<div>
							<input ref="userUrl" id="userUrl" type="text" 
								placeholder="作品链接" 
								onChange={this.handleUrl} 
								value={userInfo.userUrl} />
							<strong>建议您到一起编网站上传</strong>
						</div>
					</label>
					<input className="btn" type="submit" value="确 定" />
				</fieldset>
			</form>
		);
	}
}