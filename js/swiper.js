$(function () {
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
    observer: true,
    observeParents: true,
    simulateTouch: true,
    touchRatio: 1,
  });

  const bestSlider = new Swiper(".best-slider", {
    slidesPerView: "auto",
    spaceBetween: 50,
    slidesOffsetAfter: 150,
    watchOverflow: true,
    freeMode: false,
    simulateTouch: true,
    touchRatio: 1,
  });

  //서비스 소개-신간알림-리뷰 슬라이더
  const swiper = new Swiper(".review-wrap", {
    slidesPerView: "auto", // 자동이 아닌, 카드 width 기준으로 보여줌
    spaceBetween: 0,
    simulateTouch: true,
    touchRatio: 1,
  });
});
