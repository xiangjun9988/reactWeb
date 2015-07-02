var React = require('react');
// 内容简介
var OtherExplain = React.createClass({
	render: function(){
		var styles = {
			display:this.props.data.otherExplai == '' ? 'none' : 'block'
		}
		return (
			 	<div style={styles} className="otherExplain-wp">
			 		<h5>其它说明：</h5>
			 		<div>
			 		{this.props.data.otherExplai}
			 		</div>
			 	</div>
			);
	}
});

module.exports = OtherExplain;