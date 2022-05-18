(function ($) {
  "use strict"; // Start of use strict

  const currentPage =
    window.location.pathname === "/" ? "/index" : window.location.pathname;

  // init layout
  $("#accordionSidebar").load("layout/sidebar.html", function () {
    $(".nav-item").removeClass("active");
    $(".nav-item")
      .find("a")
      .each(function () {
        var navName = $(this).attr("href").replace(".html", "");
        if (currentPage.indexOf(navName) > -1) {
          $(this).addClass("active");
        }
      });
    if (window.innerWidth < 768) {
      $(".collapse")
        .removeClass("show")
        .attr("data-parent", "#accordionSidebar");
    }
  });
  $("#nav").load("layout/top_nav.html", function () {
    $("body").on("click", "#sidebarToggleTop", function () {
      $("body").toggleClass("sidebar-toggled");
      $(".navbar-nav").toggleClass("toggled");
    });
  });

  // // Close any open menu accordions when window is resized below 768px
  // $(window).on("resize", function () {
  //   if ($(window).width() < 768) {
  //     $(".sidebar .collapse").collapse("hide");
  //   }

  //   // Toggle the side navigation when window is resized below 480px
  //   if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
  //     $("body").addClass("sidebar-toggled");
  //     $(".sidebar").addClass("toggled");
  //     $(".sidebar .collapse").collapse("hide");
  //   }
  // });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $("body.fixed-nav .sidebar").on(
    "mousewheel DOMMouseScroll wheel",
    function (e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    },
  );

  // Scroll to top button appear
  $(document).on("scroll", function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on("click", "a.scroll-to-top", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo",
      );
    e.preventDefault();
  });

  $("body").on(
    "click",
    '.dataTable input[type="checkbox"], .modalDataTable input[type="checkbox"]',
    function () {
      if ($(this).hasClass("all")) {
        if ($(this).prop("checked")) {
          console.log(1);
          $(this)
            .parents("thead")
            .siblings("tbody")
            .find("tr")
            .addClass("active")
            .find('input[type="checkbox"]')
            .prop("checked", true);
        } else {
          $(this)
            .parents("thead")
            .siblings("tbody")
            .find("tr")
            .removeClass("active")
            .find('input[type="checkbox"]')
            .prop("checked", false);
        }
      }
      if ($(this).hasClass("single")) {
        $(this).parents("tr").toggleClass("active");
        $(this)
          .parents("tbody")
          .siblings("thead")
          .find('input[type="checkbox"]')
          .prop("checked", false);
      }
    },
  );
})(jQuery); // End of use strict
