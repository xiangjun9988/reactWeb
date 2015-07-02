var React = require('react');
// 公告
var Notice = React.createClass({
	render: function(){
		return (
			<div className="notice-wp">
				<div className="title">
					<h2>{this.props.data.noticeTitle}</h2>
					<span>{this.props.data.noticeTime}</span>
				</div>
				<div id="content" dangerouslySetInnerHTML={{__html: this.props.data.noticeIntro}}>
				</div>
			</div>
			);
	}
});

module.exports = Notice;