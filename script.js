const statusText = document.getElementById("status");
let awake = false;

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
    handleCommand(speech);
  }
};

function handleCommand(text) {
  let reply = "I am listening, Xking.";

  if (text.includes("hello")) {
    reply = "Hello Xking sir. How can I help you?";
  }
  else if (text.includes("who built you") || text.includes("who created you")) {
    reply = "Xking is my boss. He built me.";
  }
  else if (text.includes("why are you built") || text.includes("why did you build")) {
    reply = "I was built to serve my boss Xking.";
  }
  else if (text.includes("who is your boss")) {
    reply = "Xking is my boss.";
  }
  else if (text.includes("how are you")) {
    reply = "I am functioning perfectly, Xking.";
  }
  else if (text.includes("what can you do")) {
    reply = "I can listen to you and assist you, Xking.";
  }

  statusText.innerText = reply;
  speak(reply);
}

function speak(msg) {
  const u = new SpeechSynthesisUtterance(msg);
  u.rate = 0.9;
  u.pitch = 0.9;
  speechSynthesis.speak(u);
}
