const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Create gold scratch layer
ctx.fillStyle = "#d4af37";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add text on scratch layer
ctx.fillStyle = "#ffffff";
ctx.font = "bold 24px Arial";
ctx.textAlign = "center";
ctx.fillText("Scratch Here ✨", canvas.width / 2, canvas.height / 2);

let isDrawing = false;
let scratchCount = 0;
let revealed = false;

// Reveal function
function revealDate() {
  document.querySelector(".scratch-card").classList.add("revealed");
  document.querySelector(".revealed-content").classList.add("show");

  const scrollText = document.querySelector(".scroll-next");

  if (scrollText) {
    scrollText.classList.add("show");
  }
}

// Scratch function
function scratch(x, y) {
  if (!revealed) {
    scratchCount++;

    if (scratchCount > 120) {
      revealed = true;

      revealDate();
    }
  }

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();
}

// DESKTOP EVENTS

canvas.addEventListener("mousedown", () => {
  isDrawing = true;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  scratch(x, y);
});

// MOBILE EVENTS

canvas.addEventListener("touchstart", () => {
  isDrawing = true;
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

canvas.addEventListener(
  "touchmove",
  (e) => {
    if (!isDrawing) return;

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const touch = e.touches[0];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    scratch(x, y);
  },
  { passive: false },
);

