<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kedai Kopi Online</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <h1>Kedai Kopi</h1>
  </header>

  <nav>
    <button class="nav-btn active" data-target="fitur-utama">Fitur Utama</button>
    <button class="nav-btn" data-target="halaman-beranda">Beranda</button>
    <button class="nav-btn" data-target="daftar-menu">Daftar Menu</button>
    <button class="nav-btn" data-target="formulir-pemesanan">Pemesanan</button>
    <button class="nav-btn" data-target="sistem-pembayaran">Pembayaran</button>
    <button class="nav-btn" data-target="program-loyalitas">Loyalitas</button>
    <button class="nav-btn" data-target="ulasan-rating">Ulasan & Rating</button>
  </nav>

  <main>
    <!-- Fitur Utama -->
    <section id="fitur-utama" class="active">
      <h2>Fitur Utama</h2>
      <p>Platform Online Kedai Kopi kami hadir dengan fitur lengkap untuk meningkatkan pengalaman pelanggan:</p>
      <ul>
        <li>Mudah menjelajahi menu kopi secara digital</li>
        <li>Pemesanan cepat dan praktis</li>
        <li>Transaksi pembayaran aman dan nyaman</li>
        <li>Program loyalitas untuk pelanggan setia</li>
        <li>Fitur ulasan dan rating untuk feedback</li>
      </ul>
    </section>

    <!-- Beranda -->
    <section id="halaman-beranda">
      <h2>Selamat Datang di Kedai Kopi Online Kami</h2>
      <p>Nikmati cita rasa kopi terbaik dari kenyamanan rumahmu.</p>
      <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" alt="Kopi" />
    </section>

    <!-- Menu -->
    <section id="daftar-menu">
      <h2>Daftar Menu Kopi</h2>
      <div id="menu-list"></div>
    </section>

    <!-- Formulir Pemesanan -->
    <section id="formulir-pemesanan">
      <h2>Formulir Pemesanan</h2>
      <form id="orderForm">
        <label for="menuSelect">Pilih Menu Kopi</label>
        <select id="menuSelect" required>
          <option value="">-- Pilih kopi --</option>
        </select>

        <label for="jumlahPorsi">Jumlah</label>
        <input type="number" id="jumlahPorsi" value="1" min="1" required />

        <label for="namaPemesan">Nama Pemesan</label>
        <input type="text" id="namaPemesan" required />

        <button type="submit">Pesan Sekarang</button>
      </form>
      <p class="info" id="orderInfo"></p>
    </section>

    <!-- Pembayaran -->
    <section id="sistem-pembayaran">
      <h2>Sistem Pembayaran</h2>
      <form id="paymentForm">
        <label for="paymentAmount">Jumlah Bayar</label>
        <input type="number" id="paymentAmount" min="1000" required />

        <label for="paymentMethod">Metode Pembayaran</label>
        <select id="paymentMethod" required>
          <option value="">-- Pilih metode --</option>
          <option value="transfer">Transfer Bank</option>
          <option value="ovo">OVO</option>
          <option value="gopay">GoPay</option>
          <option value="dana">Dana</option>
        </select>

        <label for="paymentName">Nama Pemilik</label>
        <input type="text" id="paymentName" required />

        <button type="submit">Bayar Sekarang</button>
      </form>
      <p class="info" id="paymentInfo"></p>
    </section>

    <!-- Loyalitas -->
    <section id="program-loyalitas">
      <h2>Program Loyalitas</h2>
      <p>Kumpulkan poin setiap kali kamu memesan!</p>
      <div class="points" id="loyaltyPoints">0 Poin</div>
      <button id="resetPointsBtn">Reset Poin</button>
      <p class="info" id="loyaltyInfo"></p>
    </section>

    <!-- Ulasan -->
    <section id="ulasan-rating">
      <h2>Ulasan dan Rating</h2>
      <form id="reviewForm">
        <label for="reviewName">Nama</label>
        <input type="text" id="reviewName" required />
        <label for="reviewRating">Rating</label>
        <select id="reviewRating" required>
          <option value="">-- Pilih rating --</option>
          <option value="5">5 - Sangat Bagus</option>
          <option value="4">4 - Bagus</option>
          <option value="3">3 - Cukup</option>
          <option value="2">2 - Kurang</option>
          <option value="1">1 - Buruk</option>
        </select>
        <label for="reviewText">Ulasan</label>
        <textarea id="reviewText" required></textarea>
        <button type="submit">Kirim Ulasan</button>
      </form>
      <div class="reviews-list" id="reviewsList"></div>
    </section>
  </main>

  <!-- Load all script modules -->
  <script src="js/navigation.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/order.js"></script>
  <script src="js/payment.js"></script>
  <script src="js/loyalty.js"></script>
  <script src="js/review.js"></script>
</body>
</html>
