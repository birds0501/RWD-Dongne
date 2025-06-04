const adSlider = new Swiper(".ad-slider", {
  pagination: {
    el: ".ad-slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

const bestSlider = new Swiper(".best-slider", {
  slidesPerView: "auto",
  spaceBetween: 50,
  slidesOffsetAfter: 150,
  watchOverflow: true,
  freeMode: false,
});

// 신간알림 더보기 버튼

// 변수 선언
const btn = document.querySelector(".plus");

btn.addEventListener("click", () => {
  const alarmContents = document.querySelector(".alarm-con");
  const hiddenItems = document.querySelectorAll(".item.hidden");

  for (let i = 0; i < 2 && i < hiddenItems.length; i++) {
    hiddenItems[i].classList.remove("hidden");
  }

  if (container.querySelectorAll(".item.hidden").length === 0) {
    btn.style.display = "none";
  }
});

// 변수 선언
const btnAd = document.querySelector(".plus.ad");

btnAd.addEventListener("click", () => {
  const alarmContents = document.querySelector(".alarm-con");
  const hiddenItems = document.querySelectorAll(".ad-item.hidden");

  for (let i = 0; i < 3 && i < hiddenItems.length; i++) {
    hiddenItems[i].classList.remove("hidden");
  }

  if (container.querySelectorAll(".ad-item.hidden").length === 0) {
    btnAd.style.display = "none";
  }
});
