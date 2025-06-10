""// js/payment.js

const pembayaranSection = document.getElementById('sistem-pembayaran');

pembayaranSection.innerHTML = `
  <h2>Sistem Pembayaran</h2>
  <form id="paymentForm">
    <label for="paymentName">Nama Pemesan</label>
    <input type="text" id="paymentName" placeholder="Masukkan nama Anda" required />

    <label for="paymentMethod">Metode Pembayaran</label>
    <select id="paymentMethod" required>
      <option value="">-- Pilih metode --</option>
      <option value="cash">Tunai</option>
      <option value="transfer">Transfer Bank</option>
      <option value="ovo">OVO</option>
      <option value="gopay">GoPay</option>
      <option value="dana">Dana</option>
    </select>

    <label for="paymentAmount">Total Pembayaran</label>
    <input type="text" id="paymentAmount" readonly />

    <button type="submit">Bayar Sekarang</button>
  </form>
  <p class="info" id="paymentInfo"></p>
`;

const paymentForm = document.getElementById('paymentForm');
const paymentInfo = document.getElementById('paymentInfo');
const amountInput = document.getElementById('paymentAmount');

// Ambil total order terakhir dari localStorage dan tampilkan
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let lastOrder = orders[orders.length - 1];

let totalPembayaran = lastOrder ? lastOrder.total : 0;

// Cek apakah ada diskon dari poin
let availableDiscount = parseInt(localStorage.getItem('discountAmount')) || 0;
if (availableDiscount > 0) {
  totalPembayaran -= availableDiscount;
  if (totalPembayaran < 0) totalPembayaran = 0;
  localStorage.removeItem('discountAmount');
}

amountInput.value = `Rp ${totalPembayaran.toLocaleString('id-ID')}`;

paymentForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('paymentName').value.trim();
  const method = document.getElementById('paymentMethod').value;

  if (!name || !method) {
    paymentInfo.textContent = 'Mohon lengkapi semua data pembayaran.';
    paymentInfo.style.color = 'red';
    return;
  }

  paymentInfo.textContent = `Pembayaran berhasil sebesar Rp ${totalPembayaran.toLocaleString('id-ID')} menggunakan ${method.toUpperCase()}. Terima kasih, ${name}!`;
  paymentInfo.style.color = 'green';

  paymentForm.reset();
  amountInput.value = '';
});
