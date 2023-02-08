import React, {useState} from 'react';
import {connect} from 'react-redux';
import {NavBar, Form, Input, Button, TextArea} from 'antd-mobile';
import {updateUser} from '../../redux/actions';
import AvatarSelector from '../../components/AvatarSelector';
import {Navigate} from 'react-router-dom';

function LaobanInfo(props) {
  const [avatar, setAvatar] = useState('');
  const onFinish = (value) => {
    value.avatar = avatar;
    props.updateUser(value);
  };
  const getAvatar = (avatarName) => {
    setAvatar(avatarName);
  };

  if (props.user.avatar) {
    const path = props.user.type === 'employee' ? '/home/dashen' : '/home/laoban';
    return <Navigate to={path} />;
  }

  return (
    <div>
      <NavBar className="login-nav" backArrow={false}>Complete Employer Info</NavBar>
      <AvatarSelector getAvatar={getAvatar} />
      <Form className="login-form info-form" onFinish={onFinish} layout='horizontal'
        footer={<Button block type='submit' color='primary' size='large'>Save</Button>}
        validateTrigger="onBlur">
        <Form.Item name='position' label='Postion：'>
          <Input placeholder='Enter Hiring Position' />
        </Form.Item>
        <Form.Item name='company' label='Company：'>
          <Input placeholder='Enter Company Name' />
        </Form.Item>
        <Form.Item name='salary' label='Salary：'>
          <Input placeholder='Enter Salary Given' />
        </Form.Item>
        <Form.Item name='info' label='Requirement：'>
          <TextArea defaultValue='' />
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(LaobanInfo);