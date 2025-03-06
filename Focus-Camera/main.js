let slideIndex = 1;

function openFullscreen(elem) {
  const container = document.querySelector('.fullscreen-gallery .image-container');
  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';

  // Selecting media elements from the specific sections
  const media = document.querySelectorAll('.main-image img, #publication-main video, #publication-main img, #publication-highlights img, .additional-images img, .additional-images video');

  media.forEach((item, index) => {
    let newItem;
    if (item.tagName === 'IMG') {
      newItem = item.cloneNode();
      // Set maximum dimensions for images
      newItem.style.maxWidth = '60%';
      newItem.style.maxHeight = '60%';
    } else if (item.tagName === 'VIDEO') {
      newItem = document.createElement('video');
      newItem.src = item.querySelector('source').src;
      newItem.type = item.querySelector('source').type;
      newItem.controls = true;
      // Set maximum dimensions for videos
      newItem.style.maxWidth = '60%';
      newItem.style.maxHeight = '60%';
    }
    
    newItem.classList.add('fullscreen-item'); // Class for styling and identification
    if (item === elem) slideIndex = index + 1;
    container.appendChild(newItem);
  });

  document.getElementById("fullscreen-gallery").style.display = "block";
  showSlides(slideIndex);
}

function closeFullscreen() {
  document.getElementById("fullscreen-gallery").style.display = "none";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.querySelectorAll(".fullscreen-gallery .fullscreen-item");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(slide => slide.style.display = 'none');
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
