var React = require('react');
// 公告例表
var NoticeList = React.createClass({
	render: function(){
		return (
			<div className="noticeList-wp">
	            <a href={this.props.data.noticeUrl}>
	              <h2>{this.props.data.noticeTitle}<strong>
	              {this.props.data.noticeTime}
	              </strong></h2>
	              <strong>{this.props.data.noticeIntro}</strong>
	            </a>
			</div>
			);
	}
});

module.exports = NoticeList;