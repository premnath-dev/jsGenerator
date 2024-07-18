function* stockUpdateGenerator() {
    // Assuming updateStock returns a Promise
    yield updateStock('Electronics');
    yield updateStock('Books');
    yield updateStock('Clothing');
}

function updateStock(category) {
    // Simulates an asynchronous stock update
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${category} stock updated`);
            resolve();
        }, 1000);
    });
}

const stockUpdater = stockUpdateGenerator();
stockUpdater.next().value.then(() => {
    stockUpdater.next().value.then(() => {
        stockUpdater.next();
    });
});
