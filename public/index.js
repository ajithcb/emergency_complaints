function userSignUp() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Save user info in localStorage (for demo purposes)
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("User already exists, please login");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign-up successful! You can now login.");
}

function userLogin() {
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Save current logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));
    // Redirect to submit/track page
    window.location.href = "submit.html";
  } else {
    alert("Invalid credentials");
  }
}
