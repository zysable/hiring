import {TabBar} from 'antd-mobile';
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

function Icon(props) {
  const {iconName} = props;
  return (
    <div>
      <img src={require(`./images/${iconName}.png`)} alt="" style={{
        width: '24px',
        height: '24px'
      }} />
    </div>
  );
}
Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
};

export default function NavFooter(props) {
  const {navList} = props;
  const tabs = navList.filter(nav => nav.isShown);
  const navigate = useNavigate();
  const jumpToPage = (key) => {
    navigate(key, {replace: true});
  };
  return (
    <TabBar onChange={jumpToPage} >
      {tabs.map(item => (
        <TabBar.Item key={item.path} icon={
          active => active ? <Icon iconName={item.icon + '-selected'} /> : <Icon iconName={item.icon} />
        } title={item.text} badge={item.badge} />
      ))}
    </TabBar>
  );
}
NavFooter.propTypes = {
  navList: PropTypes.array.isRequired,
};