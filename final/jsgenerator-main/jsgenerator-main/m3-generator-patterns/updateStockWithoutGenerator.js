function updateStock(category) {
    // Simulates an asynchronous stock update
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${category} stock updated`);
            resolve();
        }, 1000);
    });
}

// Function to perform stock updates sequentially without using a generator
function stockUpdateSequence() {
    updateStock('Electronics')
        .then(() => updateStock('Books'))
        .then(() => updateStock('Clothing'));
}

// Invoke the function to perform the stock updates
stockUpdateSequence();
