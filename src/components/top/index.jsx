import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';

import './style.scss';
import Weather from './weather';


export default class TopSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelectLocationOpen: false
        };

        this.onToggleSelectLocation = this.onToggleSelectLocation.bind(this);
        this.onSelectCity = this.onSelectCity.bind(this);
        this.onLocationNameChange = this.onLocationNameChange.bind(this);
    }

    onToggleSelectLocation() {
        this.setState((prevState) => ({ isSelectLocationOpen: !prevState.isSelectLocationOpen }));
    }

    onLocationNameChange(e) {
        this.setState({
            locationName: e.target.value
        });
    }

    onSelectCity() {
        const { locationName } = this.state;
        const { eventEmitter } = this.props;

        eventEmitter.emit('updateWeather', locationName);

        this.setState({
            isSelectLocationOpen: false
        });
    }


    render() {
        const { isSelectLocationOpen } = this.state;

        return (
            <div className="top-container">
                <div className="title">Weather App</div>

                <Weather {...this.props} />

                {/* React Popper */}
                <Manager>
                    <Reference>
                        {({ ref }) => (
                            <button 
                                className="btn btn-select-location" 
                                ref={ref}
                                onClick={this.onToggleSelectLocation}
                                >
                                Select Location
                            </button>
                        )}
                    </Reference>
                    <Popper placement="top">
                        {({ ref, style, placement, arrowProps }) => ( isSelectLocationOpen &&
                            <div 
                            className="popup-container" 
                            ref={ref} 
                            style={style} 
                            data-placement={placement}>
                                <div className="form-container">
                                    <label htmlFor="location-name">Location Name</label>
                                    <input 
                                        id="location-name" 
                                        type="text" 
                                        placeholder="City Name"
                                        onChange={this.onLocationNameChange}
                                    />
                                    <button 
                                        className="btn btn-ok"
                                        onClick={this.onSelectCity}
                                        >Select</button>
                                </div>
                                <div ref={arrowProps.ref} style={arrowProps.style} />
                            </div>
                        )}
                    </Popper>
                </Manager>
            </div>
        );
    }
}