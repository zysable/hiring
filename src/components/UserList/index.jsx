import React, {Fragment, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card, List, Space} from 'antd-mobile';
import {useNavigate} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

function LaobanItems(props) {
  return (
    <Fragment>
      <List.Item>Company：{props.user.company}</List.Item>
      <List.Item>Salary：{props.user.salary}</List.Item>
    </Fragment>
  );
}
LaobanItems.propTypes = {
  user: PropTypes.object.isRequired
};

export default function UserList(props) {
  const {userList} = props;
  const navigate = useNavigate();

  const MyCard = forwardRef((props, ref) => (
    <div ref={ref}>
      <Card {...props} />
    </div>
  ));
  return (
    <Space direction='vertical'>
      <QueueAnim>
        {
          userList.map(user =>
            <MyCard key={user.id} title={<Avatar src={user.avatar ? require(`@/assets/images/${user.avatar}.png`) : ''} />}
              extra={user.username} onClick={() => navigate(`/chat/${user.id}`)}>
              <List.Item>Position：{user.position}</List.Item>
              {user.type === 'employer' ? <LaobanItems user={user} /> : null}
              <List.Item>Skills：{user.info}</List.Item>
            </MyCard>
          )
        }
      </QueueAnim>
    </Space>
  );
}
UserList.propTypes = {
  userList: PropTypes.array.isRequired
};
