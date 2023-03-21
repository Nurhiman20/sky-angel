import './App.css';
import { useState } from 'react';

import airplaneImage from './assets/images/airplane.png';
import { Airplane } from "./components/AirplaneComponent";
import { Container } from './components/ContainerComponent';

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

	return (
		<div className="App" onKeyDown={handleKeyDown} tabIndex="0">
			<Container width={containerWidth} height={containerHeight}>
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
