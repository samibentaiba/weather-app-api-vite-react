import React from 'react';

import './style.scss';
import Forecastday from './forecastday';


export default class BottomSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { forecastdays, time } = this.props;

        return (
            <div className="bottom-container">
                <header>Weather Forecast for 4 days:</header>
                <div className="inner-container">
                    {forecastdays &&
                        forecastdays.map((day, idx) => {
                        return <Forecastday day={day.day} date={day.date} key={idx} />
                    })}
                </div>
                <footer>&copy; Sobhan Niroula. 2019. ||  Weather last updated on: {time} local time.</footer>
            </div>
        );
    }
}