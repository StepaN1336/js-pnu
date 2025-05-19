document.getElementById('home').addEventListener('click', () => {
    document.getElementById('content').innerHTML = `<h1>Welcome to the Shop!</h1>`;
});

document.getElementById('load-catalog').addEventListener('click', loadCategories);

function loadCategories() {
    fetch('data/categories.json')
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = `<h2>Catalog Categories</h2>`;

            const wrapper = document.createElement('div');
            wrapper.className = 'categories';

            data.forEach(category => {
                const link = document.createElement('div');
                link.className = 'category-link';
                link.textContent = category.name;
                link.onclick = () => loadCategory(category.shortname);
                wrapper.appendChild(link);
            });

            const specialLink = document.createElement('div');
            specialLink.className = 'category-link';
            specialLink.textContent = 'Specials';
            specialLink.onclick = () => {
                const random = data[Math.floor(Math.random() * data.length)];
                loadCategory(random.shortname);
            };
            wrapper.appendChild(specialLink);

            content.appendChild(wrapper);
        });
}

function loadCategory(shortname) {
    fetch(`data/${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = `<h2>${data.category}</h2>`;

            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'items';

            data.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
          <img src="https://place-hold.it/200x200?text=${item.shortname}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">${item.price}</p>
        `;
                itemsContainer.appendChild(card);
            });

            content.appendChild(itemsContainer);
        });
}
