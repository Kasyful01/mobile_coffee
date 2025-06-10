<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kedai Kopi Online</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Kedai Kopi Strong</h1>
  </header>
  <nav>
    <button class="nav-btn active" data-target="halaman-beranda">Beranda</button>
    <button class="nav-btn" data-target="daftar-menu">Daftar Menu</button>
    <button class="nav-btn" data-target="formulir-pemesanan">Pemesanan</button>
    <button class="nav-btn" data-target="sistem-pembayaran">Pembayaran</button>
    <button class="nav-btn" data-target="program-loyalitas">Loyalitas</button>
  </nav>
  <main>
    <section id="halaman-beranda" class="active">
      <h2>Selamat Datang di Kedai Kopi Online Kami</h2>
      <p>Platform Online Kedai Kopi kami hadir dengan fitur lengkap untuk meningkatkan pengalaman pelanggan:</p>
      <ul>
        <li>Mudah menjelajahi menu kopi secara digital</li>
        <li>Pemesanan cepat dan praktis</li>
        <li>Transaksi pembayaran aman dan nyaman</li>
        <li>Program loyalitas untuk pelanggan setia</li>
        <li>Fitur ulasan dan rating untuk feedback</li>
      </ul>
      <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" alt="Kopi" class="hero-img" />
    </section>

    <section id="daftar-menu"></section>
    <section id="formulir-pemesanan"></section>
    <section id="sistem-pembayaran">
      <h2>Pembayaran</h2>
      <form id="paymentForm">
        <label for="paymentName">Nama Pemesan</label>
        <input type="text" id="paymentName" readonly />

        <label for="paymentAmount">Total Pembayaran</label>
        <input type="number" id="paymentAmount" readonly />

        <label for="paymentMethod">Metode Pembayaran</label>
        <select id="paymentMethod" required>
          <option value="">-- Pilih metode --</option>
          <option value="cash">Tunai</option>
          <option value="transfer">Transfer</option>
          <option value="qris">Qris</option>
        </select>

        <button type="submit">Bayar Sekarang</button>
      </form>
    </section>

    <section id="program-loyalitas"></section>
  </main>

  <script src="js/app.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/order.js"></script>
  <script src="js/payment.js"></script>
  <script src="js/loyalty.js"></script>
  <script src="js/review.js"></script>

  <script>
    const navButtons = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('main section');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      const orderForm = document.getElementById('orderForm');
      const orderInfo = document.getElementById('orderInfo');

      if (orderForm) {
        orderForm.addEventListener('submit', e => {
          e.preventDefault();

          const menuId = document.getElementById('menuSelect').value;
          const jumlah = parseInt(document.getElementById('jumlahPorsi').value);
          const nama = document.getElementById('namaPemesan').value.trim();
          const idPemesan = document.getElementById('idPemesan')?.value.trim() || `ORD-${Date.now()}`;
          const noHP = document.getElementById('noHP')?.value.trim() || '';

          if (!menuId || !nama || !jumlah || jumlah < 1) {
            orderInfo.textContent = 'Mohon isi data dengan benar.';
            orderInfo.style.color = 'red';
            return;
          }

          const menu = window.menuItems?.find(m => m.id === menuId);
          if (!menu) return;

          const total = jumlah * menu.harga;
          const orderData = { idPemesan, noHP, nama, menuId, jumlah, total };

          localStorage.setItem('lastOrder', JSON.stringify(orderData));

          // langsung arahkan ke halaman pembayaran
          document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
          document.getElementById('sistem-pembayaran').classList.add('active');
          navButtons.forEach(b => b.classList.remove('active'));
          document.querySelector('[data-target="sistem-pembayaran"]').classList.add('active');

          // tampilkan total otomatis (jika elemen ada)
          const inputAmount = document.getElementById('paymentAmount');
          if (inputAmount) inputAmount.value = total;

          const inputName = document.getElementById('paymentName');
          if (inputName) inputName.value = nama;
        });
      }
    });
  </script>
</body>
</html>
