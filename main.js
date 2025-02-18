const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const questionText = document.querySelector(".question");
const heartContainer = document.querySelector(".heart-container");
const card = document.getElementById("card");
const boxImage = document.querySelector(".box-image img"); // Added to target the image element

const messages = [
	"Try again po 😁",
	"Isa pa, go click it 😊",
	"Wag mainis po. Sayang kacute-an",
	"Naku, halatang naiinis na yan 🤨",
	"Relax, Just Go with Flow 😇",
	"Patience is the key 😉",
	"Baka nagtatampo ka na?",
	"My Bubu Bear, be consistent 🥰",
	"Don't stop, click mo lang",
	"Sorry na, nagtatampo ka na 😔",
	"Malapit na yan. Promise po",
	"Hala, Umasa siya ahaha 😅",
	"You can do it, Fighting po 😎",
	"Hi and Hello, Cute Chinita Princess na Marites and may Toyo 💟"
];

let noButtonCount = 0;
yesBtn.style.opacity = "0";
yesBtn.style.pointerEvents = "none";

noBtn.addEventListener("mouseover", handleNoInteraction);
noBtn.addEventListener("click", handleNoInteraction);

function handleNoInteraction() {
	if (noButtonCount < 14) {
		questionText.textContent = messages[noButtonCount]; // Update text
		boxImage.src = `images/${noButtonCount + 1}.gif`; // Update the image source based on the count
		noButtonCount++;

		yesBtn.style.opacity = noButtonCount / 14;

		if (noButtonCount === 14) {
			yesBtn.style.pointerEvents = "auto";
		}

		const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
		const newY = Math.floor(Math.random() * questionContainer.offsetHeight);

		noBtn.style.left = `${newX}px`;
		noBtn.style.top = `${newY}px`;
	}
}

yesBtn.addEventListener("click", () => {
	questionContainer.style.display = "none";
	heartLoader.style.display = "inherit";

	setTimeout(() => {
		heartLoader.style.display = "none";
		resultContainer.style.display = "inherit";
		gifResult.play();
	}, 3000);

	startHearts();
});

function createHeart() {
	const heart = document.createElement("div");
	heart.classList.add("heart");

	// Random position across the full screen
	const randomX = Math.random() * window.innerWidth;
	const randomY = Math.random() * window.innerHeight;

	// Random movement (small to large random range)
	const moveX = (Math.random() - 0.5) * 300;
	const moveY = (Math.random() - 0.5) * 300;
	const moveXEnd = moveX * 2;
	const moveYEnd = moveY * 2;

	// Random heart size
	const randomSize = Math.random() * 30 + 20; // Between 20px and 50px

	// Random duration (makes each heart move at different speeds)
	const randomDuration = Math.random() * 4 + 2; // 2s to 6s

	// Apply styles
	heart.style.left = `${randomX}px`;
	heart.style.top = `${randomY}px`;
	heart.style.width = `${randomSize}px`;
	heart.style.height = `${randomSize}px`;
	heart.style.setProperty("--moveX", `${moveX}px`);
	heart.style.setProperty("--moveY", `${moveY}px`);
	heart.style.setProperty("--moveXEnd", `${moveXEnd}px`);
	heart.style.setProperty("--moveYEnd", `${moveYEnd}px`);
	heart.style.setProperty("--duration", `${randomDuration}s`);

	heartContainer.appendChild(heart);

	// Remove after animation
	setTimeout(() => {
		heart.remove();
	}, randomDuration * 1000);
}

// Show hearts when card appears
function startHearts() {
	heartContainer.style.display = "block";
	setInterval(createHeart, 300);
}

// Hide hearts when card disappears
function stopHearts() {
	heartContainer.style.display = "none";
}

// Observe card visibility
const observer = new MutationObserver(() => {
	if (window.getComputedStyle(card).display !== "none") {
		startHearts();
	} else {
		stopHearts();
	}
});

observer.observe(card, {
	attributes: true
});