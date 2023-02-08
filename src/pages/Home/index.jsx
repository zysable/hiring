import {NavBar} from 'antd-mobile';
import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import NotFound from '../NotFound';
import NavFooter from '../../components/NavFooter';
import {connect} from 'react-redux';

function Home(props) {
  const location = useLocation();
  const navList = [
    {
      path: '/home/laoban',
      title: 'Employee List',
      icon: 'laoban',
      text: 'Employee',
      isShown: true
    },
    {
      path: '/home/dashen',
      title: 'Employer List',
      icon: 'dashen',
      text: 'Employer',
      isShown: true
    },
    {
      path: '/home/msg',
      title: 'Message List',
      icon: 'message',
      text: 'Message',
      isShown: true,
      badge: props.unReadCount
    },
    {
      path: '/home/pc',
      title: 'Personal Info',
      icon: 'personal',
      text: 'Account',
      isShown: true
    }
  ];
  const currentNav = navList.find(nav => nav.path === location.pathname);
  if (!currentNav) return <NotFound />;
  if (props.user.type === 'employer') navList[1].isShown = false;
  else navList[0].isShown = false;

  return (
    <div className='home-page'>
      <NavBar className="login-nav" backArrow={false}>{currentNav.title}</NavBar>
      <Outlet />
      <NavFooter navList={navList} />
    </div>
  );
}
export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {}
)(Home);