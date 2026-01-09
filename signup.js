const API = "http://localhost:8080";

(async () => {
  const r = await fetch("http://localhost:8080/api/auth/me", {
    credentials: "include"
  });
  if (r.ok) location.replace("dashboard.html");
})();
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    window.location.href = "login.html";
  } else {
    alert("Signup failed");
  }
});
