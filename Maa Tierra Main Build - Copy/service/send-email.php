<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "maatierra@outlook.com";

    $subject = "New Registration Form Submission";

    $fullname = $_POST["fullname"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $mobile = $_POST["mobile"];
    $gender = $_POST["gender"];
    $occupation = $_POST["occupation"];
    $field = $_POST["field"];
    $company = $_POST["company"];
    $companywork = $_POST["companywork"];
    $address = $_POST["address"];

    $message = "Registration Form Submission\n\n";
    $message .= "Full Name: " . $fullname . "\n";
    $message .= "Date of Birth: " . $dob . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Mobile Number: " . $mobile . "\n";
    $message .= "Gender: " . $gender . "\n";
    $message .= "Occupation: " . $occupation . "\n";
    $message .= "Field: " . $field . "\n";
    $message .= "Company Name: " . $company . "\n";
    $message .= "Company Work: " . $companywork . "\n";
    $message .= "Address: " . $address . "\n";

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: thank-you.html");
        exit();
    } else {
        echo "Sorry, there was an error sending your message.";
    }
}
?>