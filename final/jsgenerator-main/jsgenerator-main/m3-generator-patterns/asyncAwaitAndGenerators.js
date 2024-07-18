async function* productStream() {
    let nextPageUrl = "/api/products?page=1";
    while (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        nextPageUrl = data.nextPageUrl;
        for (const product of data.products) {
            yield product; // Yield each product individually
        }
    }
}

// Usage
(async () => {
    for await (const product of productStream()) {
        displayProduct(product); // Process each product as it comes
    }
})();
