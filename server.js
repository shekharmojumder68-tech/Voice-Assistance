const recognition = new (
  window.SpeechRecognition || window.webkitSpeechRecognition
)();

recognition.lang = "en";

const btn = document.querySelector("#micBtn");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en";
  window.speechSynthesis.speak(utterance);
}
function handle(command) {
  command = command.toLowerCase();

  if (command.includes("open youtube") || command.includes("ইউটিউব")) {
    speak("opening youtube");
    window.open("https://www.youtube.com/", "_blank");
  } else if (command.includes("open facebook") || command.includes("ফেসবুক")) {
    speak("opening facebook");
    window.open("https://www.facebook.com/", "_blank");
  } 
  else {
    let searchQuery = command.replace("search", "").trim();
  
    speak(`Searching for ${searchQuery}`);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
      "_blank"
    );
  }
}

btn.addEventListener("click", () => {
  recognition.start();
  console.log("mic started....");
  speak("i am ready, What do you want?");
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  console.log("i am ready: ", transcript);
  handle(transcript);
};
