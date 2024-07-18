function* inventoryGenerator() {
    yield 'Smartphone';
    yield 'Tablet';
    return 'Laptop';
}

const generator1 = inventoryGenerator();
const endWithResult = generator1.return(12);
console.log(endWithResult);
console.log(generator1.next());

const generator2 = inventoryGenerator();
try {
    generator2.throw("Oops");
} catch (error) {
    console.log('Message:', error);
    console.log(generator2.next());
}
