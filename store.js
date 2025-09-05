window.Store = (function () {
  let cache = null;

  async function all() {
    if (cache) return cache;
    const res = await fetch('/data/products.json');
    cache = await res.json();
    return cache;
  }

  async function byCollection(c) {
    const data = await all();
    return c ? data.filter(x => (x.collection || '').toLowerCase() === c.toLowerCase()) : data;
  }

  async function byId(id) {
    const data = await all();
    return data.find(x => x.id === id);
  }

  async function search(q) {
    const data = await all();
    if (!q) return data;
    const s = q.trim().toLowerCase();
    return data.filter(p =>
      (p.title || '').toLowerCase().includes(s) ||
      (p.short || '').toLowerCase().includes(s) ||
      (p.collection || '').toLowerCase().includes(s)
    );
  }

  function applyVoucher(basePrice, voucher) {
    if (!voucher) return { final: basePrice, discount: 0 };
    if (voucher.type === 'percent') {
      const discount = Math.round(basePrice * (voucher.value / 100));
      return { final: Math.max(0, basePrice - discount), discount, label: voucher.label };
    }
    if (voucher.type === 'flat') {
      const discount = Math.min(basePrice, voucher.value);
      return { final: Math.max(0, basePrice - discount), discount, label: voucher.label };
    }
    return { final: basePrice, discount: 0 };
  }

  return { all, byCollection, byId, search, applyVoucher };
})();