function* inventoryGenerator() {
    yield 'Smartphone';
    yield 'Tablet';
    yield 'Laptop';
}

const inventoryGen = inventoryGenerator();

let done = false;

while(!done) {
    const result = inventoryGen.next();
    if(result.done) {
        done = true;
    } else {
        console.log(result.value);
    }
}