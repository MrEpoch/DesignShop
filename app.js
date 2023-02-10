const images = document.querySelector(".images");
const pointContainer = document.querySelector(".point-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let curAd = 0;

function changeAd(direction) {
  const checkCur = () => {
    if (curAd <= 4 && curAd >= 0) {
      console.log(direction);
      if (direction === "next") {
        curAd += 1;
      } else if (direction === "prev") {
        curAd -= 1;
      } else {
        throw Error("Something is very wrong");
      }
    }
    console.log(curAd);
    if (curAd < 0) {
      curAd = 4;
    } else if (curAd > 4) {
      curAd = 0;
    }
  };
  console.log(images.children);
  images.children[curAd].className = "non-visible";
  pointContainer.children[curAd].className = "point";

  checkCur();
  console.log(curAd);
  images.children[curAd].className = "visible";
  pointContainer.children[curAd].className = "point checked";
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
