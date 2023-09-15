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

socket.on('user_disconnected', (username) =>
  drawNewChat(`${username}이(가) 나갔습니다.`),
);

const handleSubmit = (event) => {
  event.preventDefault(); // submit 이벤트의 기본 동작인 새로고침을 막음
  const inputTxt = event.target.elements[0].value;
  if (!inputTxt) return;
  socket.emit('submit_chat', inputTxt);
  drawNewChat(`${inputTxt}`, true);
  event.target.elements[0].value = '';
};

const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} :)`);

const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
      <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
        ${message}
      </div>
    `;
  else
    chatBox = `
      <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
        ${message}
      </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
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
