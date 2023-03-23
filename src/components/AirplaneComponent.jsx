import styled from 'styled-components';

const Airplane = styled.div`
	position: absolute;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	top: ${(props) => props.top}px;
	left: ${(props) => props.left}px;
	transition: 0.2s linear;
`;

export default Airplane;
