const images = document.querySelector(".images");
const pointContainer = document.querySelector(".point-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const Cards = document.querySelectorAll("#card");
let curAd = 0;

function changeAd(direction) {
  const checkCur = () => {
    if (curAd <= 4 && curAd >= 0) {
      if (direction === "next") {
        curAd += 1;
      } else if (direction === "prev") {
        curAd -= 1;
      } else {
        throw Error("Something is very wrong");
      }
    }
    if (curAd < 0) {
      curAd = 4;
    } else if (curAd > 4) {
      curAd = 0;
    }
  };
  images.children[curAd].className = "non-visible";
  pointContainer.children[curAd].className = "point";

  checkCur();
  images.children[curAd].className = "visible";
  pointContainer.children[curAd].className = "point checked";
}

function eleCreate(element, textCont, url) {
  if (url !== undefined) {
    const img = new Image();
    img.src = url;
    img.className = "card-img";
    return img;
  }
  const newElement = document.createElement(element);
  newElement.textContent = textCont;
  return newElement;
}

let none;

function timer() {
  none = setInterval(() => {
    changeAd("next");
  }, 5000);
}
timer();

function restartTimer() {
  clearInterval(none);
  timer();
}

next.addEventListener("click", () => {
  restartTimer();
  changeAd("next");
});
prev.addEventListener("click", () => {
  restartTimer();
  changeAd("prev");
});

fetch(
  "https://fakerapi.it/api/v1/images?_quantity=9&_type=kittens&_height=300",
  { mode: "cors" }
)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    let cur = 0;
    console.log(response.data[cur]);
    Cards.forEach((card) => {
      const img = eleCreate("", "", response.data[cur].url);
      const text = eleCreate("p", response.data[cur].title);
      text.className = "card-name";
      card.append(img, text);
      cur += 1;
    });
  });
