var React = require('react');
// 联系我们
var ContactUs = React.createClass({
	render: function(){
		return (
			 <ul className="contactUs-wp">
				<li>联系我们：<a href="http://wpa.qq.com/msgrd?v=1&amp;uin=3074278236&amp;site=一起编&amp;menu=yes">QQ在线</a></li>
				<li>客服邮箱：yiqibian@sobey.com</li>
				<li>工作时间：工作日09:00-20:00</li>
			 </ul>
			);
	}
});

module.exports = ContactUs;