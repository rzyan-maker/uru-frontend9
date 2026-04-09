const nodesWrapper = document.getElementById('nodes-wrapper');
const viewport = document.querySelector('.timeline-viewport');
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

function toRoman(num) {
    if (num === 0) return "0";
    const lookup = {XXI:21, XX:20, XIX:19, XVIII:18, XVII:17, XVI:16, XV:15, XIV:14, XIII:13, XII:12, XI:11, X:10, IX:9, VIII:8, VII:7, VI:6, V:5, IV:4, III:3, II:2, I:1};
    let roman = '';
    for (let i in lookup) { while (num >= lookup[i]) { roman += i; num -= lookup[i]; } }
    return roman;
}

const historyData = {
    "-X": [
        { id: 101, title: "Էրեբունի", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Erebuni_Museum_fortress_walls.jpg", desc: "Ք.ա. 782թ. Արգիշտի Ա-ի հիմնադրած ամրոցը:" },
        { id: 102, title: "Որմնանկարներ", img: "https://armenia.travel/sites/default/files/2021-01/urartu.jpg", desc: "Հին հայկական արվեստի բացառիկ նմուշներ:" }
    ],
    "IV": [
        { id: 103, title: "Էջմիածին", img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Etchmiadzin_Cathedral_2019.jpg", desc: "303թ. Էջմիածնի Մայր Տաճարի հիմնադրումը:" }
    ],
    "XXI": [
        { id: 104, title: "Թումո", img: "https://static.civilnet.am/2021/04/North_Ave-1024x683.jpg", desc: "Ստեղծարար տեխնոլոգիաների կենտրոն Երևանում:" }
    ]
};

for (let i = -10; i <= 21; i++) {
    const node = document.createElement('div');
    node.className = 'node';
    let label = (i < 0) ? `-${toRoman(Math.abs(i))}` : (i === 0 ? "0" : toRoman(i));
    
    let menuHtml = '';
    if (historyData[label]) {
        let items = historyData[label].map(item => `
            <div class="menu-item-wrapper">
                <a href="details.php?id=${item.id}" class="menu-item">${item.title}</a>
                <div class="monument-detail">
                    <div class="detail-img" style="background-image: url('${item.img}')"></div>
                    <div class="detail-info">
                        <h4>${item.title}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
            </div>
        `).join('');
        menuHtml = `<div class="monument-menu">${items}</div>`;
    }

    node.innerHTML = `<div class="marker">${label}</div> ${menuHtml}`;
    nodesWrapper.appendChild(node);
}

viewport.addEventListener('wheel', e => { e.preventDefault(); viewport.scrollLeft += e.deltaY; });