addEventListener("scroll", (event) => {
  currentScroll = $(window).scrollTop();

  // console.log("currentScroll", currentScroll);

  // if (currentScroll > 200) {
  //   $(".header").addClass("fixed");
  //   $(".main").addClass("headerFixed");
  // } else {
  //   $(".header").removeClass("fixed");
  //   $(".main").removeClass("headerFixed");
  // }
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

  // --------------------------------------------

  if ($("select").length > 0) {
    $("select").map(function () {
      $(this).selectric({
        onOpen: function (element) {},
        onChange: function (element) {
          if ($(element).attr("id") == "product-count") {
            window.location.href = $(this).val();
          }
        },
        onClose: function (element) {},
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

  if ($(".select-block").length > 0) {
    $(".select-block").map(function () {
      let block = $(this);

      block.on("click", function () {
        let list = block.find(".select-block__list");

        if (!block.hasClass("opened")) {
          $(".select-block__list").stop().slideUp(0);
          list.stop().slideDown(0);
        } else {
          $(".select-block__list").stop().slideUp(0);
        }

        block.toggleClass("opened");

        $(document).off("mouseup");

        $(document).mouseup(function (e) {
          if (!block.is(e.target) && block.has(e.target).length === 0) {
            $(".select-block__list").stop().slideUp(0);
            block.removeClass("opened");
          }
        });
      });
    });
  }

  // if ($(".products__slider").length > 0) {
  //   const sliders = document.querySelectorAll(".products__slider");
  //   let mySwipers = [];

  //   function sliderinit() {
  //     sliders.forEach((slider, index) => {
  //       if (!slider.swiper) {
  //         mySwipers[index] = new Swiper(slider, {
  //           slidesPerView: 4,
  //           spaceBetween: 32,
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //           on: {
  //             init: function (swiper) {},
  //             slideChange: function (swiper) {},
  //           },
  //           breakpoints: {
  //             320: {
  //               slidesPerView: 1,
  //               spaceBetween: 16,
  //             },
  //             350: {
  //               slidesPerView: 2,
  //               spaceBetween: 16,
  //             },
  //             740: {
  //               slidesPerView: 3,
  //             },
  //             1024: {
  //               slidesPerView: 4,
  //             },
  //             1200: {
  //               slidesPerView: 4,
  //             },
  //             1441: {
  //               slidesPerView: 4.68,
  //             },
  //           },
  //         });
  //       } else {
  //         return;
  //       }
  //     });
  //   }

  //   sliders.length && sliderinit();
  // }
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
