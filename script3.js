document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.getElementById('main-hero');
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    const sidebar = document.querySelector('.info-sidebar');
    const content = document.querySelector('.content-container');

    setTimeout(() => {
        sidebar.style.opacity = '1';
        sidebar.style.transform = 'translateX(0)';
        content.style.opacity = '1';
    }, 100);

    const openLightbox = (bgImage) => {
        const imageUrl = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        lightboxImg.src = imageUrl;
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
    };

    heroImage.addEventListener('click', () => openLightbox(heroImage.style.backgroundImage));

    mosaicItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this.style.backgroundImage);
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target !== lightboxImg) closeLightbox(); });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.href;
            
            sidebar.style.transform = 'translateX(-50px)';
            sidebar.style.opacity = '0';
            content.style.opacity = '0';

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get('id');

    if (placeId === 'haghpat') {
        document.getElementById('place-title').innerText = 'ՀԱՂՊԱՏԱՎԱՆՔ';
        // Այստեղ կարող ես փոխել նաև նկարների հասցեները
    } else if (placeId === 'sanahin') {
        document.getElementById('place-title').innerText = 'ՍԱՆԱՀԻՆ';
        // Եվ այլն...
    }
});