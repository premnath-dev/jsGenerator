function* regularOrderGenerator() {
    yield 'Order #1001';
    yield 'Order #1002';
}

function* expressOrderGenerator() {
    yield 'Order #1003';
    yield 'Order #1004';
}

function* orderProcessingGenerator() {
    yield* regularOrderGenerator();
    yield* expressOrderGenerator();
}


const orderProcessing = orderProcessingGenerator();


console.log(orderProcessing.next().value); // Order #1001 - regular
console.log(orderProcessing.next().value); // Order #1002 - regular
console.log(orderProcessing.next().value); // Order #1003 - express
console.log(orderProcessing.next().value); // Order #1004 - express