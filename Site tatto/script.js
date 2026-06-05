// script.js
// Dynamically load images from folders and display them in a grid.
// Each folder name is used as a tag for the images inside it.

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const tagsDiv = document.getElementById('tags');
const closeBtn = document.querySelector('.close');
const downloadBtn = document.getElementById('download-btn');
const searchInput = document.getElementById('search-input');

// Define the categories and their paths relative to the site root.
const categories = [
    {name: 'Graphics', path: 'Graphics'},
    {name: 'Minimalism', path: 'Minimalism'},
    {name: 'Realism', path: 'Realism'},
    {name: 'Traditional', path: 'Traditional'},
    {name: 'Anime', path: 'Anime'}
];

// Helper to create an element with classes
function el(tag, className, inner) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (inner) e.innerHTML = inner;
    return e;
}

// Store created items for filtering
const allItems = [];

// Load images for each category
categories.forEach(cat => {
    const files = {
        'Graphics': [
            '0a9b183357ee1bdd7733b25f649b457a.format-jpeg.jpg',
            '19-5.jpg',
            '1680607200_pictures-pibig-info-p-grafika-eskizi-vkontakte-14.jpg',
            '1454697660163851140.jpg',
            '1454697666126225123.jpg',
            'd1a47edbfab8d3fdff2af087a536d916.jpg',
            'floated away.jpg',
            'foni-papik-pro-p044-p-kartinki-eskiz-tatu-na-prozrachnom-fone-1.png',
            'Livia Cascio.jpg',
            "Schizzi d'arte.jpg",
            'wolf geometry.jpg',
            'woman with long.jpg',
            'z1kaw1h50422zw75n3r2bfy8z508fc2r.jpg'
        ],
        'Minimalism': [
            '0b22742fc423dc547e3f0f8b7644445f.jpg',
            '9ea1d931bcd224df28db33c43c020cbc.jpg',
            '0097228916bfc54845b1aa4f0e51a1ff.jpg',
            'a pair of plants.jpg',
            'abrakadabra.jpg',
            'area triangles.jpg',
            'birds.jpg',
            'broken.jpg',
            'change of day.jpg',
            'cveti.jpg',
            'ffdf06abca3ee1aa67c4b3c977df37b9.jpg',
            'Fusion.jpg',
            'Fusion2.jpg',
            'icq.jpg',
            'Kubs.jpg',
            'kupidon.jpg',
            'litle.png',
            'little2.jpg',
            'Love treshina.jpg',
            'mountainous terrain.jpg',
            'photo30330.jpg',
            'photo30356.jpg',
            'photo30434.jpg',
            'Riniten.jpg',
            'Tom and Mouse.jpg',
            'Trava.jpg',
            'trigle.jpg',
            'whale.jpg'
        ],
        'Realism': [
            'drawings.png',
            'ideen männer arm.jpg',
            'Zakee Robinson.jpg'
        ],
        'Traditional': [
            'Traditional Part 1.jpg',
            'Traditional Part 2.jpg',
            'Traditional Part 3.jpg'
        ],
        'Anime': [
            '10_OXiHVwy.2e16d0ba.fill-600x400-c100.format-jpeg.jpg',
            '12_lio7RBd.2e16d0ba.fill-360x360-c100.format-jpeg.jpg',
            '14_fKbzfDL.2e16d0ba.fill-600x400-c100.format-jpeg.jpg',
            '17_benxOLj.2e16d0ba.fill-360x360-c100.format-jpeg.jpg',
            '20_BhbAqxo.2e16d0ba.fill-360x360-c100.format-jpeg.jpg',
            '74777f1e3f016efcc5d7d6934604ca3d.jpg',
            '1630734723_13-papik-pro-p-anime-tatu-risunki-14.jpg',
            '1640700181_3-papik-pro-p-anime-tatuirovki-risunki-3.jpg',
            '1671814240_1-zefirka-club-p-unesennie-prizrakami-eskiz-1.jpg',
            '1649679277134077600.jpg',
            '1649679289190443510.jpg',
            'attoo-photo.ru_-scaled.jpg',
            'cf570e61781d2a0c53efef8fc4ce7f77.jpg',
            'ornament_177478-662.jpg'
        ]
    }[cat.name];

    files.forEach(file => {
        const item = el('div', 'gallery-item');
        const img = el('img');
        img.src = `${cat.path}/${file}`;
        img.alt = file;
        img.dataset.tags = cat.name; // tag – folder name
        item.appendChild(img);
        gallery.appendChild(item);
        allItems.push({element: item, tag: cat.name});

        // Click handler to open modal
        item.addEventListener('click', () => {
            modalImg.src = img.src;
            tagsDiv.textContent = `Теги: ${img.dataset.tags}`;
            modal.classList.remove('hidden');
        });
    });
});

// Search by tags
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    allItems.forEach(itemObj => {
        const matches = itemObj.tag.toLowerCase().includes(query);
        itemObj.element.style.display = matches ? '' : 'none';
    });
});

// Close modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Navigation filtering (show all for any link)
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Show all items
        allItems.forEach(itemObj => {
            itemObj.element.style.display = '';
        });
    });
});

// Close modal when clicking on the backdrop
modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Download button
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = modalImg.src;
    link.download = modalImg.src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
