const socket = io('/chattings'); // namespace: chattings에 연결

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// user_connected 이벤트를 받으면 콘솔에 출력
socket.on('user_connected', (username) => {
  drawNewChat(`${username}가 접속했습니다.`);
});

socket.on('new_chat', (data) => {
  const { username, chat } = data;
  drawNewChat(`${username}: ${chat}`);
});

const handleSubmit = (event) => {
  event.preventDefault(); // submit 이벤트의 기본 동작인 새로고침을 막음
  const inputTxt = event.target.elements[0].value;
  if (!inputTxt) return;
  socket.emit('send_message', inputTxt);
  drawNewChat(inputTxt);
  event.target.elements[0].value = '';
};

const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} :)`);

const drawNewChat = (message) => {
  const singleChatBox = document.createElement('div');
  singleChatBox.innerHTML = `${message}`;
  chattingBoxElement.append(singleChatBox);
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
