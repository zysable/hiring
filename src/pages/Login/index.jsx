import React from 'react';
import {NavBar, Form, Input, Button} from 'antd-mobile';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import Logo from '../../components/Logo';
import './index.scss';

function Login(props) {
  const {msg, redirectTo} = props.user;
  const navigate = useNavigate();
  const onFinish = (values) => {
    props.login(values);
  };

  if (redirectTo) return <Navigate to={redirectTo} />;

  return (
    <div>
      <NavBar className="login-nav" backArrow={false}>Hiring Demo</NavBar>
      <Logo />
      <div className="login-formwrapper">
        {msg ? <div className='error-msg'>{msg}</div> : null}
        <Form className="login-form" onFinish={onFinish} layout='horizontal'
          footer={<Button block type='submit' color='primary' size='large'>Login</Button>}
          validateTrigger="onBlur">
          <Form.Item name='username' label='Acount'>
            <Input placeholder='username' />
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input placeholder='password' type="password" />
          </Form.Item>
        </Form>
        <Button block size='large' onClick={() => navigate('/register', {replace: true})}>Register New Accout</Button>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    user: state.user
  }),
  {login}
)(Login);