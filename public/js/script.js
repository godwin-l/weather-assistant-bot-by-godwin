const socket = io();

const godwin = document.querySelector('.godwin');
const assistant = document.querySelector('.weather-assistant');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speech = new SpeechRecognition();

speech.lang = 'en-US';
speech.interimResults = false;
speech.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  speech.start();
});

speech.addEventListener('speechstart', () => {
  console.log('Weather Assistant Bot has started to speak.');
});

speech.addEventListener('result', (data) => {

  let last = data.results.length - 1;
  let text = data.results[last][0].transcript;

  godwin.textContent = text;

  socket.emit('city name', text);
});

speech.addEventListener('speechend', () => {
  speech.stop();
});

speech.addEventListener('error', (data) => {
  assistant.textContent = 'Please check whether you have connected to internet';
});

function Voice(text) {
  const microphone = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  microphone.speak(utterance);
}

socket.on('assistantreply', function(replyData) {
  Voice(replyData);
  assistant.textContent = replyData;
});
