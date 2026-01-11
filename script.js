const OPENAI_KEY = "PUT_YOUR_OPENAI_KEY_HERE";

const status = document.getElementById("status");
const input = document.getElementById("input");

async function ask() {
  const q = input.value;
  status.innerText = "Thinking...";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Max, loyal assistant to Xking." },
        { role: "user", content: q }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

  status.innerText = reply;
  speak(reply);
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
}
