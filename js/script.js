// Menu toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const fullMenu = document.getElementById('full-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        const isMenuOpen = fullMenu.classList.contains('translate-y-0');

        if (isMenuOpen) {
            fullMenu.classList.remove('translate-y-0');
            fullMenu.classList.add('-translate-y-full');
            document.body.style.overflow = '';

            body.classList.remove('menu-open');

        } else {
            fullMenu.classList.remove('-translate-y-full');
            fullMenu.classList.add('translate-y-0');
            document.body.style.overflow = 'hidden';

            body.classList.add('menu-open');
        }
    });
});

// Close lightbox when clicking outside the main image
document.querySelectorAll('.lightbox').forEach(lb => {
    lb.addEventListener('click', function (e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
});

// Function to open the lightbox and set the main image
function openLightbox(theme, imageSrc) {
    const lightbox = document.getElementById(theme);
    const mainImg = lightbox.querySelector('.main-image');

    mainImg.src = imageSrc;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    const thumbs = lightbox.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
        thumb.classList.remove('border-white');
        if (thumb.src.split('/').pop() === imageSrc.split('/').pop()) {
            thumb.classList.add('border-white');
        }
    });
}

// Function to change the main image when a thumbnail is clicked
function changeImage(element) {
    const parentLightbox = element.closest('.lightbox');
    const mainImg = parentLightbox.querySelector('.main-image');

    mainImg.src = element.src;

    parentLightbox.querySelectorAll('.thumb').forEach(t => t.classList.remove('border-white'));
    element.classList.add('border-white');
}

// Function to close the lightbox
function closeLightbox() {
    document.querySelectorAll('.lightbox').forEach(lb => {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
        lb.querySelectorAll('.thumb').forEach(t => t.classList.remove('border-white'));
    });
}

// Translation logic
const translations = {
    el: {
        "home": "Αρχική",
        "info": "Πληροφορίες",
        "contact": "Επικοινωνία",
        "description": "Το studio Purple Edges ιδρύθηκε το 2023 με σκοπό να γεφυρώσει το χάσμα μεταξύ της αρχιτεκτονικής ιδέας και της οπτικής πραγματικότητας. Η φιλοσοφία του studio βασίζεται στη δημιουργία φωτορεαλιστικών απεικονίσεων που δεν αποτελούν απλώς εικόνες, αλλά αφηγήσεις.",
        2023: "Ίδρυση του studio Purple Edges",
        2024: "Υιοθέτηση real-time rendering workflows",
        2025: "Συμμετοχή σε κοινά projects με κορυφαία αρχιτεκτονικά γραφεία στην Ελλάδα",
        2026: "Συνεχής ανάπτυξη και αναζήτηση νέων μέσων οπτικοποίησης",
        "address": "Διεύθυνση",
        "address text": "Δημοκρατίας 50, 50 100 Κοζάνη, Ελλάδα",
        "phone": "Τηλέφωνο",
        "bedroomText": "Υπνοδωμάτιο",
        "kitchenText": "Κουζίνα",
        "livingRoomText": "Καθιστικό",
        "titleHome": "Purple Edges - Αρχική",
        "titleAbout": "Purple Edges - Πληροφορίες",
        "titleContact": "Purple Edges - Επικοινωνία",
    },
    en: {
        "home": "Home",
        "info": "About",
        "contact": "Contact",
        "description": "Purple Edges studio was founded in 2023 with the aim of bridging the gap between architectural ideas and visual reality. The studio's philosophy is based on creating photorealistic renderings that are not just images, but narratives.",
        2023: "Foundation of Purple Edges studio",
        2024: "Adoption of real-time rendering workflows", 
        2025: "Collaboration on projects with top architectural firms in Greece",
        2026: "Continuous development and exploration of new visualization mediums",
        "address": "Address",
        "address text": "Dimokratias 50, 50 100 Kozani, Greece",
        "phone": "Telehone",
        "bedroomText": "Bedroom",
        "kitchenText": "Kitchen",
        "livingRoomText": "Living Room",
        "titleHome": "Purple Edges - Home",
        "titleAbout": "Purple Edges - About",
        "titleContact": "Purple Edges - Contact",
    }
};

// Function to change the language of the page
function changeLanguage(lang) {
    const elements = document.querySelectorAll('.greek');

    // Update text content based on translations
    elements.forEach(el => {
        if (translations[lang][el.id]) {
            el.innerText = translations[lang][el.id];

            const italics = ['Purple Edges', ];

            italics.forEach(term => {
                if (el.innerText.includes(term) && !el.innerHTML.includes(`-`)) {
                    el.innerHTML = el.innerHTML.replace(new RegExp(term, 'g'), `<i>${term}</i>`);
                }
            });

            const lineBreaks = ['50 100', ];

            lineBreaks.forEach(term => {
                if (el.innerText.includes(term)) {
                    el.innerHTML = el.innerHTML.replace(new RegExp(term, 'g'), `<br>${term}`);
                }
            });                      
        }
    });

    const langBtns = document.querySelectorAll('#language-switcher button');

    // Update button styles based on selected language
    langBtns.forEach(btn => {
        if (btn.innerText.toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('font-bold', 'border-b-2', 'border-white', 'text-white');
            btn.classList.remove('opacity-50');
        } else {
            btn.classList.remove('font-bold', 'border-b-2', 'border-white', 'text-white');
            btn.classList.add('opacity-50');
        }
    });

    // Save selected language to localStorage
    localStorage.setItem('lang', lang);
}

// On page load, set the language based on saved preference or default to Greek
window.onload = () => {
    const savedLang = localStorage.getItem('lang') || 'el'; // Προεπιλογή Ελληνικά
    changeLanguage(savedLang);
};
