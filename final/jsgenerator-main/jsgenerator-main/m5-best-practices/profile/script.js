function* largeDataSetGenerator(size) {
    for (let i = 0; i < size; i++) {
        yield i;
    }
}

function processItem(item) {
    // Simulate some processing
    console.log(item);
    return item ** item;
}

function onClickButton() {
    const dataSetGen = largeDataSetGenerator(1000000);

    console.time('Generator Performance');
    let sum = 0;
    
    for (let num of dataSetGen) {
        sum += processItem(num);
    }
    console.timeEnd('Generator Performance');
}

