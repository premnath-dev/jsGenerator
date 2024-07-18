function* inventoryGenerator() {
    yield 'Smartphone';
    yield 'Tablet';
    yield 'Laptop';
}


const inventory = inventoryGenerator();
console.log(inventory.next().value); // Smartphone
console.log(inventory.next().value); // Tablet
console.log(inventory.next().value); // Laptop

for (const item of inventoryGenerator()) {
    console.log(item);
}

// Outputs: Smartphone, Tablet, Laptop
const allItems = [...inventoryGenerator()];
console.log(allItems); // Outputs: ['Smartphone', 'Tablet', 'Laptop']