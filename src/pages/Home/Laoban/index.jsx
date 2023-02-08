import React from 'react';
import {connect} from 'react-redux';
import UserList from '@/components/UserList';
import {getUserList} from '@/redux/actions';
import {useEffect} from 'react';

function Laoban(props) {
  const {getUserList} = props;
  useEffect(() => {
    getUserList('employee');
  }, [getUserList]);

  return (
    <div>
      <UserList userList={props.userList} />
    </div>
  );
}
export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Laoban);