$(function () {
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault();
  });

  // ===========================
  // 마켓 더보기 동작

  $(function () {
    function checkResponsive() {
      const windowWidth = $(window).width();

      if (windowWidth <= 600) {
        // 💡 모바일 화면으로 들어왔을 때, 아직 활성화된 카드가 없다면 최초 개수만큼 클래스 부여
        if ($(".card-item.is-active").length === 0) {
          $(".card-item").slice(0, 8).addClass("is-active");
        }
      } else {
        // 💻 PC 화면으로 돌아가면 모바일에서 덕지덕지 붙었던 클래스를 깔끔하게 지워 초기화해 줍니다.
        // (어차피 PC 노출은 위의 CSS :nth-of-type이 완벽하게 통제하고 있습니다.)
        $(".card-item").removeClass("is-active");
      }
    }

    // 화면 열릴 때 최초 1회 실행
    checkResponsive();

    // 💡 사용자가 브라우저 창 크기를 늘렸다 줄였다 할 때 실시간 감지하여 실행
    $(window).on("resize", function () {
      checkResponsive();
    });

    // [모바일 무한 스크롤 로직]
    $(window).on("scroll", function () {
      const currentWidth = $(window).width();

      if (currentWidth <= 600) {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();

        // 바닥 근처에 오면 다음 4개(모바일 2줄 분량)씩 추가 로딩
        if (scrollTop + windowHeight >= documentHeight - 100) {
          $(".card-item:hidden").slice(0, 8).addClass("is-active");
        }
      }
    });
  });

  // ===========================
  // sub-link .active
  $(".sub-link a").on("click", function () {
    $(".sub-link a").removeClass("active");
    $(this).addClass("active");
  });

  // ===========================
  // .chips-wrap.single
  $(".chips-wrap.single .chip").on("click", function () {
    const $wrap = $(this).closest(".chips-wrap.single");

    $wrap.find(".chip").removeClass("active");
    $(this).addClass("active");
  });
  // ===========================
  // .chips-wrap.multiple
  $(".chips-wrap.multiple .chip").on("click", function () {
    $(this).toggleClass("active");

    updateFilterCount();
    filterStores();
  });

  // 필터 개수 및 버튼 상태
  function updateFilterCount() {
    const count = $(".chips-wrap.multiple .chip.active").length;
    const $filterBtn = $(".filter-all-btn");
    const $resetBtn = $(".filter-reset-btn");

    if (count > 0) {
      $filterBtn.attr("data-count", count).addClass("has-count active");
    } else {
      $filterBtn.removeAttr("data-count").removeClass("has-count active");
    }

    $resetBtn.toggleClass("hidden", count === 0);

    updateChipsFade();
  }

  // 그라디언트 표시 여부
  function updateChipsFade() {
    $(".chips-scroll").each(function () {
      const el = this;

      const canScroll = el.scrollWidth > el.clientWidth;
      const isEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;

      $(el)
        .closest(".chips-area")
        .toggleClass("show-fade", canScroll && !isEnd);
    });
  }

  // 리셋 버튼
  $(".filter-reset-btn").on("click", function () {
    $(".chips-wrap.multiple .chip").removeClass("active");

    updateFilterCount();
    filterStores();
  });

  // 스크롤 시 그라디언트 업데이트
  $(".chips-scroll").on("scroll", updateChipsFade);

  // 리사이즈 시 그라디언트 업데이트
  $(window).on("resize", updateChipsFade);

  // 최초 실행
  updateFilterCount();

  // ===========================
  // market select-box
  const $customSelect = $(".custom-select");
  const $selected = $(".custom-select .selected");
  const $options = $(".custom-select .options li");

  $selected.on("click", function (e) {
    e.stopPropagation();
    $(this).closest(".custom-select").toggleClass("active");
  });

  $options.on("click", function () {
    const $this = $(this);
    const text = $this.text();
    const $parentSelect = $this.closest(".custom-select");

    $parentSelect.find(".selected").html(text + ' <span class="arrow"></span>');
    $this.addClass("active").siblings().removeClass("active");
    $parentSelect.removeClass("active");
  });

  $(document).on("click", function () {
    $customSelect.removeClass("active");
  });

  // ===========================
  //토스트 메시지 동작

  const toastMessage = {
    store: {
      add: "찜한 서점에 추가했어요.",
      remove: "찜한 서점에서 삭제했어요.",
    },
    market: {
      add: "찜한 상품에 추가했어요.",
      remove: "찜한 상품에서 삭제했어요.",
    },
    detail: {
      add: "즐겨찾기에 추가했어요.",
      remove: "즐겨찾기에서 삭제했어요.",
    },
  };

  const $toast = $(".toast");

  function showToast(message) {
    $toast.text(message).addClass("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
      $toast.removeClass("show");
    }, 2000);
  }

  $(".bookmark-btn").on("click", function (e) {
    e.stopPropagation();

    const $btn = $(this);

    $btn.toggleClass("active");

    const type = $btn.closest("[data-type]").data("type");

    const message = $btn.hasClass("active")
      ? toastMessage[type].add
      : toastMessage[type].remove;

    showToast(message);
  });

  // 복사 버튼
  const copyMessage = {
    address: "주소를 복사했어요.",
    phone: "전화번호를 복사했어요.",
  };

  $(".copy-btn").on("click", async function () {
    const text = $(this).data("copy");
    const type = $(this).data("copy-type");

    try {
      await navigator.clipboard.writeText(text);
      showToast(copyMessage[type]);
    } catch (err) {
      showToast("복사에 실패했어요.");
    }
  });
  // ===========================
  // 북이슈 더보기
  // ===========================
  const $btnAd = $(".new-list-button");

  const MOBILE_BREAKPOINT = 600;
  const LOAD_COUNT = 6;

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        $(entry.target).removeClass("wait");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
    },
  );

  function loadMoreCards() {
    const $hiddenCards = $(".alarm-con .book-card.hidden");

    if (!$hiddenCards.length) return;

    $hiddenCards.slice(0, LOAD_COUNT).each(function (idx) {
      $(this).removeClass("hidden").addClass("wait");

      cardObserver.observe(this);
    });

    // 더 이상 숨겨진 카드가 없으면
    if ($(".alarm-con .book-card.hidden").length === 0) {
      $(".business-banner").removeClass("hidden");
      $btnAd.hide();
    }
  }

  function checkResponsive() {
    const isMobile = $(window).width() <= MOBILE_BREAKPOINT;

    if (isMobile) {
      $btnAd.hide();
    } else {
      // 숨겨진 카드가 남아있을 때만 버튼 노출
      if ($(".alarm-con .book-card.hidden").length > 0) {
        $btnAd.show();
      }
    }
  }

  // 최초 실행
  checkResponsive();

  // PC 더보기 버튼
  $btnAd.on("click", function () {
    loadMoreCards();
  });

  // 리사이즈 대응
  $(window).on("resize", function () {
    checkResponsive();
  });

  // 모바일 무한 스크롤
  let isLoading = false;

  $(window).on("scroll", function () {
    if ($(window).width() > MOBILE_BREAKPOINT) return;
    if (isLoading) return;

    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();

    if (scrollTop + windowHeight >= documentHeight - 100) {
      isLoading = true;

      loadMoreCards();

      setTimeout(() => {
        isLoading = false;
      }, 200);
    }
  });

  // ----------------------
  // 서점찾기
  // ----------------------
  const $list = $(".store-list-page");
  const $details = $(".store-detail");
  const $findStoreBody = $(".find-store-body");
  const $toggleBtn = $(".view-toggle-btn");
  const $toggleIcon = $toggleBtn.find("img");
  const $toggleText = $toggleBtn.find("span");
  const $pins = $(".map-pin");
  const $preview = $(".map-preview");
  let selectedStoreId = null;
  let currentStoreId = null;
  let currentView = "list";
  let previousView = "list";
  let listScrollTop = 0;
  const $chips = $(".chips-wrap.multiple .chip");
  const $cards = $(".store-card");
  const $resultCount = $(".result-count");
  const $resultTitle = $(".result-title");

  // ----------------------
  // 필터함수
  // ----------------------
  function filterStores() {
    const selectedTags = [];

    $chips.filter(".active").each(function () {
      selectedTags.push($(this).data("tag"));
    });

    // 핀 active 제거
    $pins.removeClass("active");

    // 미니카드 닫기
    hidePreview();

    // 상세 닫기
    if (currentView === "detail") {
      closeStore();
    }

    let visibleCount = 0;

    $cards.each(function () {
      const tags = ($(this).data("tags") || "").split(" ");

      const matched =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => tags.includes(tag));

      $(this).toggleClass("filtered-out", !matched);
      if (matched) visibleCount++;
    });

    $resultCount.text(`${visibleCount}개`);

    if (selectedTags.length > 0) {
      $resultTitle.text("검색 서점");
    } else {
      $resultTitle.text("전체 서점");
    }

    console.log(selectedTags.length);
    console.log($resultTitle.length);
    console.log($resultCount.length);
  }

  // ----------------------
  // 리스트 ↔ 지도 렌더링
  // ----------------------
  function renderView() {
    if ($(window).width() > 768) {
      $findStoreBody.removeClass("view-list view-map");
      return;
    }
    if (currentView === "detail") return;
    $findStoreBody
      .toggleClass("view-list", currentView === "list")
      .toggleClass("view-map", currentView === "map");

    if (currentView === "list") {
      $toggleText.text("지도 보기");
      $toggleIcon.attr("src", "./img/map-icon.svg");
    } else if (currentView === "map") {
      $toggleText.text("목록 보기");
      $toggleIcon.attr("src", "./img/list-icon.svg");
    }
  }

  // ----------------------
  // 미니카드 로직
  // ----------------------

  function showPreview(storeId) {
    selectedStoreId = storeId;

    // 핀 active
    $pins.removeClass("active");
    $(`.map-pin[data-store-id="${storeId}"]`).addClass("active");

    // 미니카드 표시
    $preview.addClass("show");

    // 플로팅 버튼 비활성화
    $toggleBtn.addClass("disabled");
  }

  function hidePreview() {
    selectedStoreId = null;

    $pins.removeClass("active");

    $preview.removeClass("show");

    $toggleBtn.removeClass("disabled");
  }

  $preview.on("click", function () {
    if (selectedStoreId === null) return;
    console.log("preview click");
    console.log(selectedStoreId);
    openStore(selectedStoreId);
  });

  // 빈 곳 클릭하면 카드 다운
  $(".map-wrap").on("click", function (e) {
    // 핀 클릭이면 무시
    if ($(e.target).closest(".map-pin").length) return;

    // 모바일
    if ($(window).width() <= 768) {
      hidePreview();
      return;
    }

    // PC
    if (currentView === "detail") {
      closeStore();
    }
  });

  // ----------------------
  // 상세 열기
  // ----------------------
  function openStore(storeId) {
    // 리스트 클릭
    console.log("save", window.scrollY);

    // 상세 열기 직전
    console.log("saved value", listScrollTop);

    // 뒤로가기 직전
    console.log("restore", listScrollTop);
    currentStoreId = storeId;
    $preview.removeClass("show");
    // previousView = currentView;
    if (currentView !== "detail") {
      previousView = currentView;
    }

    // if (previousView === "list") {
    //   listScrollTop = $(window).scrollTop();
    // }
    if (currentView === "list") {
      listScrollTop = window.scrollY;
    }

    currentView = "detail";

    // 기존 active 제거
    $pins.removeClass("active");

    // 선택한 핀 active
    $(`.map-pin[data-store-id="${storeId}"]`).addClass("active");

    // storeId → detailId(1~5 반복)
    const detailId = ((storeId - 1) % 5) + 1;

    $list.removeClass("active");
    $findStoreBody.removeClass("view-list view-map").addClass("view-detail");

    // 모든 상세 초기화
    $details.removeClass("show active");
    // 선택한 상세
    const $target = $(`.store-detail[data-detail-id="${detailId}"]`);

    // 먼저 display:block
    $target.addClass("show");

    // 다음 프레임에 Fade In
    requestAnimationFrame(() => {
      $target.addClass("active");
    });

    $toggleBtn.addClass("hidden");

    $(window).scrollTop(0);
  }

  // ----------------------
  // 상세 닫기
  // ----------------------
  function closeStore() {
    currentStoreId = null;
    currentView = previousView;
    $pins.removeClass("active");

    const $activeDetail = $(".store-detail.show");

    // Fade Out
    $activeDetail.removeClass("active");

    // 완전히 숨김
    $activeDetail.removeClass("show");

    // 리스트 복원
    $list.addClass("active");

    $toggleBtn.removeClass("hidden");

    $findStoreBody.removeClass("view-detail");

    if ($(window).width() <= 768) {
      if (previousView === "map") {
        $findStoreBody.addClass("view-map");
      } else {
        $findStoreBody.addClass("view-list");
      }
    }

    renderView();

    if (currentView === "list") {
      requestAnimationFrame(() => {
        $(window).scrollTop(listScrollTop);
      });
    }
  }

  // ----------------------
  // 플로팅 버튼
  // ----------------------
  $toggleBtn.on("click", function () {
    if (currentView === "detail") return;

    if (currentView === "list") {
      listScrollTop = window.scrollY;
    }

    currentView = currentView === "list" ? "map" : "list";

    renderView();

    if (currentView === "list") {
      requestAnimationFrame(() => {
        window.scrollTo(0, listScrollTop);
      });
    }
  });

  // ----------------------
  // 리스트 클릭
  // ----------------------
  $(".store-card").on("click", function () {
    const storeId = Number($(this).data("store-id"));

    openStore(storeId);
  });

  // ----------------------
  // 핀 클릭
  // ----------------------
  $pins.on("click", function (e) {
    e.stopPropagation();

    const storeId = Number($(this).data("store-id"));

    // PC는 기존처럼 바로 상세
    if ($(window).width() > 768) {
      openStore(storeId);
      return;
    }

    // 모바일은 미리보기
    showPreview(storeId);
  });
  // ----------------------
  // 뒤로가기
  // ----------------------
  $(".detail-back-btn").on("click", function () {
    closeStore();
    $toggleBtn.removeClass("disabled");
  });

  // ----------------------
  // 리사이즈
  // ----------------------
  $(window).on("resize", function () {
    renderView();

    if ($(window).width() > 768 && currentStoreId !== null) {
      $pins.removeClass("active");

      $(`.map-pin[data-store-id="${currentStoreId}"]`).addClass("active");
    }

    if (currentView === "detail") {
      $findStoreBody.addClass("view-detail");
    } else {
      $findStoreBody.removeClass("view-detail");
    }
  });

  // ----------------------
  // 최초 실행
  // ----------------------
  renderView();

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
    { root: null, threshold: 0.2 },
  );

  obHeader.observe(visual);

  $(".alarm-ad a")
    .eq(1)
    .on("click", function (e) {
      e.preventDefault(); // a 태그 기본 동작 막기

      const targetTop = $(".sub-ad").offset().top;

      $("html, body").animate(
        { scrollTop: targetTop },
        500, // 0.5초 동안 부드럽게 이동
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
    if ($(window).width() > 768) return;

    e.preventDefault();
    $(".menu-open, .dim-menu").addClass("active");
    $("html, body").css({
      overflow: "hidden",
    });
  });

  // 메뉴 닫기
  $(".dim-menu, .menu-close-ico").on("click", function () {
    if ($(window).width() > 1180) return;

    $(".menu-open, .dim-menu").removeClass("active");
    $("html, body").css({
      overflow: "",
    });
  });

  // 리사이즈 시 메뉴 초기화
  function handleResizeMenu() {
    if ($(window).width() > 768) {
      $(".menu-open, .dim-menu").removeClass("active");
      $("body").css("overflow", "");
    }
  }

  handleResizeMenu();
  $(window).on("resize", handleResizeMenu);

  // ===========================
  //탑버튼
  // ===========================

  const $topBtn = $(".go-top");
  const showAfter = 900;
  let scrollingToTop = false; // 클릭 시 true로 변경

  // 스크롤 이벤트
  $(window).on("scroll", function () {
    if (scrollingToTop) return; // 클릭 중이면 scroll 이벤트 무시

    if ($(this).scrollTop() > showAfter) {
      $topBtn.fadeIn(150);
    } else {
      $topBtn.fadeOut(150);
    }
  });

  // 클릭 이벤트
  $topBtn.on("click", function () {
    scrollingToTop = true; // 클릭 시 scroll 이벤트 무시
    $("html, body").animate({ scrollTop: 0 }, 350, function () {
      scrollingToTop = false; // 스크롤 이벤트 다시 활성화
      // 스크롤 위치 확인 후 fadeOut 처리
      if ($(window).scrollTop() <= showAfter) {
        $topBtn.fadeOut(150); // 0이 아니라 0.3초 정도로 fadeOut
      }
    });
  });
});
