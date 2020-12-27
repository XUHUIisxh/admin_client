import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';
const { Option } = Select

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.props.setForm(this.props.form)
  }

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired
  }

  render() {
    const { categorys, parentId } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item label='一级分类'>
          {getFieldDecorator('parentId', {
            initialValue: parentId
          })(
            <Select>
              <Option value='0'>一级分类列表</Option>
              {categorys.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)}
            </Select>
          )}

        </Form.Item>
        <Form.Item label='分类名称'>
          {getFieldDecorator('categoryName', {
            initialValue: '',
            rules: [
              { required: true, message: '请输入分类名称！' }
            ]
          })(
            <Input placeholder='请输入分类名称' />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);