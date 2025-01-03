var viewCounterElement = document.getElementById('viewerCount');
function fetchViewerCount() {
    //模擬伺服器數據50~500
    var fakeServerData = {
        viewers: Math.floor(Math.random() * 500) + 50
    };
    //動畫處理:添加動畫樣式,更新後移除樣式
    viewCounterElement.classList.add('update');
    viewCounterElement.textContent = fakeServerData.viewers;
    setTimeout(() => {
        viewCounterElement.classList.remove('update');
    }, 300);
}
setInterval(fetchViewerCount, 5000);
fetchViewerCount();

const marqueeContainer = document.querySelector('.marquee-container');
const marqueeText = document.querySelector('.marquee-text');
let offset = marqueeContainer.offsetWidth;

function updateWidth() {
    // 動態更新容器與文字寬度
    offset = marqueeContainer.offsetWidth;
}
function scrollMarquee() {
    offset -= 2;
    if (offset < -marqueeText.offsetWidth) {
        offset = marqueeContainer.offsetWidth;
    }
    marqueeText.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(scrollMarquee);
}
// 窗口大小變換時重新計算
window.addEventListener('resize', updateWidth);
scrollMarquee();

function initializeCarousel(carousel) {
    const autoplay = carousel.dataset.autoplay === "true";
    const speed = parseInt(carousel.dataset.speed, 10) || 5000;
    const arrows = carousel.dataset.arrows === "true";
    // 使用屬性值進行相應的輪播設置

    const slider = carousel.querySelector('.flickity-slider');
    const slides = Array.from(slider.children);
    let currentIndex = 0;

    slider.setAttribute('aria-hidden', 'false');

    const setSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    // 自動播放功能
    if (autoplay) {
        setInterval(() => setSlide(currentIndex + 1), speed);
    }
    if (arrows) {
        const nextButton = carousel.querySelector('#nextButton');
        const prevButton = carousel.querySelector('#prevButton');

        if (nextButton) {
            nextButton.addEventListener('click', () => setSlide(currentIndex + 1));
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => setSlide(currentIndex - 1));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[id^="heroImage-slideshow"]').forEach(initializeCarousel);
});
