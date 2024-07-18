
function* inventoryGenerator() {
    yield 'Smartphone';
    yield 'Tablet';
    return 'Laptop';
}

const inventory = inventoryGenerator();

console.log(inventory.next()); 
console.log(inventory.next()); 
console.log(inventory.next()); 
console.log(inventory.next()); 

