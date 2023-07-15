<?php
session_start();

// Generate a random captcha code
$captchaCode = generateCaptchaCode(6);

// Save the captcha code in session
$_SESSION['captcha_code'] = $captchaCode;

// Generate an image with the captcha code
$width = 120;
$height = 40;
$image = imagecreatetruecolor($width, $height);
$bgColor = imagecolorallocate($image, 255, 255, 255);
$textColor = imagecolorallocate($image, 0, 0, 0);
imagefilledrectangle($image, 0, 0, $width - 1, $height - 1, $bgColor);
imagettftext($image, 20, 0, 10, 28, $textColor, 'path/to/your/font.ttf', $captchaCode);

// Set the image header and output the image
header('Content-type: image/png');
imagepng($image);
imagedestroy($image);

// Function to generate a random captcha code
function generateCaptchaCode($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $captchaCode = '';
    $maxIndex = strlen($characters) - 1;
    for ($i = 0; $i < $length; $i++) {
        $captchaCode .= $characters[rand(0, $maxIndex)];
    }
    return $captchaCode;
}
?>
