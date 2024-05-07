
// filter.js
function filterProducts(filterValue) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
      const price = parseFloat(product.querySelector('.price').textContent.replace('€', ''));
      if (filterValue === 'default' || (filterValue === 'asc' && price >= minPrice && price <= maxPrice) || (filterValue === 'desc' && price >= maxPrice && price <= minPrice)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }
  
  const priceFilter = document.getElementById('price-filter');
  priceFilter.addEventListener('change', (event) => {
    filterProducts(event.target.value);
  });