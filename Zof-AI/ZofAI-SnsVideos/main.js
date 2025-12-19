let slideIndex = 1;

function openFullscreen(clickedVideo) {
  const fullscreen = document.getElementById('fullscreen-gallery');
  const container = document.querySelector('.fullscreen-gallery .image-container');

  container.innerHTML = '';

  // Select all gallery videos
  const media = document.querySelectorAll('.gallery-container video');

  media.forEach((item, index) => {
    const newVideo = document.createElement('video');
    newVideo.src = item.currentSrc || item.src;

    newVideo.controls = true;
    newVideo.playsInline = true;

    newVideo.style.maxWidth = '80%';
    newVideo.style.maxHeight = '80%';

    newVideo.classList.add('fullscreen-item');
    newVideo.style.display = 'none';

    container.appendChild(newVideo);

    if (item === clickedVideo) slideIndex = index + 1;
  });

  fullscreen.style.display = 'flex';
  showSlides(slideIndex);
}

function closeFullscreen() {
  const fullscreen = document.getElementById('fullscreen-gallery');
  const container = document.querySelector('.fullscreen-gallery .image-container');

  container.innerHTML = '';
  fullscreen.style.display = 'none';
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.querySelectorAll('.fullscreen-gallery .fullscreen-item');
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((vid) => {
    vid.pause();
    vid.currentTime = 0; // delete this line if you want to resume instead of restart
    vid.style.display = 'none';
  });

  const active = slides[slideIndex - 1];
  active.style.display = 'block';

  const playPromise = active.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }
}

// Keyboard navigation (ESC closes, arrows navigate)
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
