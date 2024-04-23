addEventListener("scroll", (event) => {
  currentScroll = $(window).scrollTop();
  // console.log("currentScroll", currentScroll);
});

$(document).ready(function () {
  if ($(".burger").length > 0) {
    let menu = $(".header .menu");
    let burger = $(".burger");

    burger.on("click", function () {
      if (menu.hasClass("opened")) {
        burger.removeClass("opened");
        menu.removeClass("opened").stop().slideUp();
        $(document).off("mouseup");
      } else {
        burger.addClass("opened");
        menu.addClass("opened").stop().slideDown();

        $(document).mouseup(function (e) {
          if (
            !menu.is(e.target) &&
            menu.has(e.target).length === 0 &&
            !burger.is(e.target)
          ) {
            burger.removeClass("opened");
            menu.removeClass("opened");
            $(document).off("mouseup");
          }
        });
      }
    });
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      $(this).inputmask({
        mask: "+7(999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".video").length > 0) {
    $(".video__btn--play").on("click", function () {
      let elem = $(this).parents(".video").toggleClass("play").find("video");

      $(this).toggleClass("paused");
      $(this).hasClass("paused") ? elem.trigger("play") : elem.trigger("pause");
    });
  }

  if ($(".slider-reviews").length > 0) {
    const swiper = new Swiper(".slider-reviews", {
      slidesPerView: 1,
      spaceBetween: 10,
      initialSlide: $(".slider-reviews .swiper-slide").length - 1,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          initialSlide: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
  }

  if ($(".tabs").length > 0) {
    $(".tabs").tabslet({
      mouseevent: "click",
      attribute: "href",
      animation: true,
    });
  }

  if ($(".tab-mobile").length > 0) {
    if ($(window).width() < 767) {
      $(".offers-tabs").addClass("init-accardeon");
    }

    $(".tab-mobile").on("click", function () {
      $(".tab-mobile").removeClass("opened");
      $(".offers-list").slideUp();
      $(this)
        .addClass("opened")
        .parents(".tabs-body")
        .find(".offers-list")
        .stop()
        .slideDown();
    });

    $(window).resize(function () {
      if ($(window).width() > 767) {
        if ($(".offers-tabs").hasClass("init-accardeon")) {
          $(".offers-tabs").removeClass("init-accardeon");
          $(".offers-list").attr("style", "");
        }
      } else {
        $(".offers-tabs").addClass("init-accardeon");
      }
    });
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,

      onShow: () => {
        $("body").addClass("modal-open");
      },

      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        $("body").addClass("modal-open");
      });
    });

    $("[data-micromodal-close]").map(function () {
      $(this).click((e) => {
        //        e.preventDefault();
        if ($(this).attr("data-modal")) {
          setTimeout(() => {
            $("body").addClass("modal-open");
          }, 0.1);
        }
      });
    });
  }

  if ($("[data-fancybox]").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
      helpers: {
        media: {},
      },
    });
  }

  if ($(".other-case__list").length > 0) {
    let caseList = $(".other-case__list");
    let caseItem = $(".other-case__item");
    let count = caseList.find(".other-case__item").length;
    let btn = $(".other-case__controls .btn");
    let height = setHeightdefault();
    let heightVisible = setHeightVisible();

    if (count <= 8) {
      btn.parents().addClass("hide");
      return false;
    }

    caseList.height(heightVisible);

    btn.on("click", function (event) {
      event.preventDefault();
      caseList.height(height);
      btn.parents().addClass("hide");
    });

    $(window).on("resize", function () {
      height = setHeightdefault();
      heightVisible = setHeightVisible();

      caseList.height(heightVisible);
      btn.parents().removeClass("hide");
    });

    function setHeightVisible() {
      let windowWidth = $(window).width();
      return windowWidth > 1200 ? 500 : windowWidth < 768 ? 560 : 420;
    }

    function setHeightdefault() {
      if ($(window).width() > 768) {
        return caseItem.outerHeight() * (count / 4);
      } else {
        return caseItem.outerHeight() * count;
      }
    }
  }
});

$(window).on("resize", function () {});

$(window).on("load", function () {
  if ($(".map").length > 0) {
    setTimeout(() => ymapsLoad(), 500);
    setTimeout(() => ymaps.ready(init), 1000);
  }

  function ymapsLoad() {
    var script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=0cec76e1-1847-46ed-a96a-c84c0917f2ad&lang=ru_RU";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.744756354739636, 37.57666889814756],
      zoom: 13,
      controls: [],
    });

    myMap.controls.remove("searchControl");

    var myPlacemark = new ymaps.Placemark(
      [55.744756354739636, 37.57666889814756],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/img/svg/location.svg",
        iconImageSize: [80, 80],
        iconImageOffset: [-40, -40],
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
});
