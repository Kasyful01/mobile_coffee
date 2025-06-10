// js/loyalty.js

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('program-loyalitas');

  if (!section) return;

  section.innerHTML = `
    <h2>Program Loyalitas</h2>
    <p>Kumpulkan poin dari setiap transaksi dan tukarkan dengan diskon menarik!</p>
    <div class="points-display">
      <strong>Total Poin Anda:</strong> <span id="pointTotal">0</span>
    </div>
    <button id="redeemBtn">Tukar 10 Poin (Diskon Rp5.000)</button>
    <p class="info" id="loyaltyInfo"></p>
  `;

  const pointDisplay = document.getElementById('pointTotal');
  const loyaltyInfo = document.getElementById('loyaltyInfo');
  const redeemBtn = document.getElementById('redeemBtn');

  function updatePoints() {
    const points = parseInt(localStorage.getItem('loyaltyPoints')) || 0;
    pointDisplay.textContent = points;
  }

  redeemBtn.addEventListener('click', () => {
    let points = parseInt(localStorage.getItem('loyaltyPoints')) || 0;
    if (points >= 10) {
      points -= 10;
      localStorage.setItem('loyaltyPoints', points);
      localStorage.setItem('voucherDiskon', 5000); // gunakan di pembayaran
      loyaltyInfo.textContent = "Poin berhasil ditukar! Diskon Rp5.000 ditambahkan.";
      loyaltyInfo.style.color = "green";
      updatePoints();
    } else {
      loyaltyInfo.textContent = "Poin Anda belum cukup untuk ditukar.";
      loyaltyInfo.style.color = "red";
    }
  });

  updatePoints();
});
