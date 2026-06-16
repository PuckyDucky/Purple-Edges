// 1. Menu toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const fullMenu = document.getElementById('full-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        const isMenuOpen = fullMenu.classList.contains('translate-y-0');
        fullMenu.style.pointerEvents = 'auto'; // Enable pointer events when the menu is open

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


// 2. Toggle bar for switching between light and dark mode logic
const toggleBtn = document.getElementById('theme-toggle');
const lightLabel = document.getElementById('light-label');
const darkLabel = document.getElementById('dark-label');

// Update the UI on page load
const updateLabels = () => {
    if (document.documentElement.classList.contains('dark')) {
        lightLabel.style.opacity = '0.3';
        darkLabel.style.opacity = '1';
    } else {
        lightLabel.style.opacity = '1';
        darkLabel.style.opacity = '0.3';
    }
};

// Function to toggle theme with optional forced theme
const toggleTheme = (forceTheme = null) => {
    const body = document.body;
    const isMenuOpen = body.classList.contains('menu-open');

    // Animate the transition only if the menu is open, otherwise just toggle the theme
    if (isMenuOpen) {
        body.classList.remove('transition-colors', 'duration-300');
        
        // If a specific theme is forced, apply it; otherwise, toggle the current theme
        if (forceTheme) {
            forceTheme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.toggle('dark');
        }

        setTimeout(() => {
            body.classList.add('transition-colors', 'duration-300');
        }, 50);
    } else {
        if (forceTheme) {
            forceTheme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.toggle('dark');
        }
    }

    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateLabels();
};

// Event listener for the toggle button
toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTheme();
});

// Event listener for "light" label
lightLabel.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTheme('light');
    lightLabel.style.cursor = "url('../Assets/Cursor\ \(Purple\ Edges\).svg') 10 10, auto";
});

// Evet listener for "dark" label
darkLabel.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTheme('dark');
    darkLabel.style.cursor = "url('../Assets/Cursor\ \(Purple\ Edges\).svg') 10 10, auto";
});

// Hover effect logic for labels
const addHoverEffect = (element) => {
    element.addEventListener('mouseenter', () => {
        // If, for some reson, the opacity was 1.0, the line "element.style.opacity = '1';" would compare string values, which would not work as intended. Therefore, we use
        // "parseFloat" to convert the string to a number for comparison.
        if (parseFloat(element.style.opacity) < 1) {
            element.style.opacity = '0.6';
            element.style.cursor = 'pointer';
        } else {
            element.style.cursor = "url('../Assets/Cursor\ \(Purple\ Edges\).svg') 10 10, auto";
        }
    });

    element.addEventListener('mouseleave', () => {
        updateLabels();
    });
};

// Apply hover effects to both labels
addHoverEffect(lightLabel);
addHoverEffect(darkLabel);

// Load theme on startup
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}
updateLabels();


// 3. Close lightbox when clicking outside the main image
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

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    lightbox.querySelectorAll('.thumb').forEach(t => {
        t.classList.remove('border-brand-purple', 'dark:border-gray-400');
        t.classList.add('border-transparent');
    });

    const matchingThumb = Array.from(lightbox.querySelectorAll('.thumb')).find(thumb => thumb.src.includes(imageSrc)|| lightbox.querySelector('.first-thumb'));

    if (matchingThumb) {
        matchingThumb.classList.remove('border-transparent');
        matchingThumb.classList.add('border-brand-purple', 'dark:border-gray-400');
        lightbox.querySelector('.main-image').src = imageSrc;
    }
}

// Function to change the main image when a thumbnail is clicked
function changeImage(element) {
    const parentLightbox = element.closest('.lightbox');
    const mainImg = parentLightbox.querySelector('.main-image');

    mainImg.src = element.src;

    parentLightbox.querySelectorAll('.thumb').forEach(t => {
        t.classList.remove('border-brand-purple', 'dark:border-gray-400');
        t.classList.add('border-transparent');
    });

    element.classList.remove('border-transparent');
    element.classList.add('border-brand-purple', 'dark:border-gray-400');
}

// Function to close the lightbox
function closeLightbox() {
    document.querySelectorAll('.lightbox').forEach(lb => {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
    });
}


// 4. Translation logic
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
        "titleAcc": "Δήλωση Προσβασιμότητας",
        "a11y": "Purple Edges - Δήλωση Προσβασιμότητας",
        "accH1": "Δήλωση Προσβασιμότητας",
        "accDescription1": "Το studio Purple Edges δεσμεύεται να καθιστά την ιστοσελίδα της προσβάσιμη σε όλους τους χρήστες, ανεξάρτητα από τις σωματικές τους ικανότητες ή τη χρήση υποστηρικτικών τεχνολογιών.",
        "accH2": "Συμμόρφωση",
        "accDescription2": "Εργαζόμαστε συνεχώς ώστε η ιστοσελίδα μας να συμμορφώνεται με τις Οδηγίες Προσβασιμότητας Περιεχομένου Ιστού (WCAG) 2.1, επίπεδο AA. Οι οδηγίες αυτές ορίζουν πώς το περιεχόμενο ιστού μπορεί να γίνει πιο προσβάσιμο σε άτομα με αναπηρίες.",
        "accH3": "Τεχνικές Προδιαγραφές",
        "point1": "Χρήση σημασιολογικού κώδικα HTML5",
        "point2": "Σωστή χρήση ARIA labels για την καλύτερη πλοήγηση με αναγνώστες οθόνης (screen readers)",
        "point3": "Χρωματική παλέτα που εξασφαλίζει επαρκή αντίθεση για χρήστες με προβλήματα όρασης",
        "point4": "Πλήρης πλοήγηση μέσω πληκτρολογίου",
        "accH4": "Σχόλια και Επικοινωνία",
        "accDescription3": "Αν συναντήσετε οποιοδήποτε πρόβλημα προσβασιμότητας στην ιστοσελίδα μας, μην διστάσετε να επικοινωνήσετε μαζί μας. Θα καταβάλουμε κάθε δυνατή προσπάθεια, για να διορθώσουμε το ζήτημα άμεσα.",
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
        "titleAcc": "Accessibility statement",
        "a11y": "Purple Edges - Accessibility Statement",
        "accH1": "Accessibility Statement",
        "accDescription1": "Purple Edges studio is committed to making its website accessible to all users, regardless of their physical abilities or use of assistive technologies.",
        "accH2": "Compliance",
        "accDescription2": "We continuously work to ensure that our website complies with the Web Content Accessibility Guidelines (WCAG) 2.1, level AA. These guidelines define how web content can be made more accessible to people with disabilities.",
        "accH3": "Technical Specifications",
        "point1": "Use of semantic HTML5 markup",
        "point2": "Proper use of ARIA labels for better navigation with screen readers",
        "point3": "Color palette that ensures sufficient contrast for users with visual impairments",
        "point4": "Full keyboard navigation",
        "accH4": "Feedback and Contact",
        "accDescription3": "If you encounter any accessibility issues on our website, please do not hesitate to contact us. We will make every effort to address the issue promptly.",
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
            btn.classList.add('font-bold', 'text-brand-purple', 'dark:text-white');
            btn.classList.remove('opacity-50');
            btn.style.cursor = "url('../Assets/Cursor\ \(Purple\ Edges\).svg') 10 10, auto";
            btn.ariaDisabled = true;
        } else {
            btn.classList.remove('font-bold', 'text-brand-purple', 'dark:text-white');
            btn.classList.add('opacity-50');
            btn.style.cursor = 'pointer';
            btn.ariaDisabled = false;
        }
    });

    // Save selected language to localStorage
    localStorage.setItem('lang', lang);
}


// 5. On page load, set the language and theme based on saved preferences
window.onload = () => {
    const savedLang = localStorage.getItem('lang') || 'el'; // Default to Greek if no preference is saved
    changeLanguage(savedLang);

    const savedTheme = localStorage.getItem('theme'); // Default to system preference if no preference is saved

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    updateLabels();
};
