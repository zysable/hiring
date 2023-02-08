import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';
import {getUserInfo} from '../../redux/actions';
import {getRedirectTo} from '../../utils';

function Main(props) {
  const {user, getUserInfo} = props;
  const userid = Cookies.get('userid');

  const location = useLocation();
  useEffect(() => {
    if (userid && !user.id) getUserInfo();
  }, [userid, user.id, getUserInfo]);

  if (!userid) return <Navigate to='/login' />;
  if (!user.id) return null;
  else if (location.pathname === '/') return <Navigate to={getRedirectTo(user.type, user.avatar)} />;

  return (
    <Outlet />
  );
}
export default connect(
  state => ({user: state.user}),
  {getUserInfo}
)(Main);