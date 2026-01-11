const statusText = document.getElementById("status");
let awake = false;

const socket = new WebSocket("ws://192.168.0.103:3000");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.start();

recognition.onresult = (event) => {
  const speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

  if (!awake && speech.includes("max")) {
    awake = true;
    speak("Hello. I am Max. I am online.");
    statusText.innerText = "Listening...";
    return;
  }

  if (awake) {
    statusText.innerText = "Thinking...";
    socket.send(speech);
  }
};

socket.onmessage = (event) => {
  statusText.innerText = event.data;
  speak(event.data);
};

function speak(msg) {
  const u = new SpeechSynthesisUtterance(msg);
  u.rate = 0.9;
  u.pitch = 0.9;
  speechSynthesis.speak(u);
}
