var React = require('react'),
	Search = require('./Search.react.js'),
	UserSide = require('./UserSide.react.js');
// 头部
var Header = React.createClass({
	getInitialState: function(){
		return {
			isSearch:false,
			isShowUSide:false
		}
	},
	componentDidMount: function(){
        if(this.props.HeaderV){
            React.render(
                <UserSide data = {this.props.data} />,
                document.getElementById("aside")
                );
        }
	},
	_ShowUserSide: function(){
		this.setState({
			isShowUSide:!this.state.isShowUSide
		});
		document.getElementsByTagName('html')[0].className=this.state.isShowUSide ? '' : "OpenNav";
		document.getElementById('react').style.transition = '-webkit-transform 300ms ease';
		document.getElementById('react').style.webkitTransform = this.state.isShowUSide ? 'translate3d(0px, 0px, 0px)' : 'translate3d(235px, 0px, 0px)';
		document.getElementById('react').style.mozTransform = this.state.isShowUSide ? 'translate3d(0px, 0px, 0px)' : 'translate3d(235px, 0px, 0px)';
		document.getElementById('react').style.transform = this.state.isShowUSide ? 'translate3d(0px, 0px, 0px)' : 'translate3d(235px, 0px, 0px)';
	},
	_ShowState: function(){
        document.getElementsByTagName('html')[0].className="OpenNav";
		React.render(
			<Search />,
			document.getElementById("aside2")
			);
	},
	_Goback: function(){
		history.back();
	},
	render: function(){
		return (
			 <header id="header" className={this.props.HeaderV ? '' : 'subpage'}>
		        <button onTouchEnd={this.props.HeaderV ? this._ShowUserSide : this._Goback} className="fl"><span className={this.props.HeaderV ? "wx-bars" :  'wx-block'}></span></button>
		        <button onTouchEnd={this._ShowState} className="fr"><span className="wx-Search"></span></button>
		        <h1><a href="/goldindex"><img lassName="wx-logo" src="/images/logo.svg" /><strong>一起编</strong></a></h1>
		     </header>
			);
	}
});

module.exports = Header;