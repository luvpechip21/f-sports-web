// window.Cart
(function () {
  const KEY = 'fs_cart_v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || { items: [] }; } catch { return { items: [] }; } }
  function save(state) { localStorage.setItem(KEY, JSON.stringify(state)); }

  const api = {
    get() { return load(); },
    clear() { save({ items: [] }); api.emit(); },
    format(n) { return (n || 0).toLocaleString('vi-VN') + 'đ'; },
    emit() { document.dispatchEvent(new CustomEvent('cart:update')); },

    add(data) {
      const st = load();
      const key = `${data.id}::${data.variantId || 'default'}`;
      const found = st.items.find(x => x.key === key);
      if (found) found.qty += (data.qty || 1);
      else st.items.push({ key, ...data, qty: data.qty || 1 });
      save(st); api.emit();
      try { window.Pixel?.addToCart(data); } catch(e){}
    },

    remove(key) {
      const st = load();
      st.items = st.items.filter(x => x.key !== key);
      save(st); api.emit();
    },

    inc(key) {
      const st = load();
      const it = st.items.find(x => x.key === key);
      if (it) it.qty++;
      save(st); api.emit();
    },

    dec(key) {
      const st = load();
      const it = st.items.find(x => x.key === key);
      if (it && it.qty > 1) it.qty--; else api.remove(key);
      save(st); api.emit();
    },

    count() { return load().items.reduce((t, i) => t + i.qty, 0); },
    subtotalBeforeVoucher() { return load().items.reduce((t, i) => t + (i.price * i.qty), 0); },
    totalDiscount() { return load().items.reduce((t,i)=> t + ((i.price - (i.finalUnitPrice || i.price)) * i.qty), 0); },
    subtotal() { return load().items.reduce((t, i) => t + ((i.finalUnitPrice || i.price) * i.qty), 0); }
  };

  window.Cart = api;
})();