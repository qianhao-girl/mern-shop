import styled from 'styled-components';
import defaultImg from '../../assets/images/default.jpg';

 const StyledHero = styled.header `
    box-sizing: border-box;
    min-height: 65vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    background-image: url(${props => props.img ? props.img : defaultImg });
    background-size: cover;
    background-position: center;
`

export default StyledHero;