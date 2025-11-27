document.addEventListener('DOMContentLoaded', () => {
    const sliderImages = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = sliderImages.length;

    function showSlide(index) {
        currentSlide = index % totalSlides;
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }

        sliderImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        sliderImages[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    showSlide(currentSlide);
});
