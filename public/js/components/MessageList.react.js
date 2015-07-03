/* 
* @Author: hexiao-o
* @Date:   2015-06-06 20:50:15
* @Last Modified by:   anchen
* @Last Modified time: 2015-07-03 15:41:07
*/

var React = require('react');
// 消息例表
var MessageList = React.createClass({
    render: function(){
      var msgInfo = this.props.msgInfo;

      var styles = {
        display: msgInfo.msgSum >0 ? 'block' : 'none'
      };
        return (
            <div className="messageList-wp clearfix">
                <a href={msgInfo.msgUrl}>
                  <div className="message-pic">
                    <img src={msgInfo.msgImg} />
                  </div>
                  <div className="message-info">
                      <h2>{msgInfo.msgTitle}<strong>{msgInfo.msgTime}</strong></h2>
                      <strong>{msgInfo.msgText} </strong>
                      <em style={styles}>{msgInfo.msgSum}</em>
                  </div>
                </a>
            </div>
            );
    }
});

module.exports = MessageList;