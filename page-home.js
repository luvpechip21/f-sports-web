(async function () {
  const mount = document.getElementById('homeFeatured');
  if (!mount) return;
  const all = await Store.all();
  const featured = all.slice(0, 8);
  mount.innerHTML = featured.map(cardTpl).join('');
})();

function cardTpl(p) {
  return `
    <a class="card" href="/product.html?id=${encodeURIComponent(p.id)}">
      <img src="${p.image}" alt="${p.title}">
      <div class="info">
        <h3 class="t">${p.title}</h3>
        <div class="price">
          <strong>${(p.price).toLocaleString('vi-VN')}đ</strong>
          ${p.originalPrice ? `<span class="op">${p.originalPrice.toLocaleString('vi-VN')}đ</span>` : ''}
        </div>
      </div>
    </a>
  `;
}
