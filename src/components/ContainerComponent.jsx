import styled from 'styled-components';

const Container = styled.div`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	background-color: skyblue;
	position: relative;
  overflow: hidden;
`;

export default Container;
