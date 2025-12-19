let slideIndex = 1;

// 1) Autoplay all gallery videos on page load + attach click handlers
document.addEventListener('DOMContentLoaded', () => {
  const galleryVideos = document.querySelectorAll('.gallery-container video');

  galleryVideos.forEach((vid) => {
    // Make autoplay more reliable
    vid.muted = true;
    vid.playsInline = true;
    vid.loop = true;
    vid.preload = 'metadata';

    // Try autoplay (browser may block in some cases, but muted inline usually works)
    const p = vid.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});

    // Click to open fullscreen
    vid.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openFullscreen(vid);
    });
  });
});

// 2) Fullscreen open
function openFullscreen(clickedVideo) {
  const fullscreen = document.getElementById('fullscreen-gallery');
  const container = document.querySelector('.fullscreen-gallery .image-container');

  container.innerHTML = '';

  // Collect videos in DOM order across all sections
  const media = document.querySelectorAll('.gallery-container video');

  media.forEach((item, index) => {
    const newVideo = document.createElement('video');
    newVideo.src = item.currentSrc || item.src;

    // Preserve poster if present
    const poster = item.getAttribute('poster');
    if (poster) newVideo.poster = poster;

    // Fullscreen video behavior
    newVideo.controls = true;
    newVideo.playsInline = true;
    newVideo.muted = false; // fullscreen can have sound
    newVideo.loop = false;

    newVideo.style.maxWidth = '80%';
    newVideo.style.maxHeight = '80%';

    newVideo.classList.add('fullscreen-item');
    newVideo.style.display = 'none';

    container.appendChild(newVideo);

    if (item === clickedVideo) slideIndex = index + 1;
  });

  // Show overlay
  fullscreen.style.display = 'flex';
  showSlides(slideIndex);
}

// 3) Close fullscreen
function closeFullscreen() {
  const fullscreen = document.getElementById('fullscreen-gallery');
  const container = document.querySelector('.fullscreen-gallery .image-container');

  // Stop videos by removing them
  container.innerHTML = '';
  fullscreen.style.display = 'none';
}

// 4) Prev/Next
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// 5) Show active slide
function showSlides(n) {
  const slides = document.querySelectorAll('.fullscreen-gallery .fullscreen-item');
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((vid) => {
    if (vid.tagName === 'VIDEO') {
      vid.pause();
      vid.currentTime = 0; // remove if you want resume behavior
    }
    vid.style.display = 'none';
    vid.classList.remove('show');
  });

  const active = slides[slideIndex - 1];
  active.style.display = 'block';
  active.classList.add('show');

  // Autoplay active fullscreen video
  if (active.tagName === 'VIDEO') {
    const p = active.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }
}

// 6) Keyboard navigation
document.addEventListener('keydown', function (event) {
  const fullscreen = document.getElementById('fullscreen-gallery');
  const isOpen = fullscreen && fullscreen.style.display === 'flex';
  if (!isOpen) return;

  if (event.key === 'Escape') closeFullscreen();
  if (event.key === 'ArrowRight') plusSlides(1);
  if (event.key === 'ArrowLeft') plusSlides(-1);
});
