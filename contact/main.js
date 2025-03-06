$(document).ready(function () {
    // Hide alerts initially
    $("#success-alert").hide();
    $("#error-alert").hide();
  
    $("#contact-form").submit(function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Gather form data
      var formData = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val(),
      };
  
      // Send form data using AJAX
      $.ajax({
        type: "POST",
        url: "https://formspree.io/f/xjvdlknn", // Replace with your Formspree form ID
        data: formData,
        dataType: "json",
        success: function (response) {
          // Display a success message
          $("#success-alert").fadeIn().delay(2000).fadeOut();
          // Clear the form fields
          $("#name").val("");
          $("#email").val("");
          $("#message").val("");
        },
        error: function (response) {
          // Display an error message
          $("#error-alert").fadeIn().delay(2000).fadeOut();
        },
      });
    });
  });
  