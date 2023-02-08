import {combineReducers} from 'redux';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from './action-types';
import {getRedirectTo} from '../utils';

const initUser = {username: '', type: '', msg: '', redirectTo: ''};
function user(preState = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type, avatar} = action.data;
      return ({...action.data, msg: '', redirectTo: getRedirectTo(type, avatar)});
    case ERROR_MSG:
      return ({...preState, msg: action.data});
    case RECEIVE_USER:
      return ({...action.data});
    case RESET_USER:
      return ({...initUser, msg: action.data});
    default:
      return preState;
  }
}

const initUserList = [];
function userList(preState = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return preState;
  }
}

const initChat = {users: {}, chatMsgs: [], unReadCount: 0};
function chat(preState = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const {users, chatMsgs, userid} = action.data;
      return ({
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((pre, msg) => pre + (msg.isread === 0 && msg.rid === userid ? 1 : 0), 0)
      });
    case RECEIVE_MSG:
      const {chatMsg, msguserId} = action.data;
      return ({
        users: preState.users,
        chatMsgs: [...preState.chatMsgs, chatMsg],
        unReadCount: preState.unReadCount + (chatMsg.isread === 0 && chatMsg.rid === msguserId ? 1 : 0)
      });
    case MSG_READ:
      const {count, from, to} = action.data;
      return ({
        users: preState.users,
        chatMsgs: preState.chatMsgs.map(msg => {
          if (msg.sid === (from * 1) && msg.rid === to && msg.isread === 0) return {...msg, isread: 1};
          else return msg;
        }),
        unReadCount: preState.unReadCount - count
      });
    default:
      return preState;
  }
};

export default combineReducers({
  user,
  userList,
  chat
});