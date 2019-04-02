import React from 'react';
import {connect} from 'dva';
class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}><h1>地址栏输入map进入地图demo</h1></div>
        <div style={{textAlign:'center'}}><h1>地址栏输入video进入视频上传demo</h1></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Test);
