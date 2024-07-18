function* errorProneGenerator() {
    try {
        yield 'Start Inventory Check';
        throw new Error('Oops, scanner malfunction!');
    } catch (error) {
        yield `Error: ${error.message}`;
    }
    yield 'End inventory check';
}


for (let item of errorProneGenerator()) {
    console.log("item: " + item);
}

