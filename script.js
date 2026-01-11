const statusText = document.getElementById("status");
let awake = false;

// Fix for Android: must be user-activated
document.body.addEventListener("click", () => {
  const test = new SpeechSynthesisUtterance("Max is ready.");
  speechSynthesis.speak(test);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.start();

recognition.onresult = (event) => {
  const speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

  if (!awake && speech.includes("max")) {
    awake = true;
    reply("Hello Xking sir. How can I help you?");
    return;
  }

  if (awake) {
    handleCommand(speech);
  }
};

function handleCommand(text) {
  let r = "I am listening, Xking.";

  if (text.includes("hello")) r = "Hello Xking sir. How can I help you?";
  else if (text.includes("who built you")) r = "Xking is my boss. He built me.";
  else if (text.includes("who is your boss")) r = "Xking is my boss.";
  else if (text.includes("why are you built")) r = "I was built to serve my boss Xking.";
  else if (text.includes("what can you do")) r = "I can listen to you and assist you, Xking.";

  reply(r);
}

function reply(text) {
  statusText.innerText = text;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 0.9;
  speechSynthesis.speak(u);
}
