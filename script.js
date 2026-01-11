const statusText = document.getElementById("status");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = false;

document.body.addEventListener("click", () => {
  const u = new SpeechSynthesisUtterance("Max is ready. Speak now.");
  speechSynthesis.speak(u);

  statusText.innerText = "Listening...";
  recognition.start();
});

recognition.onresult = async (event) => {
  const text = event.results[0][0].transcript.toLowerCase();
  statusText.innerText = "Thinking...";

  try {
    const res = await fetch("http://192.168.0.103:8000/max", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text })
    });

    const data = await res.json();
    const reply = data.reply;

    statusText.innerText = reply;
    const u = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(u);
  } catch {
    statusText.innerText = "I cannot reach my brain.";
  }
};

recognition.onerror = () => {
  statusText.innerText = "Tap to talk again";
};

recognition.onend = () => {
  statusText.innerText = "Tap to talk again";
};
