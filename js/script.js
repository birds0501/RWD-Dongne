$(function () {
  // ===========================
  // 신간알림 더보기 버튼
  // ===========================
  const $btn = $(".alarm-con .plus");
  const $hiddenItems = $(".alarm-con .item.hidden");
  const $btnMargin = $(".alarm-con .view-more");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 그룹 내 index 계산
          const index = $(entry.target).index();
          $(entry.target)
            .css("transition-delay", `${index * 0.04}s`)
            .removeClass("wait");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if ($btn.length) {
    $btn.on("click", function () {
      $hiddenItems.each(function () {
        $(this).removeClass("hidden").addClass("wait");
        observer.observe(this);
      });
      $btn.hide();
      $btnMargin.css({
        margin: 0,
      });
    });
  }

  // ===========================
  // 광고 더보기 버튼
  // ===========================
  const $btnAd = $(".plus.ad");
  const $foldItems = $(".ad-con .ad-item.hidden");
  const $btnAdMargin = $(".view-more.bottom");

  const watcher = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = $(entry.target).index();
          $(entry.target)
            .css("transition-delay", `${index * 0.04}s`)
            .removeClass("wait");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if ($btnAd.length) {
    $btnAd.on("click", function () {
      $foldItems.each(function () {
        $(this).removeClass("hidden").addClass("wait");
        watcher.observe(this);
      });

      $btnAd.hide();
      $btnAdMargin.css({
        marginBottom: 0,
      });
    });
  }

  // ===========================
  // 테마 더보기 버튼
  // ===========================
  const $btnTheme = $(".theme-more");
  const $themefoldItems = $(".theme-map-item.hidden");

  const themeWatcher = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = $(entry.target).index();
          $(entry.target).css("transition-delay", `${index * 0.08}s`);
          $(entry.target).removeClass("wait");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if ($btnTheme.length) {
    $btnTheme.on("click", function () {
      $themefoldItems.each(function () {
        $(this).removeClass("hidden").addClass("wait");
        themeWatcher.observe(this);
      });
      $btnTheme.hide();
    });
  }

  // ===========================
  // 동네서점 지도 필터
  // ===========================
  const $btnFilter = $(".filter-btns");
  const $filter = $(".store-filter");
  const $filterBottom = $(".bottom-con");
  const $dim = $(".dim");
  const $btnClose = $(".close-btn");

  let isActive = false;

  function slideMenu(pos) {
    if ($(window).width() <= 1180) {
      $filter.animate({ bottom: pos }, 350);
      $filterBottom.animate({ bottom: pos }, 350);
    } else {
      $filter.animate({ left: pos }, 350);
      $filterBottom.animate({ left: pos }, 350);
    }
    isActive = true;
  }

  $(window).on("resize", function () {
    if (!isActive) return;
    if ($(window).width() > 1180) {
      $filter.add($filterBottom).css({ left: "0" });
    } else {
      $filter.add($filterBottom).css({ bottom: "0" });
    }
  });

  function openMenu() {
    $dim.stop().fadeIn();
    slideMenu(0);
    isActive = true;
    $("body").css("overflow", "hidden");
  }

  function closeMenu() {
    $dim.stop().fadeOut();
    slideMenu("-100%");
    isActive = false;
    $("body").css("overflow", "");
    initSubmenu();
  }

  $btnFilter.on("click", function (e) {
    e.preventDefault();
    !isActive ? openMenu() : closeMenu();
  });

  $dim.add($filterBottom).add($btnClose).on("click", closeMenu);

  const $menuItem = $(".menu-item");
  const $submenu = $(".sub-menu");

  $menuItem.on("click", function (e) {
    e.preventDefault();
    const $currentSubmenu = $(this).next(".sub-menu");
    const isOpen = !$currentSubmenu.hasClass("hidden");

    $submenu
      .not($currentSubmenu)
      .stop()
      .slideUp(300, function () {
        $(this).addClass("hidden");
      });
    $menuItem.parent("li").not($(this).parent("li")).removeClass("on");

    if (!isOpen) {
      $currentSubmenu.removeClass("hidden").stop().slideDown(300);
      $(this).parent("li").addClass("on");
    } else {
      $currentSubmenu.stop().slideUp(300, function () {
        $(this).addClass("hidden");
      });
      $(this).parent("li").removeClass("on");
    }
  });

  function initSubmenu() {
    $submenu.stop().slideUp(300, function () {
      $(this).addClass("hidden");
    });
    $menuItem.parent("li").removeClass("on");
  }

  $menuItem.on("dblclick", initSubmenu);

  // ===========================
  // 서점 상세 정보 창
  // ===========================
  const $store = $(".re-wrap > li");
  const $storeInfo = $(".store-info");
  const $backIcon = $(".back-icon");
  const $backToList = $(".back-list");
  const $inMap = $(".in-map");
  const $pop = $(".fit-store");
  const $header = $("header");

  let isActiveStore = false;

  // 상세창 열기/닫기 토글
  $store.add($inMap).on("click", function (e) {
    e.preventDefault();
    !isActiveStore ? openStore() : closeStore();
  });

  $backIcon.add($backToList).on("click", closeStore);

  // 상세창 슬라이드 함수
  function slideStore(pos) {
    $storeInfo.animate({ left: pos }, 350);
    isActiveStore = true;
  }

  // ===========================
  // 1180px 이하: 상세창 위치 갱신
  // ===========================
  function updateStoreInfoTopMobile() {
    if ($(window).width() > 1180) return; // 1180 초과는 무시

    const scrollTop = $pop.scrollTop();
    let offsetTop = 0;

    if (!$header.hasClass("hide")) {
      offsetTop = $header.outerHeight() || 0;
    }

    $storeInfo.css({ top: scrollTop + offsetTop + "px" });
  }

  // ===========================
  // 상세창 열기
  // ===========================
  function openStore() {
    slideStore(0);
    isActiveStore = true;

    const scrollTop = $pop.scrollTop();
    $storeInfo.css({ top: scrollTop + "px" }); // 초기값
    $storeInfo.scrollTop(0);

    if ($(window).width() > 1180) {
      const headerHeight = $header.outerHeight() || 0;
      $("html, body").animate(
        { scrollTop: $pop.offset().top - headerHeight },
        500
      );
    } else {
      $("body").css("overflow", "hidden");
      // 1180 이하: 상세창 열릴 때 헤더 항상 보이게
      $header.removeClass("hide");
      updateStoreInfoTopMobile(); // 헤더 높이 반영해서 상세창 top 조정
    }

    $pop.css("overflow", "hidden");
  }

  // ===========================
  // 상세창 닫기
  // ===========================
  function closeStore() {
    slideStore("-100%");
    isActiveStore = false;
    $("body").css("overflow", "");
    $pop.css("overflow", "auto");
  }

  // ===========================
  // 헤더 스크롤 숨김/보임 기능
  // ===========================
  let lastScroll = 0;
  $(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    // 상세창이 열려 있고 1180 이하일 때는 헤더 숨김 방지
    if (isActiveStore && $(window).width() <= 1180) {
      $header.removeClass("hide");
    } else {
      if (currentScroll <= 0) {
        $header.removeClass("hide");
      } else if (currentScroll > lastScroll) {
        $header.addClass("hide");
      } else {
        $header.removeClass("hide");
      }
    }

    lastScroll = currentScroll;

    // 1180 이하 & 상세창 열려있을 때 위치 갱신
    if (isActiveStore) updateStoreInfoTopMobile();
  });

  // ===========================
  // 리사이즈 시에도 1180 이하일 경우 위치 갱신
  // ===========================
  $(window).on("resize", function () {
    if (!isActiveStore) return;

    if ($(window).width() > 1180) {
      $("body").css("overflow", "");
      $storeInfo.css("top", "");
    } else {
      $("body").css("overflow", "hidden");
      updateStoreInfoTopMobile(); // 1180 이하이면 위치 재조정
    }
  });

  // ===========================
  // 1180 이하 더보기 기능
  // ===========================
  const $items = $(".re-wrap > li");
  const $moreStore = $(".more-store");
  const hiddenCount = 6;
  const revealCount = 3;
  const mq = window.matchMedia("(max-width: 1180px)");

  function setHidden(mq) {
    $items.removeClass("hidden");
    if (mq.matches) {
      $items.slice(-hiddenCount).addClass("hidden");
      $moreStore.removeClass("hidden-more");
    } else {
      $moreStore.addClass("hidden-more");
    }
  }

  setHidden(mq);
  mq.addEventListener("change", () => setHidden(mq));

  $moreStore.on("click", function () {
    $items
      .filter(".hidden")
      .slice(0, revealCount)
      .each(function (i) {
        $(this)
          .css("transition-delay", `${i * 0.05}s`)
          .removeClass("hidden");
      });
    if ($items.filter(".hidden").length === 0) {
      $moreStore.addClass("hidden-more");
    }
  });

  // ===========================
  // 테마지도 더보기 버튼
  // ===========================
  const $themeBtn = $(".plus.theme");
  const $themeHiddenItems = $(".theme-map-item.hidden");

  const sum = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 그룹 내 index 계산
          const index = $(entry.target).index();
          $(entry.target)
            .css("transition-delay", `${index * 0.04}s`)
            .removeClass("wait");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if ($themeBtn.length) {
    $themeBtn.on("click", function () {
      $themeHiddenItems.each(function () {
        $(this).removeClass("hidden").addClass("wait");
        sum.observe(this);
      });
      $themeBtn.hide();
    });
  }

  // 서비스 소개 동네서점지도 item-2 br-pc 제거(600초과하면 다시 붙게)
  function toggleBr() {
    if ($(window).width() <= 600) {
      $("br.br-pc").hide(); // 작은 해상도 → 숨김
    } else {
      $("br.br-pc").show(); // 큰 해상도 → 다시 보이기
    }
  }

  // 처음 로드 시 실행
  toggleBr();

  // 리사이즈할 때도 실행
  $(window).on("resize", function () {
    toggleBr();
  });

  // 서비스 소개 신간알림 br-ad 제거(1180이하는 클래스 제거)
  function toggleBrAd() {
    if ($(window).width() <= 1180) {
      $("br.br-ad").hide();
    } else {
      $("br.br-ad").show(); // 큰 해상도 → 다시 보이기
    }
  }

  // 처음 로드 시 실행
  toggleBrAd();

  // 리사이즈할 때도 실행
  $(window).on("resize", function () {
    toggleBrAd();
  });

  // 서비스 소개 신간알림 br-new 제거(424이하는 클래스 제거)
  function toggleBrNew() {
    if ($(window).width() <= 1180) {
      $("br.br-new").hide();
    } else {
      $("br.br-new").show(); // 큰 해상도 → 다시 보이기
    }
  }

  // 처음 로드 시 실행
  toggleBrNew();

  // 리사이즈할 때도 실행
  $(window).on("resize", function () {
    toggleBrNew();
  });

  // 이미지 사이즈 변경!!
  function changeImg() {
    if ($(window).width() <= 600) {
      $(".tag-wrap > figure > img").attr("src", "./img/tag-wrap-img-m.svg");
    } else {
      $(".tag-wrap > figure > img").attr("src", "./img/tag-wrap-img.svg");
    }
  }

  // 처음 로드 시 실행
  changeImg();

  // 창 크기 바뀔 때 실행
  $(window).on("resize", function () {
    changeImg();
  });

  //blur 보이게
  function checkWidth() {
    if ($(window).width() <= 600) {
      $(".blur-right").removeClass("hidden");
    }
  }

  // 페이지 처음 로딩될 때 실행
  checkWidth();

  // 창 크기 바뀔 때도 실행
  $(window).on("resize", function () {
    checkWidth();
  });

  // ===========================
  // 메인 헤더 스크롤시 색상 변경
  // ===========================

  const header = $("header")[0]; // jQuery 객체에서 DOM 요소 가져오기
  const visual = $(".visual")[0]; // jQuery 객체에서 DOM 요소 가져오기

  if (!visual) return; // visual이 없으면 실행 안 함

  const obHeader = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.remove("scrolled");
        } else {
          header.classList.add("scrolled");
        }
      });
    },
    { root: null, threshold: 0.2 }
  );

  obHeader.observe(visual);

  $(".alarm-ad a")
    .eq(1)
    .on("click", function (e) {
      e.preventDefault(); // a 태그 기본 동작 막기

      const targetTop = $(".sub-ad").offset().top;

      $("html, body").animate(
        { scrollTop: targetTop },
        500 // 0.5초 동안 부드럽게 이동
      );
    });

  $(document).on("click", ".alarm-ad a:eq(1)", function (e) {
    e.preventDefault();

    const $target = $(".sub-ad");
    if ($target.length === 0) return; // 안전 처리

    const targetTop = $target.offset().top;
    const headerHeight = $("header").outerHeight() || 0; // 고정 헤더 있으면 보정

    $("html, body").animate({ scrollTop: targetTop - headerHeight }, 500);
  });
});

$(function () {
  // ===========================
  // 메뉴 활성화(1180이하)
  // ===========================
  // 메뉴 열기
  $(".util-menu").on("click", function (e) {
    if ($(window).width() > 1180) return;

    e.preventDefault();
    $(".menu-open, .dim-menu").addClass("active");
    $("body").css("overflow", "hidden");
  });

  // 메뉴 닫기
  $(".dim-menu, .menu-close-ico").on("click", function () {
    if ($(window).width() > 1180) return;

    $(".menu-open, .dim-menu").removeClass("active");
    $("body").css("overflow", "");
  });

  // 리사이즈 시 메뉴 초기화
  function handleResizeMenu() {
    if ($(window).width() > 1180) {
      $(".menu-open, .dim-menu").removeClass("active");
      $("body").css("overflow", "");
    }
  }

  handleResizeMenu();
  $(window).on("resize", handleResizeMenu);

  // ===========================
  // 신간알림광고 탭 누르면 광고로 이동
  // ===========================

  $(document).on("click", ".alarm-ad a:eq(1)", function (e) {
    e.preventDefault();

    const $target = $(".sub-ad");
    if ($target.length === 0) return; // 대상 없으면 종료

    const targetTop = $target.offset().top;
    const headerHeight = $("header").outerHeight() || 0; // 고정 헤더 있으면 보정

    $("html, body").animate(
      { scrollTop: targetTop - headerHeight },
      500 // 0.5초 동안 부드럽게 이동
    );
  });
});
