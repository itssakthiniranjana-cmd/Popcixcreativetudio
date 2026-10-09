
$(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.normalizeScroll(false);

  // create the smooth scroller FIRST!
  window.smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  // Handle all dropdown and nav anchor clicks with smooth scroll
  $(document).on("click", "a[href^='#']", function (e) {
    var target = $(this).attr("href");
    if (target && target !== "#" && target !== "#0") {
      var $target = $(target);
      if ($target.length) {
        e.preventDefault();

        // Close dropdown and navbar menus
        $(".navbar .dropdown-menu").removeClass("show");
        $(".navbar .navbar-collapse").removeClass("show");

        if (window.smoother) {
          window.smoother.scrollTo($target[0], true, "top top-=80");
        } else {
          $("html, body").stop().animate({
            scrollTop: $target.offset().top - 80
          }, 600);
        }
      }
    }
  });

});