let slideIndex = 1;

/* ===============================
   AUTOPLAY + LOOP PREVIEW VIDEOS
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const previewVideos = document.querySelectorAll('.gallery-container video');

  previewVideos.forEach((vid) => {
    // Make autoplay reliable
    vid.muted = true;
    vid.playsInline = true;
    vid.loop = true;
    vid.autoplay = true;

    // Required attributes for iOS / Safari
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('loop', '');
    vid.setAttribute('autoplay', '');

    // Try to start playback
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  });
});

/* ===============================
   OPEN FULLSCREEN
================================ */
function openFullscreen(clickedItem) {
  const gallery = document.getElementById('fullscreen-gallery');
  const container = gallery.querySelector('.image-container');

  container.innerHTML = '';
  gallery.style.display = 'flex';

  // Pause all preview videos behind fullscreen
  document.querySelectorAll('.gallery-container video').forEach(v => v.pause());

  const media = document.querySelectorAll('.gallery-container img, .gallery-container video');

  media.forEach((item, index) => {
    let newItem;

    if (item.tagName === 'IMG') {
      newItem = item.cloneNode(true);

      // Fix email image extension edge case
      const src = item.getAttribute('src') || '';
      if (src.endsWith('email.png')) {
        newItem.src = src.replace(/email\.png$/i, 'email.jpg');
      }

    } else if (item.tagName === 'VIDEO') {
      newItem = document.createElement('video');
      newItem.src = item.currentSrc || item.src;

      const poster = item.getAttribute('poster');
      if (poster) newItem.poster = poster;

      newItem.controls = true;
      newItem.playsInline = true;
      newItem.muted = false;
      newItem.loop = false;
    } else {
      return;
    }

    newItem.classList.add('fullscreen-item');
    newItem.style.display = 'none';
    container.appendChild(newItem);

    if (item === clickedItem) slideIndex = index + 1;
  });

  showSlides(slideIndex);
}

/* ===============================
   CLOSE FULLSCREEN
================================ */
function closeFullscreen() {
  const gallery = document.getElementById('fullscreen-gallery');
  const container = gallery.querySelector('.image-container');

  container.innerHTML = '';
  gallery.style.display = 'none';

  // Resume preview videos
  document.querySelectorAll('.gallery-container video').forEach(v => {
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  });
}

/* ===============================
   SLIDE NAVIGATION
================================ */
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.querySelectorAll('.fullscreen-gallery .fullscreen-item');
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => {
    slide.style.display = 'none';

    if (slide.tagName === 'VIDEO') {
      slide.pause();
      slide.currentTime = 0;
    }
  });

  const active = slides[slideIndex - 1];
  active.style.display = 'block';

  if (active.tagName === 'VIDEO') {
    const p = active.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }
}

/* ===============================
   KEYBOARD CONTROLS
================================ */
document.addEventListener('keydown', (e) => {
  const gallery = document.getElementById('fullscreen-gallery');
  if (gallery.style.display !== 'flex') return;

  if (e.key === 'Escape') closeFullscreen();
  if (e.key === 'ArrowRight') plusSlides(1);
  if (e.key === 'ArrowLeft') plusSlides(-1);
});
