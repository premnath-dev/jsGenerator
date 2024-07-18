class Mediator {
    constructor() {
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
        component.setMediator(this);
    }

    *communicate(initiator) {
        for (const component of this.components) {
            if (component !== initiator) {
                yield component.receive();
            }
        }
    }
}

class Component {
    constructor(name) {
        this.name = name;
        this.mediator = null;
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    send() {
        console.log(`${this.name} sends a message`);
        const communicationGenerator = this.mediator.communicate(this);
        for (let msg of communicationGenerator) {
            // Process each communication
        }
    }

    receive() {
        console.log(`${this.name} received a message`);
    }
}

// Usage
const mediator = new Mediator();
const component1 = new Component("Component 1");
const component2 = new Component("Component 2");

mediator.addComponent(component1);
mediator.addComponent(component2);

component1.send();
