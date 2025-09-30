// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const fullMenu = document.getElementById('full-menu');
    const body = document.body; // Προσθήκη αναφοράς στο body
    
    // ... (Δεν χρειάζονται πλέον τα lineTop, lineMiddle, lineBottom) ...
    // ... Μπορείς να τα αφήσεις, αλλά ο έλεγχος γίνεται μέσω της body class.

    menuToggle.addEventListener('click', () => {
        const isMenuOpen = fullMenu.classList.contains('translate-y-0');

        if (isMenuOpen) {
            // Κλείσιμο Μενού
            fullMenu.classList.remove('translate-y-0');
            fullMenu.classList.add('-translate-y-full');
            document.body.style.overflow = ''; 
            
            // ΑΦΑΙΡΕΣΗ της custom class
            body.classList.remove('menu-open'); 

        } else {
            // Άνοιγμα Μενού
            fullMenu.classList.remove('-translate-y-full');
            fullMenu.classList.add('translate-y-0');
            document.body.style.overflow = 'hidden'; 
            
            // ΠΡΟΣΘΗΚΗ της custom class
            body.classList.add('menu-open');
        }
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.getElementById('menu-toggle');
//     const fullMenu = document.getElementById('full-menu');

//     // Τα span elements του burger icon
//     const lineTop = document.getElementById('line-top');
//     const lineMiddle = document.getElementById('line-middle');
//     const lineBottom = document.getElementById('line-bottom');

//     menuToggle.addEventListener('click', () => {
//         const isMenuOpen = fullMenu.classList.contains('translate-y-0');

//         if (isMenuOpen) {
//             // Κλείσιμο Μενού
//             fullMenu.classList.remove('translate-y-0');
//             fullMenu.classList.add('-translate-y-full');
//             document.body.style.overflow = ''; // Επαναφορά scrolling

//             // Επαναφορά Burger Icon
//             lineTop.classList.remove('rotate-45', 'translate-y-2');
//             lineMiddle.classList.remove('opacity-0');
//             lineBottom.classList.remove('-rotate-45', '-translate-y-2');

//         } else {
//             // Άνοιγμα Μενού
//             fullMenu.classList.remove('-translate-y-full');
//             fullMenu.classList.add('translate-y-0');
//             document.body.style.overflow = 'hidden'; // Απενεργοποίηση scrolling

//             // Animation Burger Icon (σε X)
//             lineTop.classList.add('rotate-45', 'translate-y-2');
//             lineMiddle.classList.add('opacity-0');
//             lineBottom.classList.add('-rotate-45', '-translate-y-2');
//         }
//     });
// });

// script.js (Πρόσθεσε στο τέλος του αρχείου)

// Λειτουργία για εμφάνιση μηνυμάτων μετά την υποβολή της φόρμας (από το PHP)
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');
const formStatusDiv = document.getElementById('form-status');

if (formStatusDiv && status) {
    formStatusDiv.classList.remove('hidden');
    let message = '';

    if (status === 'success') {
        message = '✅ Ευχαριστούμε! Το μήνυμά σας στάλθηκε με επιτυχία.';
        formStatusDiv.classList.add('bg-green-700', 'text-white');
    } else if (status === 'error') {
        const errorMessage = urlParams.get('message');
        message = '❌ Σφάλμα αποστολής.';

        if (errorMessage === 'ValidationFailed') {
            message += ' Παρακαλώ συμπληρώστε όλα τα πεδία σωστά.';
        } else if (errorMessage === 'MailFailed') {
            message += ' Παρουσιάστηκε πρόβλημα με τον server (Mail function failed).';
        } else {
            message += ' Δοκιμάστε ξανά αργότερα.';
        }

        formStatusDiv.classList.add('bg-red-700', 'text-white');
    }

    formStatusDiv.textContent = message;

    // Καθαρισμός των query parameters για να μην ξαναεμφανιστεί το μήνυμα στο refresh
    history.pushState('', document.title, window.location.pathname);
}
