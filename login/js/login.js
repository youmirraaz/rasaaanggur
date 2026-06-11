document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const data = await res.json();

    if (data.status === "success") {
      // 1. Simpan status login ke memori browser
      localStorage.setItem("isLoggedIn", "true");
      // 2. Simpan nama pengguna
      localStorage.setItem("username", data.username);
      
      // 3. Alihkan langsung ke file dashboard.html
      window.location.href = "dashboard.html";
    } else {
      alert("Username atau Password salah, silakan coba lagi");
    }
  } catch (error) {
    alert("Terjadi kesalahan jaringan, silakan coba lagi nanti");
  }
});
