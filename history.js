// js/history.js

const historySection = document.getElementById('riwayat-transaksi');

function renderTransactionHistory() {
  if (!historySection) return;

  const historyData = JSON.parse(localStorage.getItem('transactionHistory')) || [];

  historySection.innerHTML = `
    <h2>Riwayat Transaksi</h2>
    ${historyData.length === 0 ? '<p style="text-align:center">Belum ada transaksi.</p>' : ''}
    <ul class="history-list">
      ${historyData.map(tx => `
        <li class="history-item">
          <strong>${tx.nama}</strong> (${tx.metode.toUpperCase()})<br>
          Total: Rp ${tx.jumlah.toLocaleString('id-ID')}<br>
          Waktu: ${new Date(tx.waktu).toLocaleString('id-ID')}
        </li>
      `).join('')}
    </ul>
  `;
}

function simpanKeRiwayat({ nama, jumlah, metode }) {
  const history = JSON.parse(localStorage.getItem('transactionHistory')) || [];
  history.unshift({ nama, jumlah, metode, waktu: new Date().toISOString() });
  localStorage.setItem('transactionHistory', JSON.stringify(history));
  renderTransactionHistory();
}

// Call on load if section exists
document.addEventListener('DOMContentLoaded', renderTransactionHistory);
