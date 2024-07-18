function checkInventory(orderId) {
    console.log(`Checking inventory for order ${orderId}`);
    // Simulate async operation
    return Promise.resolve();
}

function processPayment(orderId) {
    console.log(`Processing payment for order ${orderId}`);
    // Simulate async operation
    return Promise.resolve();
}

function updateOrderStatus(orderId, status) {
    console.log(`Updating order ${orderId} to status '${status}'`);
    // Simulate async operation
    return Promise.resolve();
}

function orderProcessingSequence(orderId) {
    checkInventory(orderId)
        .then(() => processPayment(orderId))
        .then(() => updateOrderStatus(orderId, 'completed'))
        .catch(err => console.error(err)); // Error handling for the whole sequence
}

// Execute the sequence for a given order ID
orderProcessingSequence(123);
