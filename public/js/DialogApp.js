import React from 'react';
import FormsBox from './components/dialog/Forms-box.react';
import DialogBox from './components/dialog/Dialog-box.react';	

export default class DialogApp extends React.Component {
    render() {
        return (
			<div id="dialog-wp">
				<DialogBox>
                    <FormsBox 
                        taskId={this.props.taskId}
                        taskClass={this.props.taskClass} />
                </DialogBox>
			</div>
			);
    }
}