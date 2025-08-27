let products = [];
let currentPage = 1;
const pageSize = 12;

const fetchData = async () => {
    const data = await fetch("https://fakestoreapi.in/api/products");
    const res = await data.json();
    products = res.products || res; // fallback if API returns array
    renderPage(currentPage);
    renderPagination();
};

function renderPage(page) {
    const container = document.getElementById('product-container');
    container.className = "flex flex-wrap gap-10 gap-y-50 justify-center my-10";
    container.innerHTML = '';

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageProducts = products.slice(start, end);

    pageProducts.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg p-6 flex flex-col items-center max-w-xs transition-transform hover:scale-105 cursor-pointer h-110 relative';
        card.innerHTML = `
            <img src="${item.image || (item.images && item.images[0])}" alt="${item.title}" class="w-40 h-40 object-contain mb-10 rounded" />
            <h2 class="text-lg font-semibold text-[#346779] mb-2 text-center line-clamp-2">${item.title}</h2>
            <p class="text-gray-600 text-sm mb-2 text-center line-clamp-2 ">${item.description.substring(0, 80)}...</p>
                <span class="text-[#1976d2] font-bold text-2xl mt-2 absolute bottom-10 left-10">$${item.price}</span>
                <button class="bg-[#346779] text-white px-5 py-3 rounded-xl absolute bottom-8 right-10 cursor-pointer">Add to cart</button>
        `;
        card.onclick = () => {
            // Save product data to localStorage and go to detail page
            localStorage.setItem('selectedProduct', JSON.stringify(item));
            window.location.href = './product-detail.html';
        };
        container.appendChild(card);
    });
}

function renderPagination() {
    let pagination = document.getElementById('pagination');
    if (!pagination) {
        pagination = document.createElement('div');
        pagination.id = 'pagination';
        pagination.className = 'flex justify-center gap-2 my-8';
        document.querySelector('main').appendChild(pagination);
    }
    pagination.innerHTML = '';
    const totalPages = Math.ceil(products.length / pageSize);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-3 py-1 rounded ${i === currentPage ? 'bg-[#346779] text-white' : 'bg-gray-200 text-[#346779]'} hover:bg-[#1976d2] hover:text-white transition`;
        btn.onclick = () => {
            currentPage = i;
            renderPage(currentPage);
            renderPagination();
        };
        pagination.appendChild(btn);
    }
}

fetchData();