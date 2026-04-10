document.addEventListener('DOMContentLoaded', () => {
    // 1. Տվյալների բազա (Բոլոր 8 վայրերը)
    const placesData = {
        'haghpat': {
            title: 'ՀԱՂՊԱՏԱՎԱՆՔ',
            region: 'ԼՈՌԻ',
            type: 'ՎԱՆԱԿԱՆ ՀԱՄԱԼԻՐ',
            date: 'X-XIII ԴԱՐԵՐ',
            history: 'Հաղպատի վանական համալիրը միջնադարյան Հայաստանի հոգևոր և գիտական խոշոր կենտրոններից է։ Այն ՅՈՒՆԵՍԿՕ-ի համաշխարհային ժառանգության մաս է։',
            mainImg: 'https://armenia-tour.am/wp-content/uploads/2021/03/haghpat-monastery.jpg',
            mosaic: ['https://haghpat.com/wp-content/uploads/2020/01/1.jpg', 'https://haghpat.com/wp-content/uploads/2020/01/2.jpg', 'https://haghpat.com/wp-content/uploads/2020/01/3.jpg', 'https://haghpat.com/wp-content/uploads/2020/01/4.jpg', 'https://haghpat.com/wp-content/uploads/2020/01/5.jpg', 'https://haghpat.com/wp-content/uploads/2020/01/6.jpg']
        },
        'lori_berd': {
            title: 'ԼՈՌԻ ԲԵՐԴ',
            region: 'ԼՈՌԻ',
            type: 'ԱՄՐՈՑ',
            date: 'XI ԴԱՐ',
            history: 'Լոռի Բերդը Կյուրիկյան թագավորության մայրաքաղաքն էր։ Այն գտնվում է Ձորագետ և Ուռուտ գետերի միախառնման վայրում՝ անառիկ կիրճերի եզրին։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366', // Փոխիր իրական նկարով
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        },
        'kobayr': {
            title: 'ՔՈԲԱՅՐԻ ՎԱՆՔ',
            region: 'ԼՈՌԻ',
            type: 'ՎԱՆԱԿԱՆ ՀԱՄԱԼԻՐ',
            date: 'XII-XIII ԴԱՐԵՐ',
            history: 'Քոբայրը հայտնի է իր բարձրարժեք որմնանկարներով, որոնք պահպանվել են եկեղեցու պատերին։ Այն եղել է միջնադարյան կարևոր հոգևոր օջախ։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        },
        'ardvi': {
            title: 'ԱՐԴՎԻ (ՍԲ. ՀՈՎՀԱՆՆԵՍ)',
            region: 'ԼՈՌԻ',
            type: 'ԵԿԵՂԵՑԻ',
            date: 'XVII-XIX ԴԱՐԵՐ',
            history: 'Արդվիի Սուրբ Հովհաննես վանքը հայտնի է իր գեղեցիկ տեսարաններով։ Այստեղ է նկարահանվել Սերգեյ Փարաջանովի «Նռան գույնը» ֆիլմի որոշ հատվածներ։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        },
        'odzun': {
            title: 'ՕՁՈՒՆԻ ԵԿԵՂԵՑԻ',
            region: 'ԼՈՌԻ',
            type: 'ԳՄԲԵԹԱՎՈՐ ԲԱԶԻԼԻԿ',
            date: 'VI ԴԱՐ',
            history: 'Օձունի տաճարը վաղ միջնադարյան հայկական ճարտարապետության եզակի նմուշ է։ Այն առանձնահատուկ է իր արտաքին սրահով և կոթող-մահարձանով։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        },
        'sevan': {
            title: 'ՍԵՎԱՆԱՎԱՆՔ',
            region: 'ԳԵՂԱՐՔՈՒՆԻՔ',
            type: 'ՎԱՆԱԿԱՆ ՀԱՄԱԼԻՐ',
            date: 'IX ԴԱՐ',
            history: 'Սևանավանքը գտնվում է Սևանա լճի թերակղզու վրա։ Այն հիմնադրվել է 874 թվականին Մարիամ իշխանուհու կողմից։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        },
        'garni': {
            title: 'ԳԱՌՆԻԻ ՏԱՃԱՐ',
            region: 'ԿՈՏԱՅՔ',
            type: 'ՀԵԹԱՆՈՍԱԿԱՆ ՏԱՃԱՐ',
            date: 'I ԴԱՐ',
            history: 'Գառնին Հայաստանի տարածքում պահպանված միակ հելլենիստական տաճարն է։ Այն նվիրված է եղել արևի աստված Միհրին։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        },
        'geghard': {
            title: 'ԳԵՂԱՐԴԱՎԱՆՔ',
            region: 'ԿՈՏԱՅՔ',
            type: 'ԺԱՅՌԱՓՈՐ ՎԱՆՔ',
            date: 'IV-XIII ԴԱՐԵՐ',
            history: 'Գեղարդը ժայռափոր եկեղեցական համալիր է։ Այստեղ դարեր շարունակ պահվել է այն գեղարդը, որով հռոմեացի զինվորը խոցել է Քրիստոսին։',
            mainImg: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366',
            mosaic: Array(6).fill('https://images.unsplash.com/photo-1542281286-9e0a16bb7366')
        }
    };

    // 2. Էլեմենտների ընտրություն
    const heroImage = document.getElementById('main-hero');
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const sidebar = document.querySelector('.info-sidebar');
    const content = document.querySelector('.content-container');

    // 3. Տվյալների բեռնում ըստ URL ID-ի
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get('id') || 'haghpat';

    if (placesData[placeId]) {
        const data = placesData[placeId];
        document.getElementById('place-title').innerText = data.title;
        document.querySelector('.text-content p').innerText = data.history;
        heroImage.style.backgroundImage = `url('${data.mainImg}')`;
        
        mosaicItems.forEach((item, index) => {
            if (data.mosaic[index]) {
                item.style.backgroundImage = `url('${data.mosaic[index]}')`;
            }
        });

        const stats = document.querySelectorAll('.stat-card strong');
        stats[0].innerText = data.region;
        stats[1].innerText = data.type;
        stats[2].innerText = data.date;
    }

    // 4. Անիմացիաներ բացվելիս
    setTimeout(() => {
        sidebar.style.opacity = '1';
        sidebar.style.transform = 'translateX(0)';
        content.style.opacity = '1';
    }, 100);

    // 5. Lightbox ֆունկցիոնալ
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

    // 6. Սահուն անցումներ էջերի միջև
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.href;
            sidebar.style.transform = 'translateX(-50px)';
            sidebar.style.opacity = '0';
            content.style.opacity = '0';
            setTimeout(() => { window.location.href = targetUrl; }, 800);
        });
    });
});