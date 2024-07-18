function* categoryGenerator() {
    yield 'Electronics';
    yield 'Books';
    yield 'Clothing';
    // Add as many categories as you like
}

function* inventoryManager() {
    yield* categoryGenerator('Electronics');
    yield* categoryGenerator('Books');
    yield* categoryGenerator('Clothing');
    // You can imagine how this could be extended to include all categories
}

const manageInventory = inventoryManager();

let done = false;
while (!done) {
    const result = manageInventory.next();
    if (result.done) {
        done = true;
    } else {
        console.log(result.value);
    }
}
