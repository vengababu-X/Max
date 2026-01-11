const statusText = document.getElementById("status");

document.body.addEventListener("click", () => {
  speak("Max is ready. Speak now.");
  listen();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;

function listen() {
  recognition.start();
  statusText.innerText = "Listening...";
}

recognition.onresult = async (event) => {
  const text = event.results[0][0].transcript;
  statusText.innerText = "Thinking...";

  const res = await fetch("/max", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const data = await res.json();
  speak(data.reply);
  statusText.innerText = data.reply;
};

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
}
