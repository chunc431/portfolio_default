let slideIndex = 1;

function openFullscreen(elem) {
  const container = document.querySelector('.fullscreen-gallery .image-container');

  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';

  // ✅ Select BOTH images + videos in DOM order
  const media = document.querySelectorAll('.gallery-container img, .gallery-container video');

  media.forEach((item, index) => {
    let newItem;

    if (item.tagName === 'IMG') {
      // Clone image
      newItem = item.cloneNode(true);
      newItem.style.maxWidth = '80%';
      newItem.style.maxHeight = '80%';
    } else if (item.tagName === 'VIDEO') {
      // Rebuild video (safer than clone for playback/controls)
      newItem = document.createElement('video');

      // Use currentSrc if available, else src
      newItem.src = item.currentSrc || item.src;

      // Keep poster if present
      const poster = item.getAttribute('poster');
      if (poster) newItem.poster = poster;

      newItem.controls = true;
      newItem.playsInline = true;

      newItem.style.maxWidth = '80%';
      newItem.style.maxHeight = '80%';
    } else {
      return;
    }

    newItem.classList.add('fullscreen-item');
    newItem.style.display = 'none';
    container.appendChild(newItem);

    // ✅ Start slideshow on the clicked item
    if (item === elem) slideIndex = index + 1;
  });

  document.getElementById('fullscreen-gallery').style.display = 'block';
  showSlides(slideIndex);
}

function closeFullscreen() {
  const container = document.querySelector('.fullscreen-gallery .image-container');

  // Remove items to stop any playing video
  container.innerHTML = '';
  document.getElementById('fullscreen-gallery').style.display = 'none';
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.querySelectorAll('.fullscreen-gallery .fullscreen-item');
  if (!slides.length) return;

  // Wrap around
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  // Hide everything + pause/reset videos
  slides.forEach(slide => {
    slide.style.display = 'none';

    if (slide.tagName === 'VIDEO') {
      slide.pause();
      slide.currentTime = 0; // remove this line if you want resume behavior
    }
  });

  // Show active
  const active = slides[slideIndex - 1];
  active.style.display = 'block';

  // Autoplay videos (may be blocked; user can press play)
  if (active.tagName === 'VIDEO') {
    const p = active.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }
}

// Optional: Keyboard navigation (ESC closes, arrows navigate)
document.addEventListener('keydown', function (event) {
  const fullscreen = document.getElementById('fullscreen-gallery');
  const isOpen =
    fullscreen &&
    fullscreen.style.display !== 'none' &&
    fullscreen.style.display !== '';

  if (!isOpen) return;

  if (event.key === 'Escape') closeFullscreen();
  if (event.key === 'ArrowRight') plusSlides(1);
  if (event.key === 'ArrowLeft') plusSlides(-1);
});
