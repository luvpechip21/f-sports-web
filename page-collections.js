(async function () {
  const params = new URLSearchParams(location.search);
  const c = params.get('c') || '';
  const q = params.get('q') || '';
  const title = document.getElementById('colTitle');
  const sortSel = document.getElementById('sortSel');
  const mount = document.getElementById('colList');

  let list = [];
  if (q) {
    title.textContent = `Kết quả tìm kiếm: "${q}"`;
    list = await Store.search(q);
  } else {
    title.textContent = c ? `Bộ sưu tập: ${c}` : 'Tất cả sản phẩm';
    list = await Store.byCollection(c);
  }

  function render(arr) {
    mount.innerHTML = arr.map(cardTpl).join('');
  }

  sortSel.onchange = () => {
    let arr = [...list];
    if (sortSel.value === 'priceAsc') arr.sort((a,b)=>a.price-b.price);
    else if (sortSel.value === 'priceDesc') arr.sort((a,b)=>b.price-a.price);
    render(arr);
  };

  render(list);
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
