var React = require('react');
// 用户信息
var UserInfo = React.createClass({
	render: function(){
		return (
			<div className="userInfo-wp">
		        <div className="uImg">
		          <img src={this.props.data.uImg} />
		        </div>
		        <div className="uInfo">
		          <h2>{this.props.data.uName}</h2>
		          <span>{this.props.data.uClass}</span>
		        </div>
		      </div>
			);
	}
});

module.exports = UserInfo;