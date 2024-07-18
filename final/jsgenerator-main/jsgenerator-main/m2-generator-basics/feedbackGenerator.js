function* feedbackGenerator() {
    const feedback1 = yield 'How was your experience?';
    console.log(`Feedback received: ${feedback1}`);
    const feedback2 = yield 'Any improvement suggestions?';
    console.log(`Feedback received: ${feedback2}`);
}
const feedback = feedbackGenerator();

// Outputs: How was your experience?
console.log(feedback.next().value); 

// Outputs: Any improvement suggestions? and logs 'Feedback received: Great!'
console.log(feedback.next('Great!').value); 

// Logs 'Feedback received: More tutorials.'
console.log(feedback.next('More tutorials.').value); 
