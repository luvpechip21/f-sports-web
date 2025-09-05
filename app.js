// Search input -> enter to collections?q=
(function () {
  const input = document.getElementById('siteSearch');
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      const url = q ? `/collections.html?q=${encodeURIComponent(q)}` : '/collections.html';
      location.href = url;
    }
  });
})();

// Pixel helpers
window.Pixel = {
  viewContent(product) {
    try {
      fbq('track', 'ViewContent', {
        content_ids: [product.id],
        content_name: product.title,
        content_type: 'product',
        value: product.price,
        currency: 'VND'
      });
    } catch (e) {}
  },
  addToCart(item) {
    try {
      fbq('track', 'AddToCart', {
        content_ids: [item.id],
        content_name: item.title,
        content_type: 'product',
        value: item.finalUnitPrice || item.price,
        currency: 'VND',
        num_items: item.qty || 1
      });
    } catch (e) {}
  },
  purchase(total) {
    try {
      fbq('track', 'Purchase', { value: total, currency: 'VND' });
    } catch (e) {}
  }
};
