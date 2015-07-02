var React = require('react');
// 我的任务状态
var MyTask = React.createClass({
	render: function(){
		var data = this.props.data;
		var classes = 'time state'+data.Timelist.state;
		var stateInfo;
		if(data.taskState===0){
			stateInfo = <h2><i className="wx-close"></i>未中标</h2>;
		}
		if(data.taskState===1){
			stateInfo = <h2><i className="wx-tick"></i>已中标</h2>;
		}
		if(data.taskState===2){
			stateInfo = <h2><i className="wx-tick"></i>接单成功<strong>您已接单成功,请耐心等待结果</strong></h2>;
		}
		return (
			 <div className="myTask-wp">
			 	<div className="taskState">
		            {stateInfo}
		        </div>
		          <div className="taskTilte">
	            <h3>{data.taskTilte}</h3>
	            <strong>
	              <span className="info">{data.taskTime}</span>
	              <span className="info">任务类型：{data.taskClass}</span>
	              <span className="info">任务赏金：<em>{data.taskPrice}</em></span>
	            </strong>
	          </div>
	          <p className="taskInfo">
	            {data.taskIntro}
	          </p>
	          <ul className={classes}>
	            <li>
	              <strong>{data.Timelist.state1}</strong>
	            </li>
	            <li>
	              <strong>{data.Timelist.state2}</strong>
	            </li>
	            <li>
	              <strong>{data.Timelist.state3}</strong>
	            </li>
	          </ul>
			 </div>
			);
	}
});

module.exports = MyTask;