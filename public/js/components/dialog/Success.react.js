import React from 'react';
// 报名成功
export default class Success extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick(e){
		e.preventDefault();
		if(this.props.successInfo.successUrl){
			window.location.href=this.props.success.successUrl;
			return;
		}
		var unDom = document.getElementById('dialog-wp').parentNode;
		React.unmountComponentAtNode(unDom);
	}
	render(){
		return (
			<form id="ApplySuccess" className="fadeIn animated">
				<fieldset>
					<legend>{this.props.successInfo.successTitle}</legend>
					<p dangerouslySetInnerHTML={
							{__html:this.props.successInfo.successText
						}}></p>
					<a className="btn" 
						onClick={this.handleClick.bind(this)} 
						href="#">确 定</a>
				</fieldset>
			</form>
		);
	}
}