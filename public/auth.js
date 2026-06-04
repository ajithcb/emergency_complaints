async function signup() {
  await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });
  alert("Signup successful");
}

async function login() {
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem("user", username.value);
    location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}
