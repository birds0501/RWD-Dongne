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

if (btn) {
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
}

// 변수 선언
const btnAd = document.querySelector(".plus.ad");
if (btnAd) {
  btnAd.addEventListener("click", () => {
    const hiddenItems = document.querySelectorAll(".ad-item.hidden");

    for (let i = 0; i < 3 && i < hiddenItems.length; i++) {
      hiddenItems[i].classList.remove("hidden");
    }

    if (container.querySelectorAll(".ad-item.hidden").length === 0) {
      btnAd.style.display = "none";
    }
  });
}

//서비스 소개-신간알림-리뷰 슬라이더
const swiper = new Swiper(".review-wrap", {
  slidesPerView: "auto", // 자동이 아닌, 카드 width 기준으로 보여줌
  spaceBetween: 0,
});
