// js/order.js

const orderFormSection = document.getElementById('formulir-pemesanan');

orderFormSection.innerHTML = `
  <h2>Formulir Pemesanan</h2>
  <form id="orderForm">
    <div id="menuContainer"></div>

    <label for="namaPemesan">Nama Pemesan</label>
    <input type="text" id="namaPemesan" placeholder="Masukkan nama Anda" required />

    <label for="noHP">Nomor HP</label>
    <input type="text" id="noHP" placeholder="Contoh: 081234567890" required />

    <button type="button" id="tambahMenuBtn">+ Tambah Menu</button>
    <button type="submit">Pesan Sekarang</button>
  </form>
  <p class="info" id="orderInfo"></p>
  <div id="daftarPesanan"></div>
`;

function generateOrderId() {
  return 'ORD-' + Date.now();
}

function renderMenuSelect(index) {
  const div = document.createElement('div');
  div.classList.add('menu-pesanan');
  div.innerHTML = `
    <label>Pilihan Menu</label>
    <select class="menuSelect" required>
      <option value="">-- Pilih kopi --</option>
      ${menuItems.map(item => `<option value="${item.id}">${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}</option>`).join('')}
    </select>

    <label>Jumlah</label>
    <input type="number" class="jumlahPorsi" value="1" min="1" required />
  `;
  return div;
}

const menuContainer = document.getElementById('menuContainer');
const tambahMenuBtn = document.getElementById('tambahMenuBtn');

// Tambah menu pertama
menuContainer.appendChild(renderMenuSelect(0));

// Tombol tambah menu lainnya
let menuIndex = 1;
tambahMenuBtn.addEventListener('click', () => {
  menuContainer.appendChild(renderMenuSelect(menuIndex++));
});

const orderForm = document.getElementById('orderForm');
const orderInfo = document.getElementById('orderInfo');
const daftarPesanan = document.getElementById('daftarPesanan');

orderForm.addEventListener('submit', e => {
  e.preventDefault();

  const nama = document.getElementById('namaPemesan').value.trim();
  const noHP = document.getElementById('noHP').value.trim();
  const menuSelects = document.querySelectorAll('.menuSelect');
  const jumlahInputs = document.querySelectorAll('.jumlahPorsi');

  if (!nama || !noHP) {
    orderInfo.textContent = 'Nama dan No. HP wajib diisi.';
    orderInfo.style.color = 'red';
    return;
  }

  let total = 0;
  const menuPesanan = [];

  for (let i = 0; i < menuSelects.length; i++) {
    const menuId = menuSelects[i].value;
    const jumlah = parseInt(jumlahInputs[i].value);

    const menu = menuItems.find(m => m.id === menuId);
    if (!menu || isNaN(jumlah) || jumlah < 1) {
      orderInfo.textContent = 'Pilih menu dan jumlah dengan benar.';
      orderInfo.style.color = 'red';
      return;
    }

    menuPesanan.push({ menuId, nama: menu.nama, harga: menu.harga, jumlah });
    total += menu.harga * jumlah;
  }

  const orderData = {
    id: generateOrderId(),
    nama,
    noHP,
    pesanan: menuPesanan,
    total,
    waktu: new Date().toISOString()
  };

  // Simpan
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Simpan ke localStorage untuk pembayaran
  localStorage.setItem('lastOrderName', nama);
  localStorage.setItem('lastTotal', total);

  // Tambahkan poin loyalitas
  let points = parseInt(localStorage.getItem('loyaltyPoints')) || 0;
  points += Math.floor(total / 10000);
  localStorage.setItem('loyaltyPoints', points);

  orderInfo.textContent = `Pesanan berhasil disimpan. Total: Rp ${total.toLocaleString('id-ID')}`;
  orderInfo.style.color = 'green';

  renderDaftarPesanan();
  orderForm.reset();
  menuContainer.innerHTML = '';
  menuContainer.appendChild(renderMenuSelect(0));

  // Arahkan ke halaman pembayaran otomatis
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  document.getElementById('sistem-pembayaran').classList.add('active');
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-target="sistem-pembayaran"]').classList.add('active');

  // Isi data pembayaran otomatis jika elemen ada
  const inputName = document.getElementById('paymentName');
  const inputAmount = document.getElementById('paymentAmount');
  if (inputName) inputName.value = nama;
  if (inputAmount) inputAmount.value = total;
});

function renderDaftarPesanan() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  if (orders.length === 0) {
    daftarPesanan.innerHTML = '<p style="text-align:center;">Belum ada pesanan.</p>';
    return;
  }

  daftarPesanan.innerHTML = '<h3>Daftar Pesanan:</h3>';
  orders.slice(-5).reverse().forEach(order => {
    const div = document.createElement('div');
    div.classList.add('order-summary');
    div.innerHTML = `
      <strong>ID: ${order.id}</strong><br>
      Nama: ${order.nama}<br>
      No HP: ${order.noHP}<br>
      Total: Rp ${order.total.toLocaleString('id-ID')}<br>
      Waktu: ${new Date(order.waktu).toLocaleString('id-ID')}<br>
      <ul>
        ${order.pesanan.map(p => `<li>${p.nama} x${p.jumlah} (Rp ${(p.harga * p.jumlah).toLocaleString('id-ID')})</li>`).join('')}
      </ul>
    `;
    daftarPesanan.appendChild(div);
  });
}

renderDaftarPesanan();
