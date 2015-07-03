import React from 'react';

// 加载中。。。
export default class Loading extends React.Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextSate) {
        return nextProps != this.props
    }
    render(){
        var loadingInfo = this.props.loadingInfo;
        return (
            <div className="loading-wp" 
                style={
                    {display:loadingInfo.isShow ? 'block' : 'none'}
            }>
                <p>
                <strong>{loadingInfo.LoadingText}</strong>
                </p>
            </div>
            );
    }
}