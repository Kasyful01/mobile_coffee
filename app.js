// js/app.js
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Hapus 'active' dari semua tombol dan section
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('main section').forEach(section => section.classList.remove('active'));

    // Tambahkan 'active' ke tombol yang diklik dan section yang sesuai
    button.classList.add('active');
    const targetId = button.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});
