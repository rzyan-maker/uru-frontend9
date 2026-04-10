const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([40.1792, 44.5133], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markers = L.layerGroup().addTo(map);
let activeRoute = null;

// 1. Ավելացված ID-ներ, որոնք պետք է համընկնեն script3.js-ի տվյալների հետ
const destinations = [
    { id: "haghpat", name: "ՀԱՂՊԱՏ", type: "ՎԱՆՔ", lat: 41.0938, lng: 44.7120, icon: "fa-church", bio: "10-րդ դարի հոգևոր կենտրոն, ՅՈՒՆԵՍԿՕ-ի ժառանգություն:" },
    { id: "lori_berd", name: "ԼՈՌԻ ԲԵՐԴ", type: "ԱՄՐՈՑ", lat: 41.0039, lng: 44.4283, icon: "fa-fort-awesome", bio: "Անառիկ միջնադարյան ամրոց Ձորագետի կիրճի վրա:" },
    { id: "kobayr", name: "ՔՈԲԱՅՐ", type: "ՎԱՆՔ", lat: 41.0041, lng: 44.6345, icon: "fa-gopuram", bio: "12-րդ դարի հայ-վրացական վանական համալիր՝ հայտնի իր որմնանկարներով:" },
    { id: "ardvi", name: "ԱՐԴՎԻ", type: "ՍՈՒՐԲ ՀՈՎՀԱՆՆԵՍ", lat: 41.0185, lng: 44.5872, icon: "fa-cross", bio: "Հայաստանի ամենագեղեցիկ ու խաղաղ գյուղական վանքից մեկը:" },
    { id: "odzun", name: "ՕՁՈՒՆ", type: "ԵԿԵՂԵՑԻ", lat: 41.0508, lng: 44.6121, icon: "fa-place-of-worship", bio: "6-րդ դարի հոյակերտ գմբեթավոր բազիլիկ եկեղեցի:" },
    { id: "sevan", name: "ՍԵՎԱՆԱՎԱՆՔ", type: "ԼԻՃ", lat: 40.5639, lng: 44.9733, icon: "fa-water", bio: "Սևանա լճի թերակղզու վրա գտնվող հանրահայտ վանական համալիր:" },
    { id: "garni", name: "ԳԱՌՆԻ", type: "ՏԱՃԱՐ", lat: 40.1118, lng: 44.7303, icon: "fa-columns", bio: "Հայաստանում պահպանված միակ հեթանոսական տաճարը:" },
    { id: "geghard", name: "ԳԵՂԱՐԴ", type: "ՎԱՆՔ", lat: 40.1404, lng: 44.8185, icon: "fa-gem", bio: "Ժայռափոր եկեղեցի, որտեղ պահվել է սուրբ Գեղարդը:" }
];

function createLuxIcon(iconName) {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div class="uru-marker-pin"><i class="fa-solid ${iconName}"></i></div>`,
        iconSize: [45, 45], iconAnchor: [22, 45]
    });
}

function renderMarkers(search = "") {
    markers.clearLayers();
    destinations.forEach(d => {
        if (d.name.toLowerCase().includes(search.toLowerCase())) {
            L.marker([d.lat, d.lng], { icon: createLuxIcon(d.icon) }).addTo(markers).on('click', () => {
                showDetails(d);
                map.flyTo([d.lat, d.lng], 14);
            });
        }
    });
}

renderMarkers();

document.getElementById('location-search').addEventListener('input', (e) => renderMarkers(e.target.value));

// 2. Թարմացված ինֆո-պանել
function showDetails(site) {
    const panel = document.getElementById('info-panel');
    panel.innerHTML = `
        <div class="details-view">
            <p style="color:var(--gold); font-size:10px; font-weight:800; letter-spacing:5px;">${site.type}</p>
            <h2 class="site-title">${site.name}</h2>
            <p id="site-bio" class="bio-text">${site.bio}</p>
            
            <div class="btn-group">
                <button class="btn-uru btn-go" onclick="buildRoute(${site.lat}, ${site.lng})">ԿԱՌՈՒՑԵԼ ՈՒՂԻՆ</button>
                <button class="btn-uru btn-info" onclick="goToDetails('${site.id}')">ԻՄԱՆԱԼ ԱՎԵԼԻՆ</button>
            </div>
            <div id="route-res" style="margin-top:20px;"></div>
        </div>
    `;
}

// 3. Նոր ֆունկցիա՝ նոր էջին անցնելու համար
window.goToDetails = function(id) {
    // Ավելացնում ենք սահուն անհետացում նախքան էջը փոխելը
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        window.location.href = `index3.html?id=${id}`;
    }, 600);
};

window.buildRoute = function(lat, lng) {
    navigator.geolocation.getCurrentPosition(pos => {
        if (activeRoute) map.removeControl(activeRoute);
        activeRoute = L.Routing.control({
            waypoints: [L.latLng(pos.coords.latitude, pos.coords.longitude), L.latLng(lat, lng)],
            showAlternatives: true,
            lineOptions: { styles: [{ color: '#d4af37', weight: 7, opacity: 0.9 }] },
            createMarker: () => null
        }).on('routesfound', e => {
            const res = document.getElementById('route-res');
            res.innerHTML = '';
            e.routes.forEach((r, i) => {
                res.innerHTML += `
                    <div style="padding:15px; background:rgba(212,175,55,0.05); border-radius:15px; margin-top:10px; border:1px solid rgba(212,175,55,0.1);">
                        <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:12px;">
                            <span>ՏԱՐԲԵՐԱԿ ${i+1}</span>
                            <span style="color:var(--gold);">${(r.summary.totalDistance/1000).toFixed(1)} կմ</span>
                        </div>
                    </div>`;
            });
        }).addTo(map);
    });
};