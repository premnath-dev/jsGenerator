class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    *notify() {
        for (const observer of this.observers) {
            yield observer.update();
        }
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update() {
        console.log(`${this.name} is notified.`);
    }
}

// Usage
const subject = new Subject();
subject.addObserver(new Observer("Observer 1"));
subject.addObserver(new Observer("Observer 2"));

const notificationGenerator = subject.notify();

for (let notification of notificationGenerator) {
    // Process each notification
}
