(function () {
  const btn = document.getElementById('cartButton');
  const cnt = document.getElementById('cartCount');
  const mini = document.getElementById('miniCart');
  const closeBtn = document.getElementById('miniCartClose');
  const list = document.getElementById('miniCartItems');
  const subEl = document.getElementById('miniCartSubtotal');

  function line(i) {
    const hasVoucher = (i.finalUnitPrice || i.price) !== i.price;
    return `
      <div class="mini-item">
        <img src="${i.image}" alt="${i.title}">
        <div class="meta">
          <div class="t">${i.title}</div>
          <div class="s">${i.variantLabel || ''}</div>
          ${hasVoucher ? `<div class="v">${i.voucherLabel || 'Voucher áp dụng'}</div>` : ''}
          <div class="q">
            <button onclick="Cart.dec('${i.key}')">−</button>
            <span>${i.qty}</span>
            <button onclick="Cart.inc('${i.key}')">+</button>
            <button class="link" onclick="Cart.remove('${i.key}')">Xóa</button>
          </div>
        </div>
        <div class="p">
          ${hasVoucher ? `
            <div style="text-decoration:line-through;color:#888;">${Cart.format(i.price * i.qty)}</div>
            <div><strong>${Cart.format((i.finalUnitPrice || i.price) * i.qty)}</strong></div>
          ` : `<div><strong>${Cart.format(i.price * i.qty)}</strong></div>`}
        </div>
      </div>
    `;
  }

  function render() {
    const st = Cart.get();
    cnt.textContent = Cart.count();
    list.innerHTML = (st.items||[]).map(line).join('');
    subEl.textContent = Cart.format(Cart.subtotal());
  }

  if (btn) btn.onclick = () => { render(); mini.hidden = false; };
  if (closeBtn) closeBtn.onclick = () => (mini.hidden = true);
  document.addEventListener('cart:update', render);
  render();
})();