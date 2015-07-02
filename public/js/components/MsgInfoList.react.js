/* 
* @Author: hexiao-o
* @Date:   2015-06-06 20:50:15
* @Last Modified by:   anchen
* @Last Modified time: 2015-06-18 10:41:40
*/

var React = require('react');
// 消息例表
var MsgInfoList = React.createClass({
    render: function(){
        return (
            <div className="msgInfoList-wp clearfix">
                <h2>{this.props.data.msgTime}</h2>
                  <div className="msgInfoList-pic">
                    <img src={this.props.data.msgImg} />
                  </div>
                  <div className="msgInfoList-info">
                      <strong>{this.props.data.msgText} </strong>
                  </div>
            </div>
            );
    }
});

module.exports = MsgInfoList;