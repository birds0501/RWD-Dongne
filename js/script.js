$(function () {
  // ===========================
  // 신간알림 더보기 버튼
  // ===========================
  const $btn = $(".alarm-con .plus");
  const $hiddenItems = $(".alarm-con .item.hidden");

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
    });
  }

  // ===========================
  // 광고 더보기 버튼
  // ===========================
  const $btnAd = $(".plus.ad");
  const $foldItems = $(".ad-con .ad-item.hidden");

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

  let isActiveStore = false;

  $store.add($inMap).on("click", function (e) {
    e.preventDefault();
    !isActiveStore ? openStore() : closeStore();
  });

  $backIcon.add($backToList).on("click", closeStore);

  function slideStore(pos) {
    $storeInfo.animate({ left: pos }, 350);
    isActiveStore = true;
  }

  function openStore() {
    slideStore(0);
    isActiveStore = true;
    const scrollTop = $pop.scrollTop();
    $storeInfo.css({ top: scrollTop + "px" });
    $storeInfo.scrollTop(0);

    if ($(window).width() > 1180) {
      $("html, body").animate({ scrollTop: $pop.offset().top }, 500);
    } else {
      $("body").css("overflow", "hidden");
    }
    $pop.css("overflow", "hidden");
  }

  function closeStore() {
    slideStore("-100%");
    isActiveStore = false;
    $("body").css("overflow", "");
    $pop.css("overflow", "auto");
  }

  $(window).on("resize", function () {
    if (!isActiveStore) return;
    if ($(window).width() > 1180) {
      $("body").css("overflow", "");
    } else {
      $("body").css("overflow", "hidden");
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
});
