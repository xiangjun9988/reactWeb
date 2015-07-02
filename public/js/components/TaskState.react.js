var React = require('react');
// 任务状态名
var TaskState = React.createClass({
	render: function(){
		var Text = this.props.data.taskState === 0 ? '进行中' : '已结束';
		return (
			 <div className="taskState-wp">
			 	<div>
			 		<h3>
			 			<strong>{Text}</strong>
			 			<span>
			 			{this.props.data.taskEndTime}
			 			截至
			 			</span>
			 		</h3>
			 		<h2>{this.props.data.taskTilte}</h2>
			 	</div>
			 </div>
			);
	}
});

module.exports = TaskState;