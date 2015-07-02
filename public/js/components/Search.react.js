var React = require('react'),
	$ = require('ajax');
// 搜索
var Search = React.createClass({
	getInitialState: function(){
		return{
			contents:'',
			page:1,
			searchInfo:[{url:"#","icon":"wx-fire","Text":"热门搜索"}],
			searchStyle:{
				width:'',
				height:''
			}
		}
	},
	componentWillMount: function(){
	},
	componentDidMount: function(){
		this.setState({
			searchStyle:{
				width:document.body.clientWidth,
				height:window.screen.availHeight
			}
		});
		this._ajax('/hotsearch');
		window.addEventListener('resize', this.handleResize);
	},
	_ajax: function(url,data){
		$.post(url,data,function(data){
			var data = data;
			if(data == ''){
				data=[{url:"#","icon":"","Text":"没有更多内容了！"}];
			}
			this.setState({
				searchInfo:this.state.searchInfo.concat(data),
				page: data=='' ? this.state.page+1 : 1
			});
		}.bind(this))
	},
	componentWillUnmount: function(){
		document.getElementsByTagName('html')[0].className="";
	},
	handleSearch: function(e){
		this.setState({
			contents:e.target.value,
			searchInfo:[]
		});
	},
	handleSubmit: function(e){
		e.preventDefault();
		var data ={
			key:this.state.contents,
			page:this.state.page
		}
		this._ajax('/search',data);
	},
	handleResize: function(){
		this.setState({
			searchStyle:{
				width:document.body.clientWidth,
				height:window.screen.availHeight
			}
		});
	},
	_HiddeState: function(e){
		e.preventDefault();
		var unDom = document.getElementById('search').parentNode;
		React.unmountComponentAtNode(unDom);
	},
	render: function(){
		var ulStyles = {
			height:this.state.searchStyle.height-45
		}
		var SearchList = this.state.searchInfo.map(function(a,i){
			return (<a key={i} href={a.url}>
						<li>
				 			<span className={a.icon}></span>{a.Text}
				 		</li>
					</a>)
		});
		return (
			 <div id="search" style={this.state.searchStyle} className="search bounceInUp animated">
			 	<form onSubmit={this.handleSubmit}>
			 		<label className="fl" htmlFor="">搜索</label>
			 		<button className="fr" onTouchEnd={this._HiddeState}>返回</button>
			 		<label className="search-input" htmlFor="">
			 			<input onChange={this.handleSearch} 
			 				id="" type="text" 
			 				placeholder="关键字"
			 				value={this.state.contents} />
			 			<button type="submit" className="wx-Search"></button>
			 		</label>
			 	</form>
			 	<ul style={ulStyles}>
			 		{SearchList}
			 	</ul>
			 </div>
			);
	}
});

module.exports = Search;