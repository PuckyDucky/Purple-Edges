<?php
// send_email.php

// 1. ΡΥΘΜΙΣΕΙΣ - ΑΝΤΙΚΑΤΑΣΤΑΣΕ ΤΑ ΠΑΡΑΚΑΤΩ ΣΤΟΙΧΕΙΑ
$receiving_email_address = 'pliatsiosgiorgos@gmail.com';
$website_domain = 'YOUR_WEBSITE_DOMAIN.com';

// Έλεγχος αν η αίτηση έγινε με τη μέθοδο POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // Ανακατεύθυνση αν κάποιος προσπαθήσει να ανοίξει απευθείας το αρχείο
    header("Location: /contact.html?status=error&message=InvalidRequest");
    exit;
}

// 2. Συλλογή Δεδομένων από τη Φόρμα
$name = htmlspecialchars(trim($_POST['name']));
$email = htmlspecialchars(trim($_POST['email']));
$subject_prefix = htmlspecialchars(trim($_POST['subject']));
$message = htmlspecialchars(trim($_POST['message']));

// 3. Βασικός Έλεγχος Εγκυρότητας
if (empty($name) || empty($email) || empty($subject_prefix) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Ανακατεύθυνση με μήνυμα λάθους
    header("Location: /contact.html?status=error&message=ValidationFailed");
    exit;
}

// 4. Σύνθεση Email
$full_subject = "[ΝΕΑ ΕΠΙΚΟΙΝΩΝΙΑ - " . $website_domain . "] " . $subject_prefix;

$email_content = "Όνομα: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Μήνυμα:\n$message\n";

// 5. Κεφαλίδες Email
$headers = "From: Web Contact <no-reply@" . $website_domain . ">\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // Για ελληνικούς χαρακτήρες

// 6. Αποστολή Email
if (mail($receiving_email_address, $full_subject, $email_content, $headers)) {
    // Επιτυχής Αποστολή
    header("Location: /contact.html?status=success");
} else {
    // Αποτυχία Αποστολής (συνήθως πρόβλημα server)
    header("Location: /contact.html?status=error&message=MailFailed");
}
exit;
?>