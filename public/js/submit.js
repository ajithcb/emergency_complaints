const form = document.getElementById("complaintForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. Get existing form data (Issue, Description, etc.)
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 2. IMPORTANT: Manually add the email from localStorage
  // Use "userEmail" or "email" depending on which key you used at login
  const storedEmail = localStorage.getItem("userEmail") || localStorage.getItem("email");
  
  if (!storedEmail) {
    alert("You must be logged in to submit a complaint.");
    window.location.href = "login.html";
    return;
  }

  data.email = storedEmail; // Add the email to your data object

  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // Check for success based on your server's response
    if (response.ok) {
      alert("Complaint submitted successfully!");
      form.reset();
    } else {
      alert(result.message || "Failed to submit complaint. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
});
