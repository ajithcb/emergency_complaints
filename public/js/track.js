function trackComplaint() {
  const emailInput = document.getElementById("email").value;
  if (!emailInput) {
    alert("Please enter your email");
    return;
  }

  const email = emailInput.toLowerCase();

  fetch(`/track/${email}`)
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      if (data.length === 0) {
        resultDiv.innerHTML = "<p>No complaints found for this email.</p>";
        return;
      }

      data.forEach(c => {
        resultDiv.innerHTML += `
          <div class="complaint-card">
            <p><b>Type:</b> ${c.type}</p>
            <p><b>Description:</b> ${c.description}</p>
            <p><b>Status:</b> ${c.status}</p>
            <p><b>Date:</b> ${new Date(c.date).toLocaleString()}</p>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error(err);
      alert("Error loading complaints.");
    });
}
