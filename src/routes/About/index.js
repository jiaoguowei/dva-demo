import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { getObjectURL } from '../../utils/utils'

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }
  componentDidMount(){
    this.imgBox = document.getElementById("imgBox")
  }
  handleClick() {
    const { dispatch } = this.props
    dispatch(routerRedux.push('/home'))
  }
  handleSubmit(e) {
    console.log(getObjectURL(this.fileInput.files[0]))
    console.log(this.fileInput.files)
    e.preventDefault();
    alert(
      `Selected file - ${this.fileInput.files[0].name}`
    )
  }
  handleUpload() {
    const that = this
    let reader = new FileReader();
    reader.readAsDataURL(this.fileInput.files[0]);
    reader.onload = function() {
      that.imgBox.src = this.result
    }
  }
  render(){
    return (
      <div>
        这是关于onesight介绍页面
        <h2 onClick={this.handleClick}>回到主页</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input
              type="file"
              ref={input => {
                this.fileInput = input;
              }}
              onChange={this.handleUpload}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <img src="" alt="" id="imgBox"/>
      </div>
    )
  }
}

export default connect()(About)