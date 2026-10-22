
$(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.normalizeScroll(false);

  // create the smooth scroller FIRST!
  window.smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  // Handle all dropdown and nav anchor clicks with smooth scroll
  $(document).on("click", "a[href*='#']", function (e) {
    var href = $(this).attr("href");
    if (!href || href === "#" || href === "#0") return;
    
    var hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      var path = href.substring(0, hashIndex);
      var hash = href.substring(hashIndex);
      var currentPath = window.location.pathname.split("/").pop();
      var currentPathNoExt = currentPath.replace(/\.html$/, "");
      var pathNoExt = path.replace(/\.html$/, "");

      // Check if this link points to the current page
      if (path === "" || path === currentPath || pathNoExt === currentPathNoExt) {
        var $target = $(hash);
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
    }
  });

  // Handle initial page load with hash
  if (window.location.hash) {
    var $initialTarget = $(window.location.hash);
    if ($initialTarget.length) {
      setTimeout(function () {
        if (window.smoother) {
          window.smoother.scrollTo($initialTarget[0], true, "top top-=80");
        } else {
          $("html, body").stop().animate({
            scrollTop: $initialTarget.offset().top - 80
          }, 600);
        }
      }, 400);
    }
  }

});