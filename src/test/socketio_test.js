import {io} from "socket.io-client";
const socket = io('ws://localhost:4000', {
  withCredentials: true
});
const msg = {name: 'abc'};
socket.on('receiveMsg', function (data) {
  console.log('client has received msg from server', data);
});
socket.emit('sendMsg', msg);
console.log('client is sending msg to server', msg);