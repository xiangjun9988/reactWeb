var React = require('react');
// 我的任务
var MyTaskList = React.createClass({
	render: function(){

		return (
			 <div className="myTaskList-wp">
			 	<div className="userInfo">
					<div className="uImg">
						<img src={this.props.data.uImg} />
					</div>
					<div className="uInfo">
						<h2>{this.props.data.uName}</h2>
						<span>{this.props.data.uClass}</span>
					</div>
				</div>
				<img src="/images/userTaskBg.jpg" />
			 </div>
			);
	}
});

module.exports = MyTaskList;