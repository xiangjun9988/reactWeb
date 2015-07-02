var React = require('react'),
	DialogApp = require('../DialogApp.js'),
	PageStore = require('../stores/page-store.js'),
    PageAction = require('../actions/page-action.js');

function getLoginUser(){
	return PageStore.getLoginUser();
}
// 侧边栏
var UserSide = React.createClass({
	getInitialState: function(){
		return {
			data:getLoginUser()
		}
	},
	componentDidMount: function(){
		PageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		PageStore.removeChangeListener(this._onChange);
	},
	_onChange: function(){
        this.setState({
            data:getLoginUser()
        });
    },
	_login: function(){
		if(!this.state.data.isLogin){
			React.render(
				<DialogApp taskClass={0} />,
				document.getElementById('aside2')
				);
		}
	},
	_outLogin: function(e){
		e.preventDefault();
		PageAction.outLogin();
	},
	render: function(){
		var loginUser = this.state.data;
		var classes = loginUser.isLogin ? "yes" : "";
		var userNav = loginUser.userNav;
		var userNavList = loginUser.userNav.map(function(a,i){
			return (
					<li key={'uNav'+i} onTouchEnd = {this._login}>
						<a href={loginUser.isLogin ? a.url : "javascript:void(0)"}>
							<span className={a.icon}></span>
							<strong 
							className={a.newMsg ? "newMsg" : ""}>
							{a.text}
							</strong>
						</a>
					</li>
				);
		}.bind(this));
		return (
			 <div id="userSide-wp" 
			 	className={classes}>
				<div className="userInfo">
					<div className="uImg">
						<img src={loginUser.uImg} />
					</div>

					<div className="uInfo">
						<button onTouchEnd={this._login} type="button" >登录</button>
						<h2>{loginUser.uName}</h2>
						<span>{loginUser.uClass}</span>
					</div>
				</div>
				<ul>
					{userNavList}
				</ul>
				<button onTouchEnd={this._outLogin}>退出登陆</button>
		    </div>
			);
	}
});

module.exports = UserSide;
