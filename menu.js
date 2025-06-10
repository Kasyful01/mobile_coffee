const menuItems = [
  
  {
    id: 'kopi1',
    nama: 'Espresso Classic',
    deskripsi: 'Kopi hitam pekat dengan rasa kuat dan aroma khas.',
    harga: 15000,
    gambar: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    totalUlasan: 120
  },
  {
    id: 'kopi2',
    nama: 'Cappuccino',
    deskripsi: 'Perpaduan espresso, susu panas, dan busa susu lembut.',
    harga: 25000,
    gambar: 'https://images.unsplash.com/photo-1605478370891-2896618ef735?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    totalUlasan: 87
  },
  {
    id: 'kopi3',
    nama: 'Latte',
    deskripsi: 'Espresso yang creamy dengan lebih banyak susu.',
    harga: 23000,
    gambar: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    totalUlasan: 94
  },
  {
    id: 'kopi4',
    nama: 'Americano',
    deskripsi: 'Espresso dengan tambahan air panas. Ringan dan segar.',
    harga: 18000,
    gambar: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    rating: 4.3,
    totalUlasan: 60
  },
  {
    id: 'kopi5',
    nama: 'Mocha',
    deskripsi: 'Perpaduan antara kopi espresso, cokelat, dan susu.',
    harga: 27000,
    gambar: 'https://images.unsplash.com/photo-1625398582070-8949eab0b62f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    totalUlasan: 140
  },
  {
    id: 'kopi6',
    nama: 'Flat White',
    deskripsi: 'Espresso dengan susu microfoam, lebih creamy dari cappuccino.',
    harga: 26000,
    gambar: 'https://images.unsplash.com/photo-1598515213704-1df01c620fd6?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    totalUlasan: 75
  },
  {
    id: 'kopi7',
    nama: 'Affogato',
    deskripsi: 'Kopi espresso panas yang disiramkan ke atas es krim vanilla.',
    harga: 28000,
    gambar: 'https://images.unsplash.com/photo-1612197528440-7a4a29d4c502?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    totalUlasan: 105
  },
  {
    id: 'kopi8',
    nama: 'Cold Brew',
    deskripsi: 'Kopi diseduh dingin selama 12 jam untuk rasa lebih halus.',
    harga: 24000,
    gambar: 'https://images.unsplash.com/photo-1527161153332-99adcc6f2966?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    totalUlasan: 98
  }
];


function renderMenuList() {
  const daftarMenuSection = document.getElementById('daftar-menu');
  daftarMenuSection.innerHTML = `
    <h2>Daftar Menu Kopi</h2>
    <div class="filter-box">
      <label for="filterRating">Urutkan:</label>
      <select id="filterRating">
        <option value="default">-- Default --</option>
        <option value="ratingDesc">Rating Tertinggi</option>
        <option value="ratingAsc">Rating Terendah</option>
      </select>
    </div>
    <div id="menu-list"></div>
  `;

  const menuListContainer = document.getElementById('menu-list');

  function displayMenu(items) {
    menuListContainer.innerHTML = '';
    items.forEach(item => {
      const fullStars = Math.floor(item.rating);
      const halfStar = item.rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;

      const card = document.createElement('div');
      card.className = 'menu-item';
      card.innerHTML = `
        <img src="${item.gambar}" alt="${item.nama}" />
        <div>
          <div class="nama">${item.nama}</div>
          <div class="deskripsi">${item.deskripsi}</div>
          <div class="harga">Rp ${item.harga.toLocaleString('id-ID')}</div>
          <div class="rating">
            <span class="stars">
              ${'★'.repeat(fullStars)}${halfStar ? '⯪' : ''}${'☆'.repeat(emptyStars)}
            </span>
            <small>(${item.totalUlasan} ulasan)</small>
          </div>
        </div>
      `;
      menuListContainer.appendChild(card);
    });
  }

  displayMenu(menuItems);

  document.getElementById('filterRating').addEventListener('change', function () {
    const val = this.value;
    let sortedItems = [...menuItems];
    if (val === 'ratingDesc') {
      sortedItems.sort((a, b) => b.rating - a.rating);
    } else if (val === 'ratingAsc') {
      sortedItems.sort((a, b) => a.rating - b.rating);
    }
    displayMenu(sortedItems);
  });
}

renderMenuList();
