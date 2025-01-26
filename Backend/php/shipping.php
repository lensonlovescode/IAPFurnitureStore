<?php
include('shippingconnect.php');
if(isset($_POST['submit'])){
    $fullName = $_POST['fullName'];
    $emailAddress = $_POST['emailAddress'];
    $phoneNumber = $_POST['phoneNumber'];
    $cardName = $_POST['cardName'];
    $cardNumber = $_POST['cardNumber'];
    $cvcNumber = $_POST['cvcNumber'];
    $expiryDate = $_POST['expiryDate'];

    $query = mysqli_query($conn, "INSERT INTO shipping (fullName,emailAddress,phoneNumber,cardName,cardNumber,cvcNumber,expiryDate) Values ('$fullName', '$emailAddress', '$phoneNumber','$cardName', '$cardNumber', '$cvcNumber','$expiryDate')");
    if ($query) {
        echo "<script>alert('Data inserted successfully');</script>";
    } else {
        echo "<script>alert('Error: " . mysqli_error($conn) . "');</script>";
    }
    
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout Page</title>
   <link rel="stylesheet" href="../../Frontend/styles/checkout.css">
</head>
<body>
  <header>
    <input placeholder="Search..." class="search" name="text" type="query" />
</header>
<nav class="navigator">
    <li>OFFICE</li>
    <li>BEDROOM</li>
    <li>DINING</li>
    <li>LIVING ROOM</li>
    <li>OUTDOOR</li>
</nav>
    <div class="container">
<div class="paymentDetails">
    <h1>Checkout</h1>
    <p>To complete your purchase, please provide the following details. </p>
    <div class="detailsForm" id="detailsForm">
        <form method="POST">
            <h2>Personal Details: </h2>
            <div class="fullName">
                <label for="fullName">Full Name</label>
                <input type="text" name="fullName" id="name" required
                placeholder="John Doe"
                >
        </div>
        
        <div class="emailAddress">
                <label for="emailAddress">Email address</label>
                <input type="email" name="emailAddress" id="emailAddress" required 
                placeholder="example@gmail.com"
                > <br>
        </div>
       <div class="phoneNumber">
        
            <label for="phoneNumber">Phone Number</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" required 
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="xxx-xxx-hoxxxx"
            > <br> 
       </div>
       <h2>Card Details</h2>
       <div class="cardDetails">
        <div class="cardName">
            <label for="cardName">Card Name</label>
            <input type="text" name="cardName" id="cardName" required
            > 
       </div>
    
           <div class="cardNumber" id="cardNo">
            <label for="cardNumber">Card Number</label>
            <input type="text" name="cardNumber" id="cardNumber" required
            maxlength="19"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            > 
       </div>
       <div class="cardNumber">
        <label for="cvcNumber">CVC</label>
        <input type="number" name="cvcNumber" id="cvcNumber" required
        pattern="[0-9]{3}"
        max="999"
        min="100"
        > 
   </div>
   <div class="cardNumber">
    <label for="expiryDate">Expiry Date</label>
    <input type="text" name="expiryDate" id="expiryDate" required
    pattern="[0-9]{2}/[0-9]{2}"
    placeholder="MM/YY"
    > 
</div>
       </div>
               <input  class="submit" type="submit" value="Make Payment" name="submit" >
        </form> 
    </div>  
</div>
