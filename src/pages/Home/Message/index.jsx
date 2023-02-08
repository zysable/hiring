import React, {forwardRef} from 'react';
import {connect} from 'react-redux';
import {List, Badge, Avatar} from 'antd-mobile';
import {useNavigate} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

function getLastMsg(chatMsgs, userid) {
  return chatMsgs.reduce((pv, cv) => {
    cv.unReadCount = (cv.rid === userid && cv.isread === 0) ? 1 : 0;
    const chatId = cv.chat_id;
    if (!pv[chatId] || cv.created_time > pv[chatId].created_time) {
      pv[chatId] = pv[chatId] ? {...cv, unReadCount: pv[chatId].unReadCount + cv.unReadCount} : cv;
    }
    return pv;
  }, {});
}

function Message(props) {
  const navigate = useNavigate();
  const {user, chat: {users, chatMsgs}} = props;

  if (Object.keys(users).length === 0) return null;
  const groupedList = Object.values(getLastMsg(chatMsgs, user.id));
  groupedList.sort((a, b) => b.id - a.id);

  const MyItem = forwardRef((props, ref) => (
    <div ref={ref}>
      <List.Item {...props} />
    </div>
  ));

  return (
    <List style={{paddingTop: '5px'}}>
      <QueueAnim>
        {
          groupedList.map(el => {
            const showId = el.sid === user.id ? el.rid : el.sid;
            const src = users[showId].avatar ? require(`@/assets/images/${users[showId].avatar}.png`) : '';
            return <MyItem key={el.id} prefix={<Avatar src={src} />}
              description={users[showId].username} extra={<Badge content={el.unReadCount} />}
              arrow onClick={() => navigate(`/chat/${showId}`)}>{el.content}</MyItem>;
          })
        }
      </QueueAnim>
    </List>
  );
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message);