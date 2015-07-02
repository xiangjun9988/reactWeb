var React = require('react');
// 推荐
var Recommend = React.createClass({
	render: function(){
		return (
			<a href={this.props.data.taskUrl}>
				 <div className="recommend">
					 <img className="task-img" data-src="" src={this.props.data.taskImg} />
					 <div className="task-title">
					 	{this.props.data.taskTilte}
					 </div>
				 </div>
			 </a>
			);
	}
});

module.exports = Recommend;