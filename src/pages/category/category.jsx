import React, { Component } from 'react';
import { Button, Card, Icon, Table, message, Modal } from 'antd';
import { reqCategorys, reqUpdataCategorys, reqAddCategorys } from "../../api/index";
import LinkButton from '../../components/link-button';
import AddForm from "./add-form";
import UpdataForm from './updata-form';

class Category extends Component {
  constructor(props) {
    super(props);
    this.initColums()
  }

  state = {
    categorys: [], //一级分类列表
    loading: false, //是否正在加载中
    subCategorys: [], //二级分类列表
    parentId: '0',//当前需要显示的分类列表的parentId
    parentName: '',//当前需要显示的分类列表的父分类名称
    showStatus: 0,//显示弹窗状态 0，不显示 1，显示添加，2，显示修改
  }

  /**
   * 初始化表格头部
   */
  initColums = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => { this.showUpdata(category) }}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
          </span>
        )
      }
    ];
  }

  /**
   * 显示指定一级分类的二级分类列表
   */
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      this.getCategorys()
    })
  }

  /**
   * 获取一级分类列表/获取二级分类列表
   */
  getCategorys = async (parentId) => {
    this.setState({
      loading: true
    })
    //发送异步请求获取数据
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取分类列表失败！')
    }
    // console.log(this.state);
  }

  /**
   * 显示一级分类列表
   */
  showFirstCategorys = () => {
    //更新为显示一级列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  /**
   * 显示添加的弹框
   */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /**
   * 添加分类
   */
  addCategory = () => {

    this.form.validateFields(async (err, value) => {
      if (!err) {
        // 收集数据 提交请求
        const { parentId, categoryName } = value
        // this.form.resetFields()
        const result = await reqAddCategorys(parentId, categoryName)
        if (result.status === 0 && parentId === this.state.parentId) {
          if (parentId === this.state.parentId) {
            // 重新获取分类列表
            this.getCategorys()
          } else if (parentId === '0') { //二级列表下添加一级分类，重新获取一级分类，但是不需要显示
            this.getCategorys('0')
          }
        }
        // 重新获取列表分类显示
        this.setState({
          showStatus: 0
        })
      }
    })
  }

  /**
   * 显示修改分类的弹框
   */
  showUpdata = (category) => {
    //保存分类状态
    this.category = category
    //更新状态
    this.setState({
      showStatus: 2
    })
  }

  /**
   * 修改分类
   */
  updataCategory = () => {

    this.form.validateFields(async (err, value) => {
      if (!err) {
        const categoryId = this.category._id
        const { categoryName } = value

        // 清除输入数组
        this.form.resetFields()

        const result = await reqUpdataCategorys(categoryId, categoryName)
        if (result.status === 0) {
          // 重新加载列表
          this.getCategorys()
        }
        this.setState({
          showStatus: 0
        })
      }
    })

  }

  /**
   * 关闭弹框
   */
  handleCancel = () => {
    // 清除输入数组
    this.form.resetFields()

    this.setState({
      showStatus: 0
    })
  }


  /**
   * 生命周期组件挂载渲染完成时
   * 可发送异步请求
   * 只执行一次
   */
  componentDidMount() {
    this.getCategorys()
  }


  render() {
    //读取状态
    const { parentId, parentName, loading, categorys, subCategorys, showStatus } = this.state
    const category = this.category || { name: "" }
    //card左侧
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showFirstCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    )
    // cart右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra} bordered loading={loading}>
        <Table rowKey='_id' pagination={{ defaultPageSize: 5, showQuickJumper: true }} dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns} />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm categorys={categorys} parentId={parentId} setForm={(form) => { this.form = form }} />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updataCategory}
          onCancel={this.handleCancel}
        >
          <UpdataForm categoryName={category.name} setForm={(form) => { this.form = form }} />
        </Modal>
      </Card>
    );
  }
}

export default Category;