let slideIndex = 1;

function openFullscreen(elem) {
  const gallery = document.getElementById('fullscreen-gallery');
  const container = gallery.querySelector('.image-container');

  container.innerHTML = '';
  gallery.style.display = 'flex';

  const media = document.querySelectorAll('.gallery-container img, .gallery-container video');

  media.forEach((item, index) => {
    let newItem;

    if (item.tagName === 'IMG') {
      newItem = item.cloneNode(true);

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
    } else {
      return;
    }

    newItem.classList.add('fullscreen-item');
    newItem.style.display = 'none';
    container.appendChild(newItem);

    if (item === elem) slideIndex = index + 1;
  });

  showSlides(slideIndex);
}

function closeFullscreen() {
  document.getElementById('fullscreen-gallery').style.display = 'none';
  document.querySelector('.fullscreen-gallery .image-container').innerHTML = '';
}

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

document.addEventListener('keydown', (e) => {
  const gallery = document.getElementById('fullscreen-gallery');
  if (gallery.style.display !== 'flex') return;

  if (e.key === 'Escape') closeFullscreen();
  if (e.key === 'ArrowRight') plusSlides(1);
  if (e.key === 'ArrowLeft') plusSlides(-1);
});
