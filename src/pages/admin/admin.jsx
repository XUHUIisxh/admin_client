import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import Header from '../../components/header/header';
import LeftNav from '../../components/left-nav/leftNav';

import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Footer, Sider, Content } = Layout;


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to="/login/" />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: '#ffffff', margin: '20px' }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/cahrts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#999' }}>推荐使用谷歌浏览器，获取更佳体验！</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;