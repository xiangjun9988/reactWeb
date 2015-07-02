var React = require('react');
// 导航
var Navigation = React.createClass({
	getInitialState: function(){
		return {
			isSwiper:false,
			index:0,
			bwidth:1280,
			iwidth:320,
			startX:0,
			moveX:0,
			endX:0,
			time:300
		}
	},
	componentDidMount: function(){
		var BannerW = parseInt(this.refs.nav.getDOMNode().clientWidth);
		this.setState({
			bwidth:BannerW*(Math.ceil(this.props.data.length/4)),
			iwidth :BannerW,
			time: 0
		});
		var points = document.getElementsByClassName('nav-points')[0].childNodes;
		points[0].className = 'active';
		window.addEventListener('resize', this.handleResize);
	},
	handleResize: function(){
		var BannerW = parseInt(this.refs.nav.getDOMNode().clientWidth);
		this.setState({
			bwidth:BannerW*(Math.ceil(this.props.data.length/4)),
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
		var sumL = Math.ceil(this.props.data.length/4);
		var test = (this.state.moveX - this.state.endX) > 0 ? 0.3 : -0.3;
		var index = Math.round(this.state.moveX/this.state.iwidth + test);
		if( index > 0 ) {
            index = 0;
            var moveX = 0;
		}
		if(index<-sumL+1){
			index=-sumL+1;
            moveX = index*this.state.iwidth+1;
		}
		this.setState({
			isSwiper:false,
			index: Math.abs(index),
			moveX: index*this.state.iwidth,
			endX: index*this.state.iwidth,
			time:300
		});
		var points = document.getElementsByClassName('nav-points')[0].childNodes;
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
			width:this.state.iwidth/4
		}
		var navList = this.props.data.map(function(a,i){
			return (
				<a style={test} key={i} href={a.navUrl}>
					<dl>
						<dt>
						<img data-src="" src={a.navIcon} />
						</dt>
						<dd>
							{a.navName}
						</dd>
					</dl>
				</a>
				);
		});
		var points = [];
		for(var i =0 ; i<Math.ceil(this.props.data.length/4) ; i++){
			points.push(<i key={'points'+i}></i>);
		}
		return (
			<div ref="nav" className="navigation-wp">
				<nav style={move} className="clearfix"
					 onTouchStart={this._onTouchStart}
					 onTouchMove = {this._onTouchMove}
					 onTouchEnd  = {this._onTouchEnd}>
						{navList}
				</nav>
				<div className="nav-points">{points}</div>
			</div>
			);
	}
});

module.exports = Navigation;