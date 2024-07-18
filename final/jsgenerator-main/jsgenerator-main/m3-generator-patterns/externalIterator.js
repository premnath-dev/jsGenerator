function* orderProcessingGenerator(orderId) {
    yield checkInventory(orderId);
    yield processPayment(orderId);
    yield updateOrderStatus(orderId, 'completed');
}

function handleGenerator(gen) {
    const iterator = gen();
    function step(value) {
        const result = iterator.next(value);
        if (!result.done) {
            result.value.then(step).catch(err => console.error(err));
        }
    }
    step();
}

// Sample async functions used in the generator
function checkInventory(orderId) {
    console.log(`Checking inventory for order ${orderId}`);
    return Promise.resolve(); // Simulate async operation
}

function processPayment(orderId) {
    console.log(`Processing payment for order ${orderId}`);
    return Promise.resolve(); // Simulate async operation
}

function updateOrderStatus(orderId, status) {
    console.log(`Updating order ${orderId} to status '${status}'`);
    return Promise.resolve(); // Simulate async operation
}

handleGenerator(() => orderProcessingGenerator(123));
