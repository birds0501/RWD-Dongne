$(function () {
  // 신간알림 더보기 버튼

  // 변수 선언
  const btn = document.querySelector(".plus");
  const hiddenItems = document.querySelectorAll(".item.hidden");

  // IntersectionObserver 생성
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // index 값을 data-delay로 저장한 후 순차적 딜레이 적용
          const index = Array.from(entry.target.parentNode.children).indexOf(
            entry.target
          );
          entry.target.style.transitionDelay = `${index * 0.08}s`;

          entry.target.classList.remove("wait");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (btn) {
    btn.addEventListener("click", () => {
      hiddenItems.forEach((item) => {
        item.classList.remove("hidden");
        item.classList.add("wait");
        observer.observe(item);
      });
      btn.style.display = "none";
    });
  }

  // 변수 선언
  const btnAd = document.querySelector(".plus.ad");
  const foldItems = document.querySelectorAll(".ad-item.hidden");

  // IntersectionObserver 생성
  const watcher = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // index 값을 data-delay로 저장한 후 순차적 딜레이 적용
          const index = Array.from(entry.target.parentNode.children).indexOf(
            entry.target
          );
          entry.target.style.transitionDelay = `${index * 0.08}s`;

          entry.target.classList.remove("wait");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (btnAd) {
    btnAd.addEventListener("click", () => {
      foldItems.forEach((item) => {
        item.classList.remove("hidden");
        item.classList.add("wait");
        watcher.observe(item);
      });
      btnAd.style.display = "none";
    });
  }
});

//동네서점지도 필터

$(function () {
  //대상을 변수에 저장
  const $btnFilter = $(".filter-btns");
  const $filter = $(".store-filter");
  const $filterBottom = $(".bottom-con");
  const $dim = $(".dim");
  const $btnClose = $(".close-btn");

  //flag 아직 활성화되지 않음
  let isActive = false;

  //햄버거 버튼을 클릭했을 때
  $btnFilter.on("click", function (e) {
    e.preventDefault();

    //$menu가 보여지게 : isActive조건에 따라서
    // isActive === false ? openMenu() : closeMenu();
    !isActive ? openMenu() : closeMenu();
  });

  //dim클릭했을 때

  $dim.add($filterBottom).add($btnClose).on("click", closeMenu);

  //공통의 동작을 함수로 정의
  //1. 메뉴의 움직임 (보이거나, 숨기거나)
  function slideMenu(pos) {
    $filter.animate(
      {
        left: pos,
      },
      350
    );
    $filterBottom.animate({ left: pos }, 350);
    isActive = true;
  }

  //2. openMenu : 메뉴를 보이게( 메뉴 + active부여 + dim fadeIn + isActive)
  function openMenu() {
    // $btnFilter.addClass("active");
    $dim.stop().fadeIn();
    slideMenu(0);
    isActive = true;
    // 배경 스크롤 막기
    $("body").css("overflow", "hidden");
  }
  //3. closeMenu : 메뉴를 안 보이게( 메뉴 + active삭제 + dim fadeOut + isActive)
  function closeMenu() {
    // $btnFilter.removeClass("active");
    $dim.stop().fadeOut();
    slideMenu("-100%");
    isActive = false;
    // 배경 스크롤 다시 허용
    $("body").css("overflow", "");

    //서브메뉴 초기화
    initSubmenu();
  }

  const $menuItem = $(".menu-item");
  const $submenu = $(".sub-menu");

  // 서브메뉴 클릭 토글 (같은 메뉴 클릭 시 부드럽게 닫힘 포함)
  // ------------------------
  $menuItem.on("click", function (e) {
    e.preventDefault();

    const $currentSubmenu = $(this).next(".sub-menu");
    const isOpen = !$currentSubmenu.hasClass("hidden"); // 현재 메뉴 열림 여부

    // 다른 서브메뉴 닫기
    $submenu
      .not($currentSubmenu)
      .stop()
      .slideUp(300, function () {
        $(this).addClass("hidden");
      });
    $menuItem.parent("li").not($(this).parent("li")).removeClass("on");

    if (!isOpen) {
      // 클릭한 메뉴가 닫혀 있었으면 열기
      $currentSubmenu.removeClass("hidden").stop().slideDown(300);
      $(this).parent("li").addClass("on");
    } else {
      // 클릭한 메뉴가 열려 있었으면 닫기
      $currentSubmenu.stop().slideUp(300, function () {
        $(this).addClass("hidden");
      });
      $(this).parent("li").removeClass("on");
    }
  });

  // ------------------------
  // 서브메뉴 초기화 함수
  // ------------------------
  function initSubmenu() {
    $submenu.stop().slideUp(300, function () {
      $(this).addClass("hidden");
    });
    $menuItem.parent("li").removeClass("on");
  }

  // ------------------------
  // 더블클릭하면 모든 서브메뉴 닫기
  // ------------------------
  $menuItem.on("dblclick", initSubmenu);
});

// 서브 동네서점지도 서점 상세정보 창 나오게 하기
$(function () {
  // 대상을 변수에 저장
  const $store = $(".re-wrap > li");
  const $storeInfo = $(".store-info");
  const $backIcon = $(".back-icon");
  const $map = $(".g-map");
  const $pop = $(".fit-store");
  const $backToList = $(".back-list");

  //flag 아직 활성화되지 않음
  let isActive = false;

  //store 클릭했을 때
  $store.on("click", function (e) {
    e.preventDefault();

    //$menu가 보여지게 : isActive조건에 따라서
    // isActive === false ? openMenu() : closeMenu();
    !isActive ? openMenu() : closeMenu();
  });

  //dim클릭했을 때

  $backIcon.add($map).add($backToList).on("click", closeMenu);

  //공통의 동작을 함수로 정의
  //1. 메뉴의 움직임 (보이거나, 숨기거나)
  function slideMenu(pos) {
    $storeInfo.animate(
      {
        left: pos,
      },
      350
    );
    isActive = true;
  }

  //2. openMenu : 메뉴를 보이게( 메뉴 + active부여 + dim fadeIn + isActive)
  function openMenu() {
    slideMenu(0);
    isActive = true;

    const scrollTop = $pop.scrollTop();
    $storeInfo.css({
      top: scrollTop + "px",
    });

    // 패널 내부 스크롤 초기화
    $storeInfo.scrollTop(0);

    //$storeinfo 열리면 $pop 시작점으로 스크롤 올려주기
    if ($(window).width() > 1180) {
      // 해상도 조건

      $("html, body").animate(
        {
          scrollTop: $pop.offset().top,
        },
        500
      );
    } else {
      $("body").css("overflow", "hidden");
    }

    $pop.css("overflow", "hidden");
  }

  function closeMenu() {
    slideMenu("-100%");
    isActive = false;

    $("body").css("overflow", "");
    $pop.css("overflow", "auto");
  }

  //해상도 바꿀때 적용
  $(window).on("resize", function () {
    if (!isActive) return; // 메뉴가 열려있을 때만 적용

    if ($(window).width() > 1180) {
      // 1180 이상 → body overflow 원상복구
      $("body").css("overflow", "");
    } else {
      // 1180 이하 → body overflow hidden 유지
      $("body").css("overflow", "hidden");
    }
  });
});

//1180이하 .re-wrap ui변경(숨겨놓았다가 버튼 누르면 등장)
//1180px이하면 .re-wrap>li에 hidden 클래스 추가
$(function () {
  const items = document.querySelectorAll(".re-wrap > li");
  const moreStore = document.querySelector(".more-store");
  const hiddenCount = 6; // 화면 로딩 시 숨길 개수
  const revealCount = 3; // 버튼 클릭 시 한 번에 나타낼 개수
  const mq = window.matchMedia("(max-width: 1180px)");

  // 초기 화면에서 숨김 처리
  function setHidden(mq) {
    items.forEach((li) => li.classList.remove("hidden"));
    if (mq.matches) {
      const endItems = Array.from(items).slice(-hiddenCount);
      endItems.forEach((li) => li.classList.add("hidden"));
      // 버튼 표시: hidden-more 클래스 제거
      moreStore.classList.remove("hidden-more");
    } else {
      // PC에서는 버튼 숨김: hidden-more 클래스 추가
      moreStore.classList.add("hidden-more");
    }
  }

  // 초기 체크
  $(document).ready(function () {
    setHidden(mq);
    mq.addEventListener("change", () => setHidden(mq));
  });

  // 더보기 버튼 클릭 시
  moreStore.addEventListener("click", () => {
    const hiddenItems = Array.from(
      document.querySelectorAll(".re-wrap > li.hidden")
    );

    // revealCount만큼만 보여주기
    hiddenItems.slice(0, revealCount).forEach((li, i) => {
      li.style.transitionDelay = `${i * 0.05}s`; // 약간의 딜레이
      li.classList.remove("hidden");
    });

    // 남은 hidden이 없으면 버튼 숨김
    if (document.querySelectorAll(".re-wrap > li.hidden").length === 0) {
      moreStore.classList.add("hidden-more");
    }
  });
});
