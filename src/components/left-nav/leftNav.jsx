import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig';

import logo from '../../assets/images/logo.png';
import './index.less'

const { SubMenu } = Menu;

class leftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getMenuNodes = (menuList) => {

    const path = this.props.location.pathname
    
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        const citem = item.children.find(citem => citem.key === path)
        
        if(citem){
          this.openKey = item.key
        }
        // console.log(item.key,citem,this.openKey);
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {

    this.menuNodes = this.getMenuNodes(menuList)

    const path = this.props.location.pathname

    const openKey = this.openKey
    
    return (
      <div>
        <header className='left-nav'>
          <Link to='/' className='left-nav-header'>
            <img src={logo} alt="" />
            <h1>后台管理</h1>
          </Link>
        </header>
        <Menu
          defaultSelectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(leftNav)
