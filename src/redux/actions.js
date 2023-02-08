import {io} from "socket.io-client";
import {Toast} from 'antd-mobile';

import {reqRegister, reqLogin, reqUpdateUser, reqUserInfo, reqUserList, reqChatMsgList, reqReadMsg} from '../api';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-types';

// 创建单例模式socket
const initIO = (dispatch, userid) => {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000', {
      withCredentials: true
    });
    io.socket.on('receiveMsg', function (data) {
      if (data.code !== 0) return Toast.show({
        position: 'bottom',
        content: 'Message Sent Failed！',
      });
      if (userid === data.chatMsg.sid || userid === data.chatMsg.rid) {
        dispatch(receiveMsg(data.chatMsg, userid));
      }
    });
  }
};

const authSuccess = user => ({type: AUTH_SUCCESS, data: user});
const errorMsg = msg => ({type: ERROR_MSG, data: msg});
const receiveUser = user => ({type: RECEIVE_USER, data: user});
export const resetUser = msg => ({type: RESET_USER, data: msg});

const receiveUserList = userList => ({type: RECEIVE_USER_LIST, data: userList});

const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}});
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, msguserId: userid}});
const msgRead = (count, from, to) => ({type: MSG_READ, data: {count, from, to}});

export const register = (user) => {
  const {username, password, confirmPass, type} = user;

  if (!username) return errorMsg('Username is required');
  if (!password) {
    return errorMsg('Password is required');
  } else if (password !== confirmPass) {
    return errorMsg('Password is not same');
  }
  if (!type) return errorMsg('Type is required');

  return async dispatch => {
    const res = await reqRegister({username, password, type});
    if (res.code === 0) {
      getMsgList(dispatch, res.data.id);
      dispatch(authSuccess(res.data));
    } else {
      dispatch(errorMsg(res.msg));
    }
  };
};

export const login = (user) => {
  const {username, password} = user;
  if (!username) return errorMsg('Username is required');
  if (!password) return errorMsg('Password is required');

  return async dispatch => {
    const res = await reqLogin(user);
    if (res.code === 0) {
      getMsgList(dispatch, res.data.id);
      dispatch(authSuccess(res.data));
    } else {
      dispatch(errorMsg(res.msg));
    }
  };
};

export const updateUser = (user) => {
  return async dispatch => {
    const res = await reqUpdateUser(user);
    if (res.code === 0) {
      dispatch(receiveUser(res.data));
    } else {
      dispatch(resetUser(res.msg));
    }
  };
};

export const getUserInfo = () => {
  return async dispatch => {
    const res = await reqUserInfo();
    if (res.code === 0) {
      getMsgList(dispatch, res.data.id);
      dispatch(receiveUser(res.data));
    } else {
      dispatch(resetUser(res.msg));
    }
  };
};

export const getUserList = type => {
  return async dispatch => {
    const res = await reqUserList(type);
    if (res.code === 0) dispatch(receiveUserList(res.data));
  };
};

async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid);
  const res = await reqChatMsgList();
  if (res.code === 0) {
    dispatch(receiveMsgList({...res.data, userid}));
  }
};

export const sendMsg = msgObj => {
  return () => {
    io.socket.emit('sendMsg', msgObj);
  };
};

export const readMsg = (targetId, userid) => {
  return async dispatch => {
    const res = await reqReadMsg(targetId);
    if (res.code === 0) {
      dispatch(msgRead(res.data.affectedRows, targetId, userid));
    }
  };
};