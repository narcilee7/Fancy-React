import { Component, createElement, Fragment } from "../../packages/core/src";
import { createRoot } from "../../packages/dom/src";

function Greeting({ name }: { name: string }) {
    return createElement('h1', {
        style: {
            color: 'blue',
            textAlign: 'center',
            fontSize: '24px',
        }
    }, `Hello, ${name}!`);
}

function IncrementButton() {
    return createElement('button', {
        onClick: () => {
            console.log('Button clicked');
        },
    }, 'Increment');
}

function CounterHeader({ count }: { count: number }) {
    return createElement('h2', null, `Count: ${count}`);
}

function Counter() {
    let count = 0;

    const increment = () => {
        count++;
        console.log('Count:', count);
    }

    // return createElement('div', {
    const button = createElement('button', {
        onClick: increment,
        style: {
            padding: '10px 20px',
            fontSize: '16px',
        },
    }, 'Increment');

    const h2 = createElement(CounterHeader, { count });

    return createElement('div', {
        style: {
            textAlign: 'center',
        }
    }, [h2, button]);
}

class Counter2 extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1,
        });
    }

    render() {
        return createElement('div', {
            style: {
                textAlign: 'center',
            }
        }, [createElement(CounterHeader, { count: this.state.count }), createElement(IncrementButton, {
            onClick: this.increment,
        })]);
    }
}

function App() {
    return createElement(Fragment, null, [
        createElement(Greeting, { name: 'Fancy-React' }),
        createElement(Counter, null),
        createElement(Counter2, null),
    ]);
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(createElement(App, null));
}
