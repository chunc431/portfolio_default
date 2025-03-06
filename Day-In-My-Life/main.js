let slideIndex = 1;

function openFullscreen(elem) {
  const media = document.querySelectorAll('.main-image img, .main-image video, .additional-images img');
  const container = document.querySelector('.fullscreen-gallery .image-container');
  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';

  media.forEach((item, index) => {
    let newItem;
    if (item.tagName === 'IMG') {
      newItem = item.cloneNode();
    } else if (item.tagName === 'VIDEO') {
      newItem = document.createElement('video');
      newItem.src = item.querySelector('source').src;
      newItem.type = item.querySelector('source').type;
      newItem.controls = true;
      newItem.style.maxWidth = '60%';
      newItem.style.maxHeight = '60%';
      // Removed pointer-events: none to allow interaction with the video
    }
    
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
  const slides = document.querySelectorAll(".image-container img, .image-container video");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => slide.className = '');
  slides[slideIndex-1].className = 'show';
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
