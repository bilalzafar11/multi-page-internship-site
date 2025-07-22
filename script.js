document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const fields = {
    fullName: {
      input: document.getElementById("fullName"),
      error: document.getElementById("nameError"),
      validate: (value) => value.trim() !== "",
      message: "Full name is required."
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Please enter a valid email address."
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("messageError"),
      validate: (value) => value.trim().length >= 10,
      message: "Message must be at least 10 characters."
    }
  };

  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    if (validateForm()) {
      showSuccess();
      form.reset();
    }
  });

  function validateForm() {
    let valid = true;
    for (const key in fields) {
      const { input, error, validate, message } = fields[key];
      if (!validate(input.value)) {
        error.textContent = message;
        valid = false;
      }
    }
    return valid;
  }

  function clearErrors() {
    Object.values(fields).forEach(({ error }) => {
      error.textContent = "";
    });
    successMessage.style.display = "none";
  }

  function showSuccess() {
    successMessage.textContent = "Thank you! Your message has been received.";
    successMessage.style.display = "block";
  }
});
