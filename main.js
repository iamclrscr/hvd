const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const questionText = document.querySelector(".question");
const heartContainer = document.querySelector(".heart-container");
const card = document.getElementById("card");
const boxImage = document.querySelector(".box-image img");

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
let musicPlayed = false;
yesBtn.style.opacity = "0";
yesBtn.style.pointerEvents = "none";

const bgMusic = new Audio("baby you.mp3");
bgMusic.loop = true;

function playMusic() {
	if (!musicPlayed) {
		bgMusic.play().catch(() => {
			document.addEventListener("click", () => {
				bgMusic.play();
			}, {
				once: true
			});
		});
		musicPlayed = true;
	}
}

function handleNoClick() {
	if (!musicPlayed) playMusic();

	if (noButtonCount < 14) {
		questionText.textContent = messages[noButtonCount];
		boxImage.src = `images/${noButtonCount + 1}.gif`;
		noButtonCount++;

		yesBtn.style.opacity = noButtonCount / 14;

		if (noButtonCount === 14) {
			yesBtn.style.pointerEvents = "auto";
			noBtn.style.display = "none";
		}

		const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
		const newY = Math.floor(Math.random() * questionContainer.offsetHeight);

		noBtn.style.left = `${newX}px`;
		noBtn.style.top = `${newY}px`;
	}
}

noBtn.addEventListener("click", handleNoClick);

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

	const randomX = Math.random() * window.innerWidth;
	const randomY = Math.random() * window.innerHeight;
	const moveX = (Math.random() - 0.5) * 300;
	const moveY = (Math.random() - 0.5) * 300;
	const moveXEnd = moveX * 2;
	const moveYEnd = moveY * 2;
	const randomSize = Math.random() * 30 + 20;
	const randomDuration = Math.random() * 4 + 2;

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

	setTimeout(() => {
		heart.remove();
	}, randomDuration * 1000);
}

function startHearts() {
	heartContainer.style.display = "block";
	setInterval(createHeart, 300);
}

function stopHearts() {
	heartContainer.style.display = "none";
}

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
