var React = require('react');
// 页脚
var Footer = React.createClass({
	render: function(){
		return (
			 <footer className="footer">
			 	<div>
			 		<dl>
						<dt>怎样接单？</dt>
						<dd>打开接单页，仔细阅读接单信息后，
						下拉至底部，点击“我要接单”的按钮，
						登录或注册后即可接单。</dd>
					</dl>
					<dl>
						<dt>如何知道自己是否成功接单？</dt>
						<dd>请注意单子的结束截点。在你填写接单信息确认接单后，
						客服人员会在结束时间截点前一天通知你的接单情况。
						（根据你所填联系方式与你取得联系）</dd>
					</dl>
					<dl>
						<dt>地址或者电话填写有误，如何修改？</dt>
						<dd>
							<p>1、拨打客服电话</p>
							<p>2、发送邮件到客服邮箱</p>
							<p>3、联系客服QQ</p>
						</dd>
					</dl>
			 	</div>
				<ul>
					<li><strong className="wx-qq"></strong>一起编客服QQ：3074278236</li>
					<li><strong className="wx-plane"></strong>一起编客服邮箱：yiqibian@sobey.com</li>
					<li><strong className="wx-clock2"></strong>工作时间：工作日09:00-20:00</li>
				</ul>
				<p>
				<span><a href="/goldindex"><img lassName="wx-logo" alt="一起编" src="/images/logo2.svg" /></a></span>
					<strong>视频创作者制作及传播平台</strong>
					www.yiqibian.com
				</p>
			 </footer>
			);
	}
});

module.exports = Footer;