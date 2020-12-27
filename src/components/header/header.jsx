import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import LinkButton from '../link-button/index';
import menuLists from '../../config/menuConfig'
import { fromateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'

import './index.less'
import { Modal } from 'antd';
const { confirm } = Modal;

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: fromateDate(Date.now())
    }
  }

  getTime = () => {
    this.timerId = setInterval(() => {
      const currentTime = fromateDate(Date.now())
      this.setState({ currentTime })
    }, 1000);
  }


  getTitle = () => {
    let path = this.props.location.pathname
    let title
    menuLists.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        let cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  loginOut = () => {
    confirm({
      content: "确认退出登录？",
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}

        this.props.history.replace('/login')

      }
    })
  }

  /**
   * 第一次render（）之后执行一次
   * 一般再次执行异步操作：发送ajax请求/请求定时器
   */
  componentDidMount() {
    this.getTime()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }


  render() {

    const { currentTime } = this.state
    const username = memoryUtils.user.username

    const title = this.getTitle()

    return (<div className="header">
      <div className="header-top">
        <span>欢迎，{username}</span>
        <LinkButton onClick={this.loginOut}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
        </div>
      </div>
    </div>);
  }
}

export default withRouter(header);