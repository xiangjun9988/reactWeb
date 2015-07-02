var React = require('react');
var $ = require('ajax');
// 收藏例表
var LoveList = React.createClass({
	getInitialState: function(){
		return {
			isSwiper:false,
			index:0,
			bwidth:0,
			iwidth:0,
			startX:0,
			moveX:0,
			endX:0,
			time:300,
			opacity:1
		}
	},
	getDefaultPropt: function(){
		return {}
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
		var BannerW = parseInt(this.refs.loveList.getDOMNode().clientWidth);
		this.setState({
			iwidth :BannerW,
			time: 0
		});
		window.addEventListener('resize', this.handleResize);
	},
	handleResize: function(){
		var BannerW = parseInt(this.refs.loveList.getDOMNode().clientWidth);
		this.setState({
			iwidth :BannerW
		});
	},
	_onTouchStart: function(e){
		e.cancelable=false;
		var startX= e.touches[0].clientX;
		var startY= e.touches[0].clientY;
		this.setState({
			isSwiper:true,
			startX:startX,
			time: 0
		});
		// document.ontouchmove = function(e){ e.preventDefault(); };
	},
	_onTouchMove: function(e){
		e.cancelable=false;
		if(this.state.isSwiper){
			var moveX = (this.state.startX - e.touches[0].clientX)+this.state.endX;
			if(moveX > 90){
				moveX = 90;
			}
			if(moveX < 0 ){
				moveX = 0;
			}
			this.setState({moveX:moveX});
			
		}
	},
	_onTouchEnd: function(e){
		e.cancelable=false;
		var index = Math.round(this.state.moveX/90);
		var moveX = 0;
		if( index > 0 ) {
            moveX = 90;
		}
		// if(index < 0 ){
  //           moveX = 0;
		// }
		this.setState({
			isSwiper:false,
			moveX: moveX,
			endX: moveX,
			time:300
		});
		document.ontouchmove = null;
	},
	_handleLove: function(e){
		var taskid = this.props.data.taskId;
		$.post('/loveyoudele',{taskid:taskid},function(data){
			if(data===1){
				setTimeout(function(){
				this.setState({opacity:0});
				}.bind(this),300);
			}
		}.bind(this));
	},
	render: function(){
		var move ={
			width: this.state.iwidth,
			marginLeft: -this.state.moveX,
			transition: 'margin ' + this.state.time +'ms',
			WebKitTransition: 'margin ' + this.state.time +'ms'
		}
		var data = this.props.data;
		var styles = {
			opacity:this.state.opacity,
			display:this.state.opacity==0 ? 'none' : 'block'
		}
		return (
			<div ref="loveList" style={styles} className="loveList-wp clearfix"
			 		 onTouchStart={this._onTouchStart}
					 onTouchMove = {this._onTouchMove}
					 onTouchEnd  = {this._onTouchEnd}>
	            <a style={move} href={data.loveUrl}>
	              <div className="love-pic">
					<img src={data.loveImg} />
	              </div>
	              <div className="love-info">
		              <h2>{data.loveTitle}<strong>{data.loveTime}</strong></h2>
		              <strong>{data.loveIntro}</strong>
	              </div>
	            </a>
				<button data-taskId={data.taskId} onTouchEnd={this._handleLove}>删除</button>
			</div>
			);
	}
});

module.exports = LoveList;