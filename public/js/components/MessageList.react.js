/* 
* @Author: hexiao-o
* @Date:   2015-06-06 20:50:15
* @Last Modified by:   anchen
* @Last Modified time: 2015-06-07 23:35:56
*/

var React = require('react');
// 消息例表
var MessageList = React.createClass({
    render: function(){
        return (
            <div className="messageList-wp clearfix">
                <a href={this.props.msgInfo.msgUrl}>
                  <div className="message-pic">
                    <img src={this.props.msgInfo.msgImg} />
                  </div>
                  <div className="message-info">
                      <h2>{this.props.msgInfo.msgTitle}<strong>{this.props.msgInfo.msgTime}</strong></h2>
                      <strong>{this.props.msgInfo.msgText} </strong>
                      <em>{this.props.msgInfo.msgSum}</em>
                  </div>
                </a>
            </div>
            );
    }
});

module.exports = MessageList;