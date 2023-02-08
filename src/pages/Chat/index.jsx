import {List, NavBar, Avatar, Form, Input, Button, Grid} from 'antd-mobile';
import React, {useEffect, useState, forwardRef} from 'react';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import {sendMsg, readMsg} from '../../redux/actions';

function Chat(props) {
  const {userid} = useParams();
  const {user, chat: {users, chatMsgs}, readMsg} = props;

  const emojis = ['😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
    , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
    , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
    , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😇', '😍'].map(emoji => ({text: emoji}));
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  useEffect(() => {
    return () => {
      readMsg(userid, user.id);
    };
  }, [readMsg, userid, user.id]);

  const [showEmoji, setShowEmoji] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const changeInput = (text) => {
    const preInput = form.getFieldValue('chat');
    form.setFieldsValue({
      chat: preInput ? preInput + text : text
    });
  };
  const onFinish = val => {
    const sid = props.user.id + '';
    const rid = userid;
    const content = val.chat ? val.chat.trim() : val.chat;
    if (content) {
      props.sendMsg({sid, rid, content});
    }
    setShowEmoji(false);
    form.resetFields();
  };
  if (Object.keys(users).length === 0) return null;
  const meId = user.id;
  const targetId = userid;
  const targetName = users[targetId].username;
  const targetAvatar = users[targetId].avatar ? require(`@/assets/images/${users[targetId].avatar}.png`) : '';
  const chatId = [meId * 1, targetId * 1].sort((a, b) => a - b).join('_');
  const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

  const {Item} = List;

  const MyItem = forwardRef((props, ref) => (
    <div ref={ref}>
      <Item {...props} />
    </div>
  ));

  return (
    <div id='chat-page'>
      <NavBar className="login-nav" onBack={() => navigate(-1)}>{targetName}</NavBar>
      <List>
        <QueueAnim>
          {
            msgs.map(msg => {
              if (msg.sid !== meId) return <MyItem key={msg.id} prefix={<Avatar src={targetAvatar} />}>{msg.content}</MyItem>;
              else return <MyItem key={msg.id} extra='Me' className='chat-me'>{msg.content}</MyItem>;
            })
          }
        </QueueAnim>
      </List>
      <Form layout='horizontal' onFinish={onFinish} className='chat-input' initialValues={{}} form={form}>
        <Form.Item name='chat' extra={
          <div>
            <span onClick={() => setShowEmoji(!showEmoji)}>😀</span>
            <Button type='submit'>Send</Button>
          </div>
        }>
          <Input placeholder='Enter Message' clearable onFocus={() => setShowEmoji(false)} />
        </Form.Item>
        {
          showEmoji ?
            <Grid columns={8} gap={5}>
              {
                emojis.map((emoji, index) => <Grid.Item key={index} onClick={() => changeInput(emoji.text)}>{emoji.text}</Grid.Item>)
              }
            </Grid> : null
        }
      </Form>
    </div >
  );
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat);