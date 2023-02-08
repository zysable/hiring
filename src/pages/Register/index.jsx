import React from 'react';
import {NavBar, Form, Input, Radio, Button} from 'antd-mobile';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../redux/actions';
import Logo from '../../components/Logo';
import './index.scss';

function Register(props) {
  const {msg, redirectTo} = props.user;
  const navigate = useNavigate();
  const onFinish = (values) => {
    props.register(values);
  };

  if (redirectTo) return <Navigate to={redirectTo} />;

  return (
    <div>
      <NavBar className="register-nav" backArrow={false}>Hiring Demo</NavBar>
      <Logo />
      <div className="register-formwrapper">
        {msg ? <div className='error-msg'>{msg}</div> : null}
        <Form className="register-form" onFinish={onFinish} layout='horizontal'
          footer={<Button block type='submit' color='primary' size='large'>Register</Button>}
          validateTrigger="onBlur">
          <Form.Item name='username' label='Acount'>
            <Input placeholder='username' />
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input placeholder='password' type="password" />
          </Form.Item>
          <Form.Item name='confirmPass' label='Confirm'>
            <Input placeholder='confirm password' type="password" />
          </Form.Item>
          <Form.Item name='type' label='Type'>
            <Radio.Group>
              <Radio value='employee'>Employee</Radio>&nbsp;&nbsp;
              <Radio value='employer'>Employer</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Button block size='large' onClick={() => navigate('/login', {replace: true})}>Already Have an Account</Button>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    user: state.user
  }),
  {register}
)(Register);