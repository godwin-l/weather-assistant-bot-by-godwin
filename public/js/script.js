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
  console.log('Speech has been detected.');
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
  assistant.textContent = 'Error: ' + data.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('reply', function(replyData) {
  synthVoice(replyData);

  assistant.textContent = replyData;
});
