import React, { Component } from "react";

class Home extends Component {
    clockInterval = "";
    constructor() {
        super();
        this.state = {
            time: new Date(),
            hours: "",
            minutes: "",
            seconds: "",
        };
        this.handleDate = this.handleDate.bind(this);
    }

    componentDidMount() {
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1000);
        this.clockInterval = setInterval(this.handleDate, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.update);
        clearInterval(this.clockInterval);
    }

    handleDate() {
        const date = new Date();
        date.setHours(date.getHours());
        let hours = this.formatTime(date.getHours());
        let minutes = this.formatTime(date.getMinutes());
        let seconds = this.formatTime(date.getSeconds());
        this.setState({ hours, minutes, seconds });
    }

    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    render() {
        // Digital Clock
        const time = this.state.time;
        let hr = time.getHours();
        const min = `0${time.getMinutes()}`.slice(-2);
        const sec = `0${time.getSeconds()}`.slice(-2);
        const ampm = hr >= 12 ? "PM" : "AM";
        hr = hr > 12 ? hr % 12 : hr;
        hr = `0${hr}`.slice(-2);
        const digiClock = `${hr} : ${min} : ${sec} ${ampm}`;

        // Analog Clock
        const { hours, minutes, seconds } = this.state;
        const secondsStyle = {
            transform: `rotate(${seconds * 6}deg)`,
        };
        const minutesStyle = {
            transform: `rotate(${minutes * 6}deg)`,
        };
        const hoursStyle = {
            transform: `rotate(${hours * 30}deg)`,
        };
        return (
            <div>
                <h1>{digiClock}</h1>
                <div className="container">
                    <div className="gradient-circle"></div>
                    <div className="analog-clock">
                        <div className="dial seconds" style={secondsStyle} />
                        <div className="dial minutes" style={minutesStyle} />
                        <div className="dial hours" style={hoursStyle} />
                        <div className="dial dot" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
