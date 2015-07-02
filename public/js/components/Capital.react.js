var React = require('react');
// 余额
var Capital = React.createClass({
	render: function(){
		return (
			 	<div className="capital-wp">
			 	  <div>
			        余额:<strong>{this.props.data.capital}</strong>元
			      </div>
			      <p>为了您的资金安全请到一起编网站管理你的资金账户。</p>
			 	</div>
			);
	}
});

module.exports = Capital;