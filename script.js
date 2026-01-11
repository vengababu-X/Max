const statusText = document.getElementById("status");

let awake = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = false;

// Unlock audio on tap
document.body.addEventListener("click", () => {
  const u = new SpeechSynthesisUtterance("Max is ready.");
  speechSynthesis.speak(u);
  startListening();
});

function startListening() {
  recognition.start();
  statusText.innerText = "Listening...";
}

recognition.onresult = (event) => {
  const speech = event.results[0][0].transcript.toLowerCase();
  handle(speech);
};

recognition.onerror = () => {
  startListening(); // restart if it stops
};

recognition.onend = () => {
  startListening(); // keep always listening
};

function handle(text) {
  let reply = "I am listening, Xking.";

  if (text.includes("max")) {
    reply = "Hello Xking sir. How can I help you?";
  }
  else if (text.includes("hello")) {
    reply = "Hello Xking sir. How can I help you?";
  }
  else if (text.includes("who built you")) {
    reply = "Xking is my boss. He built me.";
  }
  else if (text.includes("who is your boss")) {
    reply = "Xking is my boss.";
  }
  else if (text.includes("why are you built")) {
    reply = "I was built to serve my boss Xking.";
  }
  else if (text.includes("what can you do")) {
    reply = "I can listen to you and assist you, Xking.";
  }

  statusText.innerText = reply;
  const u = new SpeechSynthesisUtterance(reply);
  speechSynthesis.speak(u);
}
