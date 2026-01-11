const status = document.getElementById("status");

document.body.onclick = () => {
  speak("Hello Xking sir. I am Max. I am online.");
  status.innerText = "Max is online";
};

function ask(q) {
  let reply = "I am listening, Xking.";

  if (q === "hello") reply = "Hello Xking sir. How can I help you?";
  if (q === "who built you") reply = "Xking is my boss. He built me.";
  if (q === "why are you built") reply = "I was built to serve my boss Xking.";
  if (q === "what can you do") reply = "I can assist you and listen to you, Xking.";

  status.innerText = reply;
  speak(reply);
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 0.9;
  speechSynthesis.speak(u);
}
