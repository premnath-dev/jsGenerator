function* errorProneGenerator() {
    yield 'All good!';
    throw new Error('Oops!');
}

const errorGen = errorProneGenerator();
console.log(errorGen.next().value); // 'All good!'
console.log(errorGen.next().value); // Error'
