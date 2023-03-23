import './App.css';
import { useEffect, useRef, useState } from 'react';

import { Container } from './components/ContainerComponent';
import { Airplane } from './components/AirplaneComponent';
import { Cloud } from './components/CloudComponent';
import { Bird } from './components/BirdComponent';

import airplaneImage from './assets/images/airplane.png';
import cloudImage from './assets/images/cloud.png';
import birdImage from './assets/images/bird.png';
import { ContainerInfo } from './components/ContainerInfoComponent';
import { AppBar } from './components/AppBarComponent';
import Stopwatch from './components/StopwatchComponent';
import { calculateTime } from './assets/helpers';

const App = () => {
	const containerRef = useRef(null);
	const containerWidth = 1024;
	const containerHeight = 768;
	const airplaneWidth = 120;
	const airplaneHeight = 90;
	const airplaneSpeed = 100;
	const [gameHasStarted, setGameHasStarted] = useState(false);
	const [gameHasOver, setGameHasOver] = useState(false);
	const [topPlanePosition, setTopPlanePosition] = useState(380);
	const [leftPlanePosition, setLeftPlanePosition] = useState(0);

	const [time, setTime] = useState(0);

	const handleKeyDown = (event) => {
		let newTopPlanePosition = topPlanePosition;
		let newLeftPlanePosition = leftPlanePosition;
		if (event.key == ' ' && !gameHasOver) {
			setGameHasStarted(!gameHasStarted);
		}
		if (!gameHasStarted) {
			return false;
		}
		switch (event.key) {
			case 'ArrowLeft':
				newLeftPlanePosition -= airplaneSpeed;
				if (newLeftPlanePosition < 0) {
					setLeftPlanePosition(0);
				} else {
					setLeftPlanePosition(newLeftPlanePosition);
				}
				break;
			case 'ArrowRight':
				newLeftPlanePosition += airplaneSpeed;
				if (newLeftPlanePosition > containerWidth - airplaneWidth) {
					setLeftPlanePosition(containerWidth - airplaneWidth);
				} else {
					setLeftPlanePosition(newLeftPlanePosition);
				}
				break;
			case 'ArrowUp':
				newTopPlanePosition -= airplaneSpeed;
				if (newTopPlanePosition < 0) {
					setTopPlanePosition(0);
				} else {
					setTopPlanePosition(newTopPlanePosition);
				}
				break;
			case 'ArrowDown':
				newTopPlanePosition += airplaneSpeed;
				if (newTopPlanePosition > containerHeight - airplaneHeight) {
					setTopPlanePosition(containerHeight - airplaneHeight);
				} else {
					setTopPlanePosition(newTopPlanePosition);
				}
				break;
			default:
				break;
		}
	};

	const generateRandomInt = () => {
		const min = 20;
		const max = 740;
		const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

		return randomInt;
	};

	const [leftCloudPosition, setLeftCloudPosition] = useState(
		containerWidth + 220
	);
	const [topCloudPosition, setTopCloudPosition] = useState(200);
	useEffect(() => {
		let cloudId;
		if (gameHasStarted && leftCloudPosition >= -220) {
			cloudId = setInterval(() => {
				setLeftCloudPosition((leftCloudPosition) => leftCloudPosition - 5);
			}, 20);
			return () => {
				clearInterval(cloudId);
			};
		} else {
			setLeftCloudPosition(containerWidth);
			setTopCloudPosition(generateRandomInt());
		}
	}, [gameHasStarted, leftCloudPosition]);

	const [leftBirdPosition, setLeftBirdPosition] = useState(containerWidth + 80);
	const [topBirdPosition, setTopBirdPosition] = useState(200);
	useEffect(() => {
		let birdId;
		if (gameHasStarted && leftBirdPosition >= -80) {
			birdId = setInterval(() => {
				setLeftBirdPosition((leftBirdPosition) => leftBirdPosition - 10);
			}, 20);
			return () => {
				clearInterval(birdId);
			};
		} else {
			setLeftBirdPosition(containerWidth);
			setTopBirdPosition(generateRandomInt());
		}
	}, [gameHasStarted, leftBirdPosition]);

	useEffect(() => {
		const topPositionColladed =
			(topPlanePosition >= topBirdPosition &&
				topPlanePosition <= topBirdPosition + 80) ||
			(topPlanePosition + airplaneHeight >= topBirdPosition &&
				topPlanePosition + airplaneHeight <= topBirdPosition + 80);
		const leftPositionColladed =
			(leftPlanePosition >= leftBirdPosition &&
				leftPlanePosition <= leftBirdPosition + 80) ||
			(leftPlanePosition + airplaneWidth >= leftBirdPosition &&
				leftPlanePosition + airplaneWidth <= leftBirdPosition + 80);
		if (topPositionColladed && leftPositionColladed) {
			setGameHasStarted(false);
			setGameHasOver(true);
		}
	}, [topPlanePosition, topBirdPosition, leftPlanePosition, leftBirdPosition]);

	const startGame = () => {
		setTime(0);
		setGameHasStarted(true);
		setGameHasOver(false);
		containerRef.current.focus();
	};

	const changeTime = (newTime) => {
		setTime(newTime);
	};

	return (
		<div
			className="App"
			onKeyDown={handleKeyDown}
			ref={containerRef}
			tabIndex="0"
		>
			<Container width={containerWidth} height={containerHeight}>
				<Cloud
					className="cloud"
					top={topCloudPosition}
					left={leftCloudPosition}
				>
					<img src={cloudImage} />
				</Cloud>
				<Bird className="bird" top={topBirdPosition} left={leftBirdPosition}>
					<img src={birdImage} />
				</Bird>
				<Airplane
					className="airplane"
					top={topPlanePosition}
					left={leftPlanePosition}
					width={airplaneWidth}
					height={airplaneHeight}
				>
					<img src={airplaneImage} />
				</Airplane>
				<AppBar>
					<div className='time-container'>
            <p className='time-title'>Time Flight</p>
						<Stopwatch
							time={time}
							onTimeChanged={changeTime}
							gameStarted={gameHasStarted}
						></Stopwatch>
					</div>
				</AppBar>
				{!gameHasStarted && !gameHasOver ? (
					<ContainerInfo>
						<div className="overlay"></div>
						<div className="game-info-container">
							<h1 className="text-white">SKY ANGEL</h1>
							<button type="button" onClick={startGame}>
								Start Game
							</button>
						</div>
					</ContainerInfo>
				) : null}
				{gameHasOver ? (
					<ContainerInfo>
						<div className="overlay"></div>
						<div className="game-info-container">
							<h1 className="text-white">GAME OVER</h1>
							<p>Your time: {calculateTime(time)}</p>
							<button type="button" onClick={startGame}>
								Play Again
							</button>
						</div>
					</ContainerInfo>
				) : null}
			</Container>
		</div>
	);
};

export default App;
