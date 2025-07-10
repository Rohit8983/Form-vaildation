$(function () {
  const $msg = $("#statusMsg");

  function showMessage(text, type) {
    $msg.removeClass("hidden success error")
        .addClass(type)
        .text(text);
  }

  const isEmail        = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone   = p => /^\d{10}$/.test(p);
  const isStrongPass   = p => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(p);

  $("#showPassword").on("change", function () {
    const type = this.checked ? "text" : "password";
    $("#password, #confirmpassword").attr("type", type);
  });

  /* Submit handler */
  $("#submitbutton").on("click", function () {
    const email   = $("#Email").val().trim();
    const phone   = $("#phoneno").val().trim();
    const pass    = $("#password").val();
    const confirm = $("#confirmpassword").val();

    if (!email || !phone || !pass || !confirm)
      return showMessage("Please fill out all fields.", "error");

    if (!isEmail(email))
      return showMessage("Enter a valid email (e.g. user@example.com).", "error");

    if (!isValidPhone(phone))
      return showMessage("Phone number must be exactly 10 digits.", "error");

    if (!isStrongPass(pass))
      return showMessage("Password must be ≥ 8 chars and include upper, lower, and a number.", "error");

    if (pass !== confirm)
      return showMessage("Passwords do not match.", "error");

    showMessage("User successfully registered!", "success");
    // Optional: $("#myForm")[0].reset();
  });
});
