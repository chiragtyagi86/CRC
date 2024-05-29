document.addEventListener("DOMContentLoaded", () => {
  const leftSeats = document.getElementById("left-seats");
  const rightSeats = document.getElementById("right-seats");
  const bot = document.getElementById("bot");
  const result = document.getElementById("result");
  const startBtn = document.getElementById("startBtn");
  const fireworksContainer = document.getElementById("fireworks");

  let playerSeat = null;
  let checkCount = 0;
  let interval;
  const roundsToWin = 7;

  for (let i = 0; i < 20; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.addEventListener("click", () => chooseSeat(seat, i));
    leftSeats.appendChild(seat);
  }

  for (let i = 0; i < 20; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.addEventListener("click", () => chooseSeat(seat, i + 20));
    rightSeats.appendChild(seat);
  }

  const seats = document.querySelectorAll(".seat");

  startBtn.addEventListener("click", () => {
    if (playerSeat === null) {
      alert("Please choose a seat first!");
      return;
    }
    resetGame();
    moveBot();
  });

  function chooseSeat(seat, index) {
    seats.forEach((s) => (s.style.backgroundColor = "#27ae60"));
    seat.style.backgroundColor = "yellow";
    playerSeat = index;
  }

  function resetGame() {
    clearInterval(interval);
    checkCount = 0;
    result.textContent = "";
    result.style.color = "#f1c40f";
    bot.style.backgroundColor = "#e74c3c";
    seats.forEach((seat) => {
      seat.style.backgroundColor = "#27ae60";
    });
    startBtn.disabled = true;
    fireworksContainer.style.display = "none";
    fireworksContainer.innerHTML = "";
  }

  function moveBot() {
    interval = setInterval(() => {
      checkCount++;
      const botPositions = getRandomPositions(8, 40);
      updateBot(botPositions);
      if (checkCaught(botPositions)) {
        endGame("lose");
      } else if (checkCount >= roundsToWin) {
        endGame("win");
      }
    }, 1000);
  }

  function getRandomPositions(count, max) {
    const positions = new Set();
    while (positions.size < count) {
      positions.add(Math.floor(Math.random() * max));
    }
    return Array.from(positions);
  }

  function updateBot(positions) {
    seats.forEach((seat, index) => {
      if (positions.includes(index)) {
        seat.style.backgroundColor = "#ffaaaa";
      } else {
        seat.style.backgroundColor =
          seat.style.backgroundColor === "yellow" ? "yellow" : "#27ae60";
      }
    });
  }

  function checkCaught(positions) {
    return positions.includes(playerSeat);
  }

  function endGame(outcome) {
    clearInterval(interval);
    bot.style.backgroundColor = outcome === "win" ? "green" : "black";
    if (outcome === "win") {
      result.textContent = "You escaped!";
      result.style.color = "green";
      triggerFireworks();
    } else {
      result.textContent = "You got caught!";
    }
    startBtn.disabled = false;
  }

  function triggerFireworks() {
    fireworksContainer.style.display = "block";
    for (let i = 0; i < 20; i++) {
      createFirework();
    }
  }

  function createFirework() {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 100}%`;
    firework.style.width = `${Math.random() * 10 + 10}px`;
    firework.style.height = firework.style.width;
    firework.style.backgroundColor = getRandomColor();
    fireworksContainer.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
  }

  function getRandomColor() {
    const colors = [
      "#e74c3c",
      "#e67e22",
      "#f1c40f",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
