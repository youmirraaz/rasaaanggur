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
      // 2. Simpan nama pengguna dari server
      localStorage.setItem("username", data.username);
      
      // 3. Alihkan langsung ke file dashboard.html yang baru lo bikin
      window.location.href = "dashboard.html";
    } else {
      // Jika password atau username salah dari server
      tampilkanAlert("Username atau Password salah, silakan coba lagi");
    }
  } catch (error) {
    // Jika server API sedang mati atau bermasalah
    tampilkanAlert("Terjadi kesalahan jaringan, silakan coba lagi nanti");
  }
});

// Fungsi pembantu untuk memunculkan kotak peringatan (alert)
function tampilkanAlert(pesan) {
  const alertBox = document.getElementById("alertBox");
  if (alertBox) {
    alertBox.innerText = pesan;
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  } else {
    // Cadangan jika di HTML lo belum ada elemen id="alertBox"
    alert(pesan);
  }
}
