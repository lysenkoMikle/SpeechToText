const btn = document.querySelector(".btn");
const resetBtn = document.querySelector(".reset");
const lang = document.querySelector("select");
const outputText = document.querySelector(".text");
let selectedLang = "en-Us";

if (
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition
) {
	btn.classList.add("work");
	outputText.placeholder = "recognized text will be here...";
} else {
	btn.classList.add("dontWork");
	outputText.placeholder = "sorry, but it doesn't work in this browser(((";
}

lang.addEventListener("change", (e) => {
	selectedLang = e.target.value;
});

btn.addEventListener("click", (e) => {
	var recognition = new (window.SpeechRecognition ||
		window.webkitSpeechRecognition ||
		window.mozSpeechRecognition ||
		window.msSpeechRecognition)();
	recognition.lang = selectedLang;
	btn.classList.add("fade");

	recognition.onresult = function (event) {
		outputText.value += `${event.results[0][0].transcript}. `;
		btn.classList.remove("fade");
	};

	recognition.start();
});

resetBtn.addEventListener("click", () => {
	document.querySelector(".text").value = "";
	document.querySelector(".card").classList.add("reset-card");

	document
		.querySelector(".card")
		.addEventListener("animationend", AnimationHandler, false);

	function AnimationHandler() {
		document.querySelector(".card").classList.remove("reset-card");
	}
});
