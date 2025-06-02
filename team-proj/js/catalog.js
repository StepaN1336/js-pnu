const categoriesContainer = document.querySelector('.catalog__categories');
const productsContainer = document.querySelector('.catalog__products');

fetch('json/catalog/categories.json')
  .then(res => res.json())
  .then(categories => {
    categoriesContainer.innerHTML = categories.map(cat => `
      <div class="catalog__category" data-shortname="${cat.shortname}">
        <img src="${cat.image}" alt="${cat.name}" class="catalog__category-image">
        <h3 class="catalog__category-title">${cat.name}</h3>
        <p class="catalog__category-notes">${cat.notes}</p>
      </div>
    `).join('');

    document.querySelectorAll('.catalog__category').forEach(catEl => {
      catEl.addEventListener('click', () => {
        const shortname = catEl.dataset.shortname;
        showProducts(shortname);
      });
    });
  });

function showProducts(shortname) {
  categoriesContainer.classList.add('hidden');
  productsContainer.classList.remove('hidden');

  productsContainer.innerHTML = `<button class="catalog__back-button">← Back</button>`;

  fetch(`json/catalog/${shortname}.json`)
    .then(res => res.json())
    .then(products => {
      productsContainer.innerHTML += `
        <div class="catalog__product-list">
          ${products.map(product => `
            <div class="catalog__product">
              <img src="${product.image}" alt="${product.title}" class="catalog__product-image">
              <h4 class="catalog__product-title">${product.title}</h4>
              <p class="catalog__product-price">$${product.price}</p>
            </div>
          `).join('')}
        </div>
      `;

      document.querySelector('.catalog__back-button').addEventListener('click', () => {
        productsContainer.classList.add('hidden');
        categoriesContainer.classList.remove('hidden');
        productsContainer.innerHTML = '';
      });
    });
}
