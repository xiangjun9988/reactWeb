import React from 'react';
import DialogApp from '../DialogApp.js';
import PageAction from '../actions/page-action.js';
// 内容简介
var TaskIntro = React.createClass({
	getInitialState: function(){
		return {
			isLove:this.props.data.isMyLOVE
		}
	},
	_handleLove: function(e){
		e.preventDefault();
		this.setState({
			isLove: true
		});
		PageAction.handleMyLove(this.props.data.taskId);
	},
	render: function(){
		var classes = this.state.isLove ? 'wx-like' : 'wx-Like2';
		return (
			 <div className="taskIntro-wp">
				<h4 className="clearfix">
			 		<strong className="task-price">
			 			{this.props.data.taskPrice}
			 		</strong>
			 		<button onTouchEnd={this._handleLove} 
			 			className="btn-onlive">
			 			<span className={classes}></span>
			 		</button>
				 	</h4>
				 	<div id="task-info" 
				 		dangerouslySetInnerHTML={{__html: this.props.data.taskIntro}}>
				 	</div>
			 </div>
			);
	}
});

module.exports = TaskIntro;