$(function () {
  const adSlider = new Swiper(".ad-slider", {
    pagination: {
      el: ".ad-slider .swiper-pagination",
      clickable: true,
      type: "fraction",
    },
    navigation: {
      nextEl: ".ad-button-wrap .swiper-button-next",
      prevEl: ".ad-button-wrap .swiper-button-prev",
    },
    loop: true,

    autoplay: {
      delay: 3200,
      disableOnInteraction: false,
    },
  });

  const issueSlider = new Swiper(".issue-slider", {
    pagination: {
      el: ".issue-slider .swiper-pagination",
      clickable: true,
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-controls-wrap .swiper-button-next",
      prevEl: ".swiper-controls-wrap .swiper-button-prev",
    },
    loop: true,

    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false,
    // },
  });

  const swiper = new Swiper(".now-con", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: ".now-button-wrap .swiper-button-next",
      prevEl: ".now-button-wrap .swiper-button-prev",
    },
    breakpoints: {
      // 768px 이하가 아니라 "768px 이상"일 때의 설정으로 작성하는 것이 정석입니다.
      // 하지만 보통 모바일 퍼스트로 작성하므로 아래와 같이 구성합니다.
      0: {
        slidesPerView: 1.4,
      },
      521: {
        slidesPerView: 2.2, // 모바일에서는 더 작게 보일 수도 있으니 예시로 추가
        spaceBetween: 20,
      },
      769: {
        slidesPerView: 3, // 태블릿에서 2개 반 노출
        spaceBetween: 20, // 화면이 좁아지니 간격도 살짝 줄이는 게 예뻐요
      },
    },
  });
  const detailswiper = new Swiper(".detail-slider", {
    breakpoints: {
      0: {
        slidesPerView: 1.1,
      },

      1200: {
        slidesPerView: 1.5,
      },

      1600: {
        slidesPerView: 1.8,
      },
    },
    spaceBetween: 8,
    navigation: {
      nextEl: ".store-controls-wrap .swiper-button-next",
      prevEl: ".store-controls-wrap .swiper-button-prev",
    },
  });
  const relatedswiper = new Swiper(".related-theme", {
    breakpoints: {
      0: {
        slidesPerView: 1.4,
      },

      1200: {
        slidesPerView: 2.1,
      },
    },
    spaceBetween: 6,
    navigation: {
      nextEl: ".related-theme-controls .swiper-button-next",
      prevEl: ".related-theme-controls .swiper-button-prev",
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
