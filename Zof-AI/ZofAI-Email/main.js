let slideIndex = 1;

function openFullscreen(elem) {
  const container = document.querySelector('.fullscreen-gallery .image-container');
  container.innerHTML = ''; // Clear previous content
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';

  // Select all images in the gallery
  const media = document.querySelectorAll('.gallery-container img');

  media.forEach((item, index) => {
    const newItem = item.cloneNode();
    newItem.style.maxWidth = '80%';
    newItem.style.maxHeight = '80%';

    newItem.classList.add('fullscreen-item'); // Class for styling and identification
    container.appendChild(newItem);

    // Show the clicked image first
    if (item === elem) slideIndex = index + 1;
  });

  document.getElementById('fullscreen-gallery').style.display = 'block';
  showSlides(slideIndex);
}

function closeFullscreen() {
  document.getElementById('fullscreen-gallery').style.display = 'none';
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.querySelectorAll('.fullscreen-gallery .fullscreen-item');
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(slide => (slide.style.display = 'none'));
  slides[slideIndex - 1].style.display = 'block';
}

document.querySelector('.fullscreen-gallery').addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    closeFullscreen();
  } else if (event.target.classList.contains('next')) {
    plusSlides(1);
  } else if (event.target.classList.contains('prev')) {
    plusSlides(-1);
  }
});
