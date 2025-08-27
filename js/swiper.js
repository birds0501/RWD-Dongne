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

  const updateSlider = new Swiper(".update-slider", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    slidesPerView: "auto",
    spaceBetween: 40,

    breakpoints: {
      1180: { spaceBetween: 30 },
      1179: { spaceBetween: 20 },
      480: { spaceBetween: 20 },
      479: { spaceBetween: 10 },
      0: { spaceBetween: 10 },
    },
    autoplay: {
      delay: 3000, // 3초마다 자동 슬라이드
      disableOnInteraction: false, // 유저가 조작해도 자동재생 유지
    },
    loop: true, // 무한 반복
  });

  const snsSlider = new Swiper(".snsSwiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
  const homeSlider = new Swiper(".homeSwiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  const campaignSlider = new Swiper(".campaignSwiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
});
