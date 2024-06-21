let displayedCards = null;

function deleteProduct(id) {
    fetch('https://fakestoreapi.com/products/' + id, {
        method: "DELETE"
    })
    .then(res => console.log('Product deleted:', res))
    .catch(err => console.error('Error deleting product:', err));
}

function addCart(event) {
    const id = event.target.parentElement.getAttribute('data-id');
    console.log('Adding to cart:', id);
}

function renderProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        const all_products_container = document.querySelector('.all_products');
        all_products_container.innerHTML = '';

        const limit = displayedCards !== null ? displayedCards : data.length;

        for (let i = 0; i < limit; i++) {
            all_products_container.innerHTML += `
                <div class="all_products_item" data-id="${data[i].id}">
                    <img src="${data[i].image}" alt="Product Image">
                    <h2>Name: ${data[i].title}</h2>
                    <h2>Price: ${data[i].price}</h2>
                    <button class="addCart">Добавить в корзину</button>
                    <button class="deleteBtn" style="border-color:red;color:red;margin-top:10px">Удалить</button>
                </div>
            `;
        }

        document.querySelectorAll('.addCart').forEach(btn => {
            btn.addEventListener('click', addCart);
        });

        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.parentElement.getAttribute('data-id');
                btn.parentElement.remove();
                deleteProduct(id);
            });
        });
    })
    .catch(err => console.error('Error:', err));
}

function sort(target) {
    fetch(`https://fakestoreapi.com/products?sort=${target.value}`)
    .then(res => res.json())
    .then(data => {
        const all_products_container = document.querySelector('.all_products');
        all_products_container.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            all_products_container.innerHTML += `
                <div class="all_products_item" data-id="${data[i].id}">
                    <img src="${data[i].image}" alt="Product Image">
                    <h2>Name: ${data[i].title}</h2>
                    <h2>Price: ${data[i].price}</h2>
                    <button class="addCart">Добавить в корзину</button>
                    <button class="deleteBtn" style="border-color:red;color:red;margin-top:10px">Удалить</button>
                </div>
            `;
        }

        document.querySelectorAll('.addCart').forEach(btn => {
            btn.addEventListener('click', addCart);
        });

        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.parentElement.getAttribute('data-id');
                btn.parentElement.remove();
                deleteProduct(id);
            });
        });
    })
    .catch(err => console.error('Error sorting products:', err));
}

document.querySelector('#sort-select').addEventListener('change', (event) => {
    sort(event.target);
});

function openCart() {
    const cart_wrap = document.querySelector('.cart_wrap');
    if (cart_wrap) {
        cart_wrap.style.display = 'block';
    } else {
        console.error('Cart wrapper not found');
    }
}

document.getElementById('cart').addEventListener('click', openCart);

document.getElementById('close').addEventListener('click', () => {
    const cart_wrap = document.querySelector('.cart_wrap');
    if (cart_wrap) {
        cart_wrap.style.display = 'none';
    } else {
        console.error('Cart wrapper not found');
    }
});

function Limit() {
    const limit = document.getElementById('limit').value;
    const limitNumber = Number(limit);

    if (limitNumber >= 0) {
        displayedCards = limitNumber;
        renderProducts();
    } else {
        alert("Ошибка");
    }
}

document.getElementById('limitButton').addEventListener('click', Limit);

renderProducts();
