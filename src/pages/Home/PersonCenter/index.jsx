import {Button, List, Result, Dialog} from 'antd-mobile';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {resetUser} from '@/redux/actions';

function Icon(props) {
  const picUrl = require(`@/assets/images/${props.picName}.png`);
  return (
    <>
      <img src={picUrl} alt="" style={{width: '100%', heigh: '100%'}} />
    </>
  );
}
Icon.propTypes = {
  picName: PropTypes.string.isRequired
};

function PersonCenter(props) {
  const logOut = () => {
    Dialog.confirm({
      content: 'Exitf？',
      onConfirm: () => {
        Cookies.remove('userid');
        props.resetUser();
      }
    });
  };
  return (
    <div className='per-center'>
      <Result
        icon={<Icon picName={props.user.avatar} />}
        status='success'
        title={props.user.username}
        description={props.user.company}
      />
      <List mode='card' header='Personal Info'>
        <List.Item>Postion：{props.user.position}</List.Item>
        {props.user.salary ? <List.Item>Salary：{props.user.salary}</List.Item> : null}
        <List.Item>Skills：{props.user.info}</List.Item>
      </List>
      <Button color='danger' size='large' onClick={logOut}>Logout</Button>
    </div>
  );
}
export default connect(
  state => ({user: state.user}),
  {resetUser}
)(PersonCenter);