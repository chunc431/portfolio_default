let slideIndex = 1;

function openFullscreen(elem) {
    const container = document.querySelector('.fullscreen-gallery .image-container');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '100%';

    const mainImageVideo = document.querySelector('.main-image video');
    
    if (mainImageVideo) {
        let newItem = document.createElement('video');
        newItem.src = mainImageVideo.querySelector('source').src;
        newItem.type = mainImageVideo.querySelector('source').type;
        newItem.controls = true;
        newItem.style.maxWidth = '60%';
        newItem.style.maxHeight = '60%';
        container.appendChild(newItem);
    }

    document.getElementById("fullscreen-gallery").style.display = "block";
    showSlides(slideIndex);
}

function closeFullscreen() {
    document.getElementById("fullscreen-gallery").style.display = "none";
}

function plusSlides(n) {
    // Loop back to the first slide if the user tries to navigate
    showSlides(slideIndex = 1);
}

function showSlides(n) {
    const slides = document.querySelectorAll(".image-container video");
    slides.forEach((slide, index) => {
        slide.style.display = index + 1 === n ? 'block' : 'none';
    });
}

document.querySelector('.fullscreen-gallery').addEventListener('click', function(event) {
    if (event.target.classList.contains('close')) {
        closeFullscreen();
    } else if (event.target.classList.contains('next') || event.target.classList.contains('prev')) {
        plusSlides(1);  // This will always loop back to the first slide
    }
});
