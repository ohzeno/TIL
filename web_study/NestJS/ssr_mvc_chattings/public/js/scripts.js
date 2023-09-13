const socket = io('/chattings'); // namespace: chattings에 연결

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// user_connected 이벤트를 받으면 콘솔에 출력
socket.on('user_connected', (username) => {
  console.log(`${username} connected!`);
});

const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} :)`);

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
