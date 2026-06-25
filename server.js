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
function openAppOrWeb(appUrl,webUrl){
const start = Date.now();
  window.location.href = appUrl;

  setTimeout(()=>{
    if(Date.now() - start < 1600){
      window.open(webUrl,"_blank");
    }
  },1200);
}
  
function handle(command) {
  command = command.toLowerCase();

  if (command.includes("youtube search")) {
    let searchQuery = command.replace("search", "").trim();
    speak(`search youtube for ${searchQuery}`);
      openAppOrWeb(
        `youtube://www.youtube.com/search?q=${encodeURIComponent(searchQuery)}`,
         `https://www.youtube.com/search?q=${encodeURIComponent(searchQuery)}`
      );
    } 
       
  }else if (command.includes("open youtube")) {
    speak("opening youtube");

    openAppOrWeb("https://www.youtube.com/", "_blank");
    
  }else if (command.includes("open facebook") || command.includes("ফেসবুক")) {
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
