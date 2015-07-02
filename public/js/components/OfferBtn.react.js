var React = require('react'),
    DialogApp = require('../DialogApp.js');
// 报价接单
var OfferBtn = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        if(this.props.data.taskState == 0){
            React.render(
            <DialogApp 
                taskId={this.props.data.taskId}
                taskClass={this.props.data.taskClass} />,
            document.getElementById('aside2')
            );
        }
    },
	render: function(){
        var Text = this.props.data.taskClass == 1 ? '报价接单' : '我要接单';
		return (
			 <div className="offerBtn-wp">
             <button onTouchEnd={this.handleClick}>{Text}</button>
			 </div>
			);
	}
});

module.exports = OfferBtn;