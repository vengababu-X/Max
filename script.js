const status = document.getElementById("status");
const input = document.getElementById("input");

async function send() {
  const text = input.value;
  if (!text) return;

  status.innerText = "Thinking...";

  const res = await fetch("https://YOUR_WORKER_URL/max", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  status.innerText = data.reply;
  speak(data.reply);
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 0.9;
  speechSynthesis.speak(u);
}
