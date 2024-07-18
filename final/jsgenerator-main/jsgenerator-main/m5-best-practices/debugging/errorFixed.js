function* errorProneGenerator() {
    try {
        yield 'All good!';
        throw new Error('Oops!');
    } catch (err) {
        yield `Caught an error: ${err.message}`;
    }
}

const errorGen = errorProneGenerator();
console.log(errorGen.next().value); // 'All good!'
console.log(errorGen.next().value); // 'Caught an error: Oops!'
