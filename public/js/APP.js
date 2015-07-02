var React = require('react'),
	DialogApp = require('./DialogApp.js'),
	Header = require('./components/Header.react.js'),
	Footer = require('./components/Footer.react.js'),
	Banner = require('./components/Banner.react.js'),
	Navigation = require('./components/Navigation.react.js'),
	Recommend = require('./components/Recommend.react.js'),
	Task = require('./components/Task.react.js'),
	TaskState = require('./components/TaskState.react.js'),
	UserInfo = require('./components/UserInfo.react.js'),
	OtherExplain = require('./components/OtherExplain.react.js'),
	TaskIntro = require('./components/TaskIntro.react.js'),
	ContactUs = require('./components/ContactUs.react.js'),
	UserSide = require('./components/UserSide.react.js'),
	Capital = require('./components/Capital.react.js'),
	Notice = require('./components/Notice.react.js'),
	NoticeList = require('./components/NoticeList.react.js'),
	LoveList = require('./components/LoveList.react.js'),
	MyTaskList = require('./components/MyTaskList.react.js'),
	MyTask = require('./components/MyTask.react.js'),
	MessageList = require('./components/MessageList.react.js'),
	MsgInfoList = require('./components/MsgInfoList.react.js'),
	OfferBtn = require('./components/OfferBtn.react.js');

var Pages = {
	// 首页
	IndexPage : React.createClass({
		render: function(){
			var TaskList = this.props.data.TaskClass.map(function(a,i){
				var recommend = a.recommend.map(function(a,i){
					return (<Recommend key={'recommend'+i} data={a} />);
				});
				var List = a.TaskList.map(function(a,i){
					return (
						<li><Task key={'List'+i} data = {a} /></li>
						);
				});
				var styles;
				if(a.TaskList.length <= 0 && a.recommend.length <= 0){
					styles = {
						display:'none'
					}
				}
				var Classes = a.recommend.length ===1 ? 'clearfix recommend-wp one' : 'clearfix recommend-wp two';
				return (
					<dl style={styles} key={'Index'+i} className="modules">
					<dt><h2><a href={a.url}>{a.classTitle}</a><a href={a.url}><span className="wx-min_bottom"></span></a></h2></dt>
						<dd>
							<div className = {Classes}>
								{recommend}
							</div>
							<ul>
						         {List}
							</ul>
						</dd>
					</dl>
					);
			});
			return (
				<div id="index" className="container">
					<Header HeaderV="true" data = {this.props.data.userNav}/>
					<Banner ImgInfo={this.props.data.imgUrl} />
					<dl className="modules">
					<dt><h2><a href="/goldindex">全部分类</a></h2></dt>
						<dd>
							<Navigation data={this.props.data.navData} />
						</dd>
					</dl>

					{TaskList}

					<dl className="modules">
						<dt><h2>常见问题</h2></dt>
						<dd>
							<Footer />
						</dd>
					</dl>
				</div>
				);
		}
	}),
	// 任务例表
	TaskListPage : React.createClass({
		componentDidMount: function(){
			var range = 50; //距下边界长度/单位px
			var elemt = 500; //插入元素高度/单位px
			var maxnum = 20; //设置加载最多次数
			var num = 1;
			var totalheight = 0;
			window.onscroll =  function(){
				var srollPos = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距顶部距离(页面超出窗口的高度)
				totalheight = parseFloat(window.screen.height) + parseFloat(srollPos);
				console.log(window.screen.height,srollPos,totalheight)

				if((document.body.scrollHeight-range) <= totalheight && num != maxnum) {
					console.log(1)
					num++;
				}
			}
		},
		_backTop: function(){
			window.scrollTo(0,0)
		},
		render: function(){
			var TaskList = this.props.data.TaskClass.map(function(a,i){
				var recommend = a.recommend.map(function(a,i){
					return (<Recommend key={i} data={a} />);
				});
				var List = a.TaskList.map(function(a,i){
					return (
						<li><Task key={i} data = {a} /></li>
						);
				});
				var Classes = a.recommend.length ===1 ? 'clearfix recommend-wp one' : 'clearfix recommend-wp two';
				return (
					<dl className="modules">
						<dt><h2>{a.classTitle}<a href="#"><span className="wx-min_bottom"></span></a></h2></dt>
						<dd>
							<div className = {Classes}>
								{recommend}
							</div>
							<ul>
						         {List}
							</ul>
						</dd>
					</dl>
					);
			});
			return (
				<div id="taskList" className="container">
					<Header HeaderV="true" data = {this.props.data.userNav}/>
					<Banner ImgInfo={this.props.data.imgUrl} />
					<dl className="modules">
						<dt><h2>全部分类<a href=""><span className="wx-min_bottom"></span></a></h2></dt>
						<dd>
							<Navigation data={this.props.data.navData} />
						</dd>
					</dl>
					{TaskList}
					<p onTouchEnd={this._backTop}>回到顶部</p>
				</div>
				);
		}
	}),
	// 任务祥情
	TaskPage : React.createClass({
		render: function(){
			var classes = 'container';
			if(this.props.data.TaskInfo.taskState==1){
				var classes = 'container stateZhong';
			}
			if(this.props.data.TaskInfo.taskState==2){
				var classes = 'container stateUnfinished';
			}
			if(this.props.data.TaskInfo.taskState==3){
				var classes = 'container stateEnd';
			}
			return (
				<div id="task" className={classes}>
					<Header />
					<Banner
					ImgInfo={this.props.data.imgUrl} />
					<UserInfo
					data={this.props.data.UserInfo} />
					<TaskState
					data={this.props.data.TaskInfo} />
					<TaskIntro
					data={this.props.data.TaskInfo} />
					<OtherExplain
					data={this.props.data.TaskInfo} />
					<ContactUs />
					<OfferBtn
					data={this.props.data.TaskInfo} />
				</div>
			)
		}
	}),
	// 余额页
	CapitalPage : React.createClass({
		render: function(){
			return (
				<div id="capital" className="container">
					<Header />
					<Capital data={this.props.data} />
				</div>
				);
		}
	}),
	// 公告例表
	NoticeListPage : React.createClass({
		render: function(){
			var noticeList = this.props.data.map(function(a,i){
					return (
						<li key={i} ><NoticeList data={a} /></li>
						);
			});
			return (
				<div id="noticeList" className="ccontainer">
					<Header />
					<ul>
						{noticeList}
					</ul>

				</div>
				);
		}
	}),

	// 公告页
	NoticePage : React.createClass({
		render: function(){
			return (
				<div id="notice" className="ccontainer">
					<Header />
					<Notice data={this.props.data} />
				</div>
				);
		}
	}),

	// 收藏例表
	LoveListPage : React.createClass({
		render: function(){
			var loveList = this.props.data.map(function(a,i){
					return (
						<li key={i} ><LoveList data={a} /></li>
						);
			});
			return (
				<div id="LoveList" className="container">
					<Header />
					<ul>
						{loveList}
					</ul>
				</div>
				);
		}
	}),

	// 消息例表
	MessageListPage: React.createClass({
		render: function(){
			var List = this.props.data.map(function(i,a){
				return <MessageList key={a} msgInfo = {i} />;
			});
			return (
				<div id="MessageList" className="container">
					<Header />
					{List}
				</div>
				);
		}
	}),

	// 消息祥情
	MessagePage: React.createClass({
		render: function(){
			var List = this.props.data.map(function(a,i){
				return <li><MsgInfoList key={i} data = {a} /></li>;
			});
			return (
				<div id="dataPage" className="container">
					<Header />
					<ul>
						{List}
					</ul>
				</div>
				);
		}
	}),

	// 我的任务例表
	MyTaskListPage : React.createClass({
		render: function(){
			var List = this.props.data.TaskList.map(function(a,i){
				return <li><Task key={i} data = {a} /></li>;
			});
			return (
				<div id="myTaskList" className="container">
					<Header />
					<MyTaskList data={this.props.data.UserInfo} />
					<ul>
						{List}
					</ul>
				</div>
				);
		}
	}),

	// 我的任务页
	MyTaskPage : React.createClass({
		render: function(){
			var classes = 'container';
			if(this.props.data.taskState == 0){
				classes = 'container failure';
			}
			if(this.props.data.taskState == 1){
				classes = 'container success';
			}
			if(this.props.data.taskState == 2){
				classes = 'container zhong';
			}
			return (
				<div id="myTask" className={classes}>
					<Header />
					<MyTask data={this.props.data} />
				</div>
				);
		}
	})
}


module.exports = Pages;
if(document.getElementById('react')){
React.render(
	<Pages.IndexPage data={data} />,
	document.getElementById('react')
	);
}
if(document.getElementById('TaskPage')){
	React.render(
	<Pages.TaskPage data={data} />,
	document.getElementById('TaskPage')
	);
}
if(document.getElementById('TaskListPage')){
	React.render(
	<Pages.TaskListPage data={data} />,
	document.getElementById('TaskListPage')
	);
}
if(document.getElementById('CapitalPage')){
	React.render(
	<Pages.CapitalPage data={data} />,
	document.getElementById('CapitalPage')
	);
}
if(document.getElementById('NoticePage')){
	React.render(
	<Pages.NoticePage data={data} />,
	document.getElementById('NoticePage')
	);
}
if(document.getElementById('NoticeListPage')){
	React.render(
	<Pages.NoticeListPage data={data} />,
	document.getElementById('NoticeListPage')
	);
}
if(document.getElementById('LoveListPage')){
	React.render(
	<Pages.LoveListPage data={data} />,
	document.getElementById('LoveListPage')
	);
}
if(document.getElementById('MessageListPage')){
	React.render(
	<Pages.MessageListPage data={data} />,
	document.getElementById('MessageListPage')
	);
}
if(document.getElementById('MessagePage')){
	React.render(
	<Pages.MessagePage data={data} />,
	document.getElementById('MessagePage')
	);
}
if(document.getElementById('MyTaskListPage')){
	React.render(
	<Pages.MyTaskListPage data={data} />,
	document.getElementById('MyTaskListPage')
	);
}
if(document.getElementById('MyTaskPage')){
	React.render(
	<Pages.MyTaskPage data={data} />,
	document.getElementById('MyTaskPage')
	);
}
