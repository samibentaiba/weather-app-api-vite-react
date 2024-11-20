import React from 'react';
import mitt from 'mitt'; // Import mitt instead of using 'events'

export default class Store extends React.Component {
    constructor(props) {
        super(props);

        // Create an event emitter instance using mitt
        this.eventEmitter = mitt();

        this.state = {
            appName: 'Weather App'
        };
    }

    render() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { ...this.state, eventEmitter: this.eventEmitter });
        });
    }
}
