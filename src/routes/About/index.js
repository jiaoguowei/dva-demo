import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount(){
  }
  handleClick() {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/home'))
  }
  render(){
    return (
      <div>
        这是关于onesight介绍页面
        <h2 onClick={this.handleClick}>回到主页</h2>
      </div>
    )
  }
}

export default connect()(About)