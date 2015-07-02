var React = require('react');
// 头部
var Banner = React.createClass({
	getInitialState: function(){
		return {
			isSwiper:false,
			index:0,
			bwidth:5000,
			iwidth:320,
			startX:0,
			moveX:0,
			endX:0,
			time:300
		}
	},
	getDefaultPropt: function(){
		return {}
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
		var BannerW = parseInt(this.refs.banner.getDOMNode().clientWidth);
		this.setState({
			bwidth:BannerW*this.props.ImgInfo.length,
			iwidth :BannerW,
			time: 0
		});
		var points = document.getElementsByClassName('slider-points')[0].childNodes;
		points[0].className = 'active';
		window.addEventListener('resize', this.handleResize);
	},
	handleResize: function(){
		var BannerW = parseInt(this.refs.banner.getDOMNode().clientWidth);
		this.setState({
			bwidth:BannerW*this.props.ImgInfo.length,
			iwidth :BannerW
		});
	},
	_onTouchStart: function(e){
		e.cancelable=false;
		var startX= e.touches[0].clientX;
		this.setState({
			isSwiper:true,
			startX:startX,
			time: 0
		});
		document.ontouchmove = function(e){ e.preventDefault(); };
	},
	_onTouchMove: function(e){
		e.cancelable=false;
		if(this.state.isSwiper){
			var moveX = -(this.state.startX - e.touches[0].clientX)+this.state.endX;
			this.setState({moveX:moveX});
		}
	},
	_onTouchEnd: function(e){
		e.cancelable=false;
		var test = (this.state.moveX - this.state.endX) > 0 ? 0.3 : -0.3;
		var index = Math.round(this.state.moveX/this.state.iwidth + test);
		if( index > 0 ) {
            index = 0;
            var moveX = 0;
		}
		if(index<-this.props.ImgInfo.length+1){
			index=-this.props.ImgInfo.length+1;
            moveX = index*this.state.iwidth+1;
		}
		this.setState({
			isSwiper:false,
			index: Math.abs(index),
			moveX: index*this.state.iwidth,
			endX: index*this.state.iwidth,
			time:300
		});
		var points = document.getElementsByClassName('slider-points')[0].childNodes;
		for(var point = 0 ; point < points.length ; point++){
			points[point].className = '';
		}
			points[Math.abs(index)].className = 'active';
		document.ontouchmove = null;
	},
	render: function(){
		var move ={
			width:this.state.bwidth,
			WebkitTransform:' translate3d('+this.state.moveX+'px, 0, 0)',
			transform:' translate3d('+this.state.moveX+'px, 0, 0)',
			transitionDuration:this.state.time+'ms',
			WebkitTransitionDuration:this.state.time+'ms'
		}
		var test ={
			width:this.state.iwidth
		}
		var imgItem = this.props.ImgInfo.map(function(i,a){
			return (
				<a key={a} href={i.url} 
					style={test} className="slider-item">
					<img data-src="" className="slider-img" alt="" src={i.imgUrl} />
				</a>
				);
		}.bind(this));
		var styles;
		if(this.props.ImgInfo.length <= 1){
			styles = {
				display:'none'
			}
		}
			var points =  this.props.ImgInfo.map(function(i,a){
				return (
					<i style={styles} key={a}></i>
					);
			}.bind(this));
		return (
			 <div ref="banner" className="banner">
				 <div style={move} 
					 onTouchStart={this._onTouchStart}
					 onTouchMove = {this._onTouchMove}
					 onTouchEnd  = {this._onTouchEnd}
					 className="slider-wp clearfix">
					 {imgItem}
				 </div>
				 <div className="slider-points">
				 	{points}
				 </div>
			 </div>
			);
	}
});

module.exports = Banner;