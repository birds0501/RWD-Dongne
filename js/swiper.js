$(function () {
  const adSlider = new Swiper(".ad-slider", {
    pagination: {
      el: ".ad-slider .swiper-pagination",
      clickable: true,
      type: "fraction",
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
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: true,
    // },
  });

  const bestSlider = new Swiper(".best-slider", {
    slidesPerView: 3.5,
    spaceBetween: 40,
    centeredSlides: false,
    freeMode: false,
    simulateTouch: true,
    touchRatio: 1,

    breakpoints: {
      1180: { slidesPerView: 3.5, spaceBetween: 30 },
      900: { slidesPerView: 3.5, spaceBetween: 30 },
      790: { slidesPerView: 3.5, spaceBetween: 25 },
      600: { slidesPerView: 2.5, spaceBetween: 25 },
      550: { slidesPerView: 2.5, spaceBetween: 25 },
      490: { slidesPerView: 1.5, spaceBetween: 25 },
      391: { slidesPerView: 1.5, spaceBetween: 20 },
      390: { slidesPerView: 1.5, spaceBetween: 20 },
      0: { slidesPerView: 1.5, spaceBetween: 20 },
    },
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

  // 페이지 로딩 시 첫 번째 텍스트 박스 활성화 (초기 상태 설정)

  $("#text-box-0").addClass("active");

  const snsSlider = new Swiper(".snsSwiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },

    on: {
      slideChange: function () {
        const activeIndex = this.realIndex;

        // 모든 텍스트 박스에서 'active' 클래스 제거
        $(".see-text").removeClass("active");

        // 현재 인덱스에 맞는 텍스트 박스에 'active' 클래스 추가
        $(`#text-box-${activeIndex}`).addClass("active");
      },
    },
  });
});
