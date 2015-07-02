var React = require('react');
// 任务
var Task = React.createClass({
	render: function(){
		var classes = this.props.data.taskState == 0 ? 'task-state task-end' : 'task-state task-underway';
		var re = /^[0-9]+.?[0-9]*$/;
		var Text = re.test(this.props.data.taskPrice) ? '价格：'+this.props.data.taskPrice+'元' : this.props.data.taskPrice;
		return (
			<a className="task-wp" href={this.props.data.taskUrl}>
				<div className="clearfix com-cnt">
					<div className="task-pic">
						<strong className={classes}></strong>
						<img data-src="" alt="" className="" src={this.props.data.taskImg} />
					</div>
					<div className="task-info clearfix">
						<h3 className="task-title">{this.props.data.taskTilte}</h3>
						<div className="task-intro">{this.props.data.taskIntro}</div>
						<span className="task-price">{Text}</span>
					</div>
				</div>
			</a>
			);
	}
});

module.exports = Task;