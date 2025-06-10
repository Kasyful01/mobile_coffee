const reviewSection = document.getElementById('ulasan-rating');
if (reviewSection) {
  reviewSection.innerHTML = `
    <h2>Ulasan dan Rating Pelanggan</h2>
    <form id="reviewForm">
      <label for="reviewName">Nama</label>
      <input type="text" id="reviewName" placeholder="Masukkan nama Anda" required />

      <label for="reviewMenu">Menu yang Dinilai</label>
      <select id="reviewMenu" required>
        <option value="">-- Pilih menu --</option>
      </select>

      <label for="reviewRating">Rating</label>
      <select id="reviewRating" required>
        <option value="">-- Pilih rating --</option>
        <option value="5">★★★★★ - Sangat Bagus</option>
        <option value="4">★★★★ - Bagus</option>
        <option value="3">★★★ - Cukup</option>
        <option value="2">★★ - Kurang</option>
        <option value="1">★ - Buruk</option>
      </select>

      <label for="reviewText">Ulasan</label>
      <textarea id="reviewText" placeholder="Tulis ulasan Anda di sini..." required></textarea>
      
      <button type="submit">Kirim Ulasan</button>
    </form>

    <div class="reviews-list" id="reviewsList"></div>
  `;

  const reviewForm = document.getElementById('reviewForm');
  const reviewMenuSelect = document.getElementById('reviewMenu');
  const reviewsList = document.getElementById('reviewsList');

  // Isi menu kopi di form ulasan
  menuItems.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.nama;
    reviewMenuSelect.appendChild(opt);
  });

  function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviewsList.innerHTML = '';

    if (reviews.length === 0) {
      reviewsList.innerHTML = '<p style="text-align:center; color:#666;">Belum ada ulasan pelanggan.</p>';
      return;
    }

    reviews.forEach(r => {
      const menu = menuItems.find(item => item.id === r.menuId);
      const div = document.createElement('div');
      div.className = 'review-item';
      div.innerHTML = `
        <div class="review-rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <div><strong>${r.name}</strong> menilai <em>${menu ? menu.nama : r.menuId}</em>:</div>
        <div class="review-text">${r.text}</div>
      `;
      reviewsList.appendChild(div);
    });
  }

  reviewForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const menuId = document.getElementById('reviewMenu').value;
    const rating = parseInt(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !menuId || !rating || !text) {
      alert('Harap lengkapi semua kolom ulasan.');
      return;
    }

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.unshift({
      name,
      menuId,
      rating,
      text,
      waktu: new Date().toISOString()
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));

    reviewForm.reset();
    loadReviews();
    alert('Terima kasih atas ulasan Anda!');
  });

  loadReviews();
}
