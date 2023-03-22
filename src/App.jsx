import './App.css';
import { useEffect, useState } from 'react';

import { Container } from './components/ContainerComponent';
import { Airplane } from './components/AirplaneComponent';
import { Cloud } from './components/CloudComponent';
import { Bird } from './components/BirdComponent';

import airplaneImage from './assets/images/airplane.png';
import cloudImage from './assets/images/cloud.png';
import birdImage from './assets/images/bird.png';

const App = () => {
	const containerWidth = 1024;
	const containerHeight = 768;
	const airplaneWidth = 120;
	const airplaneHeight = 90;
	const airplaneSpeed = 100;
	const [topPlanePosition, setTopPlanePosition] = useState(380);
	const [leftPlanePosition, setLeftPlanePosition] = useState(0);

	const handleKeyDown = (event) => {
		let newTopPlanePosition = topPlanePosition;
		let newLeftPlanePosition = leftPlanePosition;
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

	const [birdLeftPosition, setBirdLeftPosition] = useState(containerWidth + 80);
	const [birdHighPosition, setBirdHighPosition] = useState(200);
	const generateRandomInt = () => {
		const min = 20;
		const max = 740;
		const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

		return randomInt
	};

	useEffect(() => {
    let birdId;
    if (birdLeftPosition >= -80) {
      birdId = setInterval(() => {
        setBirdLeftPosition((birdLeftPosition) => birdLeftPosition - 5)
      }, 5);
      return () => {
        clearInterval(birdId)
      }
    } else {
      setBirdLeftPosition(containerWidth)
      setBirdHighPosition(generateRandomInt())
    }
	});

	return (
		<div className="App" onKeyDown={handleKeyDown} tabIndex="0">
			<Container width={containerWidth} height={containerHeight}>
				<Cloud className="cloud">
					<img src={cloudImage} id="cloud-1" />
					<img src={cloudImage} id="cloud-2" />
				</Cloud>
				<Bird className="bird" top={birdHighPosition} left={birdLeftPosition}>
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
			</Container>
		</div>
	);
};

export default App;
