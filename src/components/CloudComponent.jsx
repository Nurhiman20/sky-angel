import styled from "styled-components";

const Cloud = styled.div`
	position: absolute;
	width: 220px;
	height: auto;
	top: ${(props) => props.top}px;
	left: ${(props) => props.left}px;
`;

export default Cloud;
