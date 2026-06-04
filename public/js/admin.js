if (localStorage.getItem("admin") !== "true") {
  window.location.href = "admin-login.html";
}

fetch("/admin/complaints")
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById("complaints");

    data.forEach(c => {
      div.innerHTML += `
        <div class="card">
          <p><b>Name:</b> ${c.name}</p>
          <p><b>Type:</b> ${c.type}</p>
          <p><b>Description:</b> ${c.description}</p>
          <p><b>Status:</b> ${c.status}</p>

          <select onchange="updateStatus('${c._id}', this.value)">
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
        </div>
      `;
    });
  });

function updateStatus(id, status) {
  fetch("/admin/update/" + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  }).then(() => alert("Status updated"));
}
