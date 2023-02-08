import React, {useState} from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';

function Header(props) {
  const {avatar} = props;
  return (
    <>{
      avatar ? <div style={{display: 'flex', alignItems: 'center'}}>Selected Avatar：
        <img src={avatar} alt="" /></div>
        : <span>Choose an Avatar：</span>
    }</>
  );
}

export default function AvatarSelector(props) {
  const [avatar, setAvatar] = useState('');
  const avartarList = [];
  for (let i = 0; i < 20; i++) {
    avartarList.push({
      text: `Avatar${i + 1}`,
      icon: require(`../../assets/images/Avatar${i + 1}.png`)
    });
  }
  const saveAvatarUrl = (e) => {
    setAvatar(e.currentTarget.children[0].src);
    props.getAvatar(e.currentTarget.children[1].innerText);
  };
  return (
    <List header={<Header avatar={avatar} />} className='avatar-list'>
      <Grid columns={5}>
        {avartarList.map(avatar => (
          <Grid.Item key={avatar.text}
            style={{textAlign: 'center', fontSize: '14px', padding: '10px'}}
            onClick={saveAvatarUrl}>
            <img src={avatar.icon} alt="" />
            <p>{avatar.text}</p>
          </Grid.Item>
        ))}
      </Grid>
    </List >
  );
}
AvatarSelector.propTypes = {
  getAvatar: PropTypes.func.isRequired,
};
