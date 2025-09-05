(async function () {
  const el = document.getElementById('productView');
  if (!el) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = await Store.byId(id);
  if (!p) { el.innerHTML = '<p>Không tìm thấy sản phẩm.</p>'; return; }

  window.Pixel?.viewContent(p);

  const vOpts = (p.variants || []).map(v =>
    `<option value="${v.id}">${v.label}</option>`
  ).join('');

  const priceFmt = (n)=> n.toLocaleString('vi-VN') + 'đ';
  const applied = Store.applyVoucher(p.price, p.voucher || null);

  el.innerHTML = `
    <div class="pv">
      <div class="pv-media"><img src="${p.image}" alt="${p.title}"></div>
      <div class="pv-info">
        <h1>${p.title}</h1>

        <div class="price">
          <strong>${priceFmt(applied.final)}</strong>
          ${applied.final !== p.price ? `<span class="op">${priceFmt(p.price)}</span>` : ''}
        </div>
        ${applied.final !== p.price && (p.voucher?.label) ? `<div style="margin:6px 0;color:#d00;font-weight:600;">${p.voucher.label}</div>` : ''}

        ${vOpts ? `
          <label>Phân loại</label>
          <select id="variantSel">${vOpts}</select>
        ` : ''}

        <div class="qty">
          <button id="qDec">−</button>
          <input id="qVal" type="number" value="1" min="1" />
          <button id="qInc">+</button>
        </div>

        <button id="btnAdd" class="btn-primary">Thêm vào giỏ</button>
      </div>
    </div>
    <p class="short">${p.short || ''}</p>
  `;

  const qVal = document.getElementById('qVal');
  document.getElementById('qDec').onclick = () => qVal.value = Math.max(1, (qVal.value|0)-1);
  document.getElementById('qInc').onclick = () => qVal.value = (qVal.value|0)+1;

  document.getElementById('btnAdd').onclick = () => {
    const vid = document.getElementById('variantSel')?.value || null;
    const vlabel = (p.variants || []).find(v => v.id === vid)?.label || '';
    const appliedNow = Store.applyVoucher(p.price, p.voucher || null);
    const item = {
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      variantId: vid,
      variantLabel: vlabel,
      qty: (qVal.value|0),
      finalUnitPrice: appliedNow.final,
      voucherLabel: appliedNow.label || (p.voucher?.label || '')
    };
    Cart.add(item);
    document.getElementById('cartButton').click();
  };
})();