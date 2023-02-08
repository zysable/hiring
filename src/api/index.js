import ajax from './ajax';

export const reqRegister = user => ajax('/register', user, 'POST');
export const reqLogin = user => ajax('/login', user, 'POST');
export const reqUpdateUser = user => ajax('/update', user, 'POST');
export const reqUserInfo = () => ajax('/getuserinfo');
export const reqUserList = type => ajax('/getuserlist', {type});

export const reqChatMsgList = () => ajax('/msglist');
export const reqReadMsg = sid => ajax('/readmsg', {sid}, 'POST');