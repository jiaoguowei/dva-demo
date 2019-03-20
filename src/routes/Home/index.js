import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { injectIntl } from 'react-intl'
import ComButton from '../../components/Button'
import styles from './index.less'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.format = this.props.intl.formatMessage
    this.choosePlatform = this.format({id: 'pfnav_choose_platform'}) // 选择平台
    this.addpage = this.format({id: 'addpage'}) // 添加主页
  }
  componentDidMount(){
    console.log('-----', this.props)
    console.log('++++',this.props.loading)
    console.log('-------', this.choosePlatform, this.addpage)
    const { dispatch } = this.props
    dispatch({type:'home/getList', payload: ''})
  }
  render(){
    const { value } = this.props.home
    return (
      <div>
        这是主页 
        <p>这是段落test</p>
        <Link to="/about">About</Link>
        <h1 className={styles.title}>{ value }</h1>
        <ComButton></ComButton>
      </div>
    )
  }
}

export default connect(({ home, loading }) => ({
  home,
  loading
}))(injectIntl(Home))