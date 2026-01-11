const statusText = document.getElementById("status");

let awake = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.start();

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

  if (!awake && transcript.includes("max")) {
    awake = true;
    speak("Hello. I am Max. I am online.");
    statusText.innerText = "Listening...";
    return;
  }

  if (awake) {
    statusText.innerText = "You said: " + transcript;
    speak("I heard you say " + transcript);
  }
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.pitch = 0.9;
  speechSynthesis.speak(utter);
}
