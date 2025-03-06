document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const scrollBtn = document.getElementById("scrollBtn");
  const homepage = document.getElementById("homepage");
  const content = document.getElementById('content');
  const secondaryPage = document.getElementById("secondaryPage");

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop > 0) {
      header.classList.add("scrolling-down");
    } else {
      header.classList.remove("scrolling-down");
    }

    // calculate opacity
    const contentHeight = homepage.offsetHeight;
    const fadePoint = 200; // start fade at this scroll position
    let opacity = 1 - currentScrollTop / (contentHeight - fadePoint);
    if (opacity >= 0) {
      content.style.opacity = opacity;
    }
  };

  window.addEventListener("scroll", handleScroll);

  const scrollToElement = (element, duration, offsetSubtraction = 0) => {
    const startPosition = window.pageYOffset;
    const targetPosition = element.offsetTop - offsetSubtraction;
    const distanceToScroll = targetPosition - startPosition;
    let startTime = null;

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = easeInOutQuad(timeElapsed, startPosition, distanceToScroll, duration);
      window.scrollTo(0, progress);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(animation);
      }
    };

    window.requestAnimationFrame(animation);
  };

  scrollBtn.addEventListener("click", () => {
    scrollToElement(secondaryPage, 1200, 50); // Scrolls to 50 pixels above the top of secondaryPage
  });
});
