import React, { useState, useEffect } from 'react';
import { calculateTime } from '../assets/helpers';

const Stopwatch = (props) => {
	// state to store time
	const { time, onTimeChanged, gameStarted } = props;

	useEffect(() => {
		let intervalId;
		if (gameStarted) {
			// setting time from 0 to 1 every 10 milisecond using javascript setInterval method
			intervalId = setInterval(() => onTimeChanged(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [gameStarted, time]);

	return (
    <p className="time">{calculateTime(time)}</p>
	);
};

export default Stopwatch;
