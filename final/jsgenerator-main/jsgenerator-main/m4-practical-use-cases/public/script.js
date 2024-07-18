let isFetching = false;

window.onload = () => {
    const pageSize = 25; // Number of products to fetch per page
    const productGen = productGenerator(pageSize);
    const scrollHandler = () => handleScroll(productGen);

    window.addEventListener('scroll', scrollHandler);
    loadMoreProducts(productGen, scrollHandler);
};

async function loadMoreProducts(productGen, scrollHandler) {
    if (isFetching) return;

    isFetching = true;
    document.getElementById('loading').style.display = 'block'; // Show loading spinner

    try {
        const products = await productGen.next();
        document.getElementById('loading').style.display = 'none'; // Hide loading spinner

        if (products.done) {
            document.getElementById('end-of-products').style.display = 'block'; // Show end-of-products message
            window.removeEventListener('scroll', scrollHandler); // Stop listening if no more data
        } else {
            renderProducts(products.value);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        isFetching = false;
    }
}

function handleScroll(productGen) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreProducts(productGen);
    }
}


function renderProducts(products) {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.textContent = `Name: ${product.name} - Price: $${product.price}`;
        container.appendChild(div);
    });
}

async function* productGenerator(pageSize) {
    let pageNumber = 1;
    let hasMore = true;

    while (hasMore) {
        const response = await fetch(`/api/products?page=${pageNumber}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const products = await response.json();

        if (products.length === 0) {
            hasMore = false;
        } else {
            yield products;
            pageNumber++;
        }
    }
}
