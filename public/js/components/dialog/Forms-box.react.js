import React from 'react';
import AppStore from '../../stores/app-store';
import AppAction from '../../actions/app-action';
import FormsLogin from './Forms-login.react';
import FormsRegister from './Forms-register.react';
import FormsMakeOffer from './Forms-makeOffer.react';
import FormReceiving from './Forms-Receiving.react';
import Success from './Success.react';
import Loading from './Loading.react';
// 对话框
export default class FormsBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			FormsData: AppStore.getForm(),
			top:0
		}
	}
	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this));
		AppAction.showForm(this.props.taskClass);
		this.setState({
			top:(document.body.scrollTop+20)
		});
	}
	componentWillUnmount() {
		AppStore.removeChangeListener(this._onChange.bind(this));
	}
	_onChange() {
		this.setState({
			FormsData: AppStore.getForm()
		});
	}
	handleCloseDialog() {
		var unDom = document.getElementById('dialog-wp').parentNode;
		React.unmountComponentAtNode(unDom);
	}
	render() {
		var DForm;
		var FormsData = this.state.FormsData;
		// 登录
		if(FormsData.isLogin){
			DForm = <FormsLogin 
						ajaxUrl="/logingo"
						taskClass = {this.props.taskClass} />
		}
		// 注册
		if(FormsData.isRegister){
			DForm = <FormsRegister 
						ajaxUrl="/registergo" />
		}
		// 报价
		if(FormsData.isMakeOffer){
			DForm = <FormsMakeOffer
						taskId={this.props.taskId}
						taskClass={this.props.taskClass}
						ajaxUrl="/offerinsert" />
		}
		// 接单
		if(FormsData.isReceiving){
			DForm = <FormReceiving
						taskId={this.props.taskId}
						taskClass={this.props.taskClass}
						ajaxUrl="/offerinsert" />
		}
		// 成功
		if(FormsData.successInfo.isSuccess){
			DForm = <Success 
						successInfo={this.state.FormsData.successInfo} />
		}
		return(
			<div style={{top:this.state.top}} 
				className="bounceInDown animated" id="froms-wp">
				<span onTouchEnd={this.handleCloseDialog} 
						className="wx-close closeDialog" />
					{DForm}
				<Loading loadingInfo={FormsData.loadingInfo} />
			</div>
		);
	}
}