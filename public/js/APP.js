import React from 'react';
import DialogApp from './DialogApp';
import Header from './components/Header.react';
import Footer from './components/Footer.react';
import Banner from './components/Banner.react';
import Navigation from './components/Navigation.react';
import Recommend from './components/Recommend.react';
import Task from './components/Task.react';
import TaskState from './components/TaskState.react';
import UserInfo from './components/UserInfo.react';
import OtherExplain from './components/OtherExplain.react';
import TaskIntro from './components/TaskIntro.react';
import ContactUs from './components/ContactUs.react';
import UserSide from './components/UserSide.react';
import Capital from './components/Capital.react';
import Notice from './components/Notice.react';
import NoticeList from './components/NoticeList.react';
import LoveList from './components/LoveList.react';
import MyTaskList from './components/MyTaskList.react';
import MyTask from './components/MyTask.react';
import MessageList from './components/MessageList.react';
import MsgInfoList from './components/MsgInfoList.react';
import OfferBtn from './components/OfferBtn.react';
import { Router, Route, RouteHandler, NotFoundRoute, run, HashLocation } from 'react-router';

// 首页
var IndexPage = React.createClass({
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
				<dt>
					<h2>
						<a href={a.url}>{a.classTitle}</a>
						<a href={a.url}><span className="wx-min_bottom"></span></a>
					</h2>
				</dt>
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
});

// 例表页
var TaskListPage = React.createClass({
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
});

// 任务祥情
var TaskPage = React.createClass({
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
});

// 余额页
var CapitalPage = React.createClass({
	render: function(){
		return (
			<div id="capital" className="container">
				<Header />
				<Capital data={this.props.data} />
			</div>
		);
	}
});

// 公告例表
var	NoticeListPage = React.createClass({
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
});

// 收藏例表
var	LoveListPage = React.createClass({
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
});

// 消息例表
var	MessageListPage = React.createClass({
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
});

// 我的任务例表
var	MyTaskListPage = React.createClass({
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
});

// 我的任务页
var	MyTaskPage = React.createClass({
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
});
var pages = {
	IndexPage: IndexPage,
	TaskListPage: TaskListPage,
	TaskPage: TaskPage,
	CapitalPage: CapitalPage,
	NoticeListPage: NoticeListPage,
	LoveListPage: LoveListPage,
	MessageListPage: MessageListPage,
	MyTaskListPage: MyTaskListPage,
	MyTaskPage: MyTaskPage
}
export default pages;

var App = React.createClass({
	getInitialState: function(){
		return {
			message: ''
		}
	},
	componentDidMount: function () {
	    from the path `/inbox/messages/:id`
	    var id = this.props.params.id;
	    fetchMessage(id, function (err, message) {
	      this.setState({ message: message });
	    })
	    console.log(this.props);
 	},
	render: function(){
		return (
			<div>
				<RouteHandler data={data} />
			</div>
		);
	}
});

var routes = (
  <Route handler={App}>
  		<Route path="/" handler={IndexPage}/>
  		<Route path="list/:class" handler={TaskListPage} />
  		<Route path="Task/:TaskID" handler={TaskPage} />
  		<Route path="Capital/:userID" handler={CapitalPage} />
  		<Route path="NoticeList/:userID" handler={NoticeListPage} />
  		<Route path="LoveList/:userID" handler={LoveListPage} />
  		<Route path="MessageList/:userID" handler={MessageListPage} />
  		<Route path="MyTaskList/:userID" handler={MyTaskListPage} />
  		<Route path="MyTask/:userID" handler={MyTaskPage} />
  </Route>
);
run(routes,HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('react'));
});