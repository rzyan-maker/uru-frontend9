// --- 1. Custom Cursor ---
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});

// Կոճակների վրա կուրսորը մեծանում է ու ստանում background
const buttons = document.querySelectorAll('.uru-btn, .luxury-nav a, .search-container input');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2.5)';
        cursor.style.background = 'rgba(212, 175, 55, 0.1)';
    });
    btn.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
        cursor.style.background = 'none';
    });
});

// --- 2. Background Parallax ---
const heroBg = document.querySelector('.js-parallax');
document.addEventListener('mousemove', (e) => {
    if (heroBg) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        // Ֆոնը մի փոքր շարժվում է մկնիկին հակառակ
        heroBg.style.transform = `scale(1.1) translate(-${x * 15}px, -${y * 15}px)`;
    }
});

// --- 3. Scroll Triggered Animation (About Section) ---
const scrollTrigger = document.querySelector('.js-scroll-trigger');

function checkScroll() {
    if (scrollTrigger) {
        const triggerPoint = window.innerHeight * 0.8; // Երբ 80%-ով երևում է
        const sectionTop = scrollTrigger.getBoundingClientRect().top;

        if (sectionTop < triggerPoint) {
            scrollTrigger.classList.add('active');
            // Հեռացնում ենք ունկնդիրը, որ անիմացիան միայն մի անգամ լինի
            window.removeEventListener('scroll', checkScroll);
        }
    }
}

window.addEventListener('scroll', checkScroll);
checkScroll(); // Ստուգում ենք նաև սկզբում

// --- 4. Luxury Card 3D Effect on Mousemove ---
const glassCard = document.querySelector('.luxury-glass-card');
glassCard.addEventListener('mousemove', (e) => {
    if (glassCard) {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Հաշվարկում ենք թեքության անկյունը
        const rotateX = (centerY - y) / 20; 
        const rotateY = (x - centerX) / 20;

        glassCard.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

glassCard.addEventListener('mouseleave', () => {
    glassCard.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
});
// 1. Սա քո Render-ի հղումն է (ստուգիր, որ ճիշտ լինի)
const API_URL = "https://uru-backend.onrender.com/api/sights";

async function loadUruData() {
    try {
        // 2. Հարցում ենք ուղարկում սերվերին
        const response = await fetch(API_URL);
        const data = await response.json();

        // 3. Գտնում ենք այն տեղը HTML-ում, որտեղ պետք է երևան տվյալները
        const container = document.getElementById('sights-container');
        
        // 4. Մաքրում ենք container-ը նախքան նոր տվյալներ ավելացնելը
        container.innerHTML = "";

        // 5. Ամեն մի վայրի համար սարքում ենք HTML քարտ
        data.forEach(item => {
            container.innerHTML += `
                <div class="luxury-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="card-info">
                        <h3>${item.name}</h3>
                        <p>${item.location}</p>
                        <p class="desc">${item.description}</p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Չստացվեց կպնել սերվերին:", error);
    }
}

// 6. Միացնում ենք ֆունկցիան
loadUruData();
document.addEventListener('DOMContentLoaded', () => {
    // Ստուգում ենք՝ արդյոք այս էջում կա այն div-ը, որտեղ պետք է լցվեն տվյալները
    const container = document.getElementById('sights-container');

    if (container) {
        loadUruData(); // Կանչում ենք ֆունկցիան միայն եթե container-ը կա
    }
});

async function loadUruData() {
    const API_URL = "https://uru-backend.onrender.com/api/sights";
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const container = document.getElementById('sights-container');
        container.innerHTML = ""; 

        data.forEach(item => {
            container.innerHTML += `
                <div class="luxury-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.location}</p>
                </div>
            `;
        });
    } catch (err) {
        console.error("Սխալ բեքենդից տվյալ ստանալիս:", err);
    }
}