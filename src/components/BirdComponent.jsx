import styled from 'styled-components';

const Bird = styled.div`
	top: ${(props) => props.top}px;
	left: ${(props) => props.left}px;
	height: 80px;
	width: 80px;
	position: absolute;
`;

export default Bird;
