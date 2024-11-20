import React from 'react';

import './style.scss';


export default class Forecastday extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { day, date } = this.props;

        if (!day) return null;

        return(
            <div className="forecastday-container">
                
                    <div className="local-container">
                        <div className="forecast-date">{date}</div>
                        <div className="image">
                            <img src={day.condition.icon} alt="forecast" />
                        </div>
                        <div className="text">{day.maxtemp_c}&deg;C</div>
                        <div className="muted-text">{day.condition.text}</div>
                    </div>
                    
                
            </div>
        );
    }
}