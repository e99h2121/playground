const board = document.getElementById("board");

// カードの中身（2枚ずつ）
const values = ["ブレイクスルー","ブレイクスルー","失敗を許容する","失敗を許容する","スピルバーグになれ","スピルバーグになれ","えいえいえいおー","えいえいえいおー"];

// シャッフル
values.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lock = false;

values.forEach(value => {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = "？";

  card.addEventListener("click", () => {
    if (lock || card.classList.contains("open")) return;

    card.classList.add("open");
    card.textContent = value;

    if (!firstCard) {
      firstCard = { card, value };
    } else {
      secondCard = { card, value };
      lock = true;

      setTimeout(checkMatch, 800);
    }
  });

  board.appendChild(card);
});

function checkMatch() {
  if (firstCard.value !== secondCard.value) {
    firstCard.card.classList.remove("open");
    secondCard.card.classList.remove("open");
    firstCard.card.textContent = "？";
    secondCard.card.textContent = "？";
  }

  firstCard = null;
  secondCard = null;
  lock = false;
}
