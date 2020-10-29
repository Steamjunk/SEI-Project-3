import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;


export const CrawlCount = styled.span`
    display: inline-block;
    background-color: white;
    color: black;
    text-align: center;
    padding: 2px;
    border-radius: 20%;
    margin-left: 0.5em;
    font-weight: bold;
`

export const ResultDiv = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    margin: 10px 5px;
    padding: 5px;
    box-shadow: 2px 2px 10px 2px grey;
    width: 90%;
    &:hover {
        box-shadow: none;
    }
    &:active {
        box-shadow: inset 2px 2px 10px 2px grey;
    }
    div > *{
        margin: 0;
    }
    animation: ${fadeInAnimation} 1s 1; 
    
`

export const ResultHead = styled.div`
    min-height: 25px;
    height: 7%;
    width: 100%;
    display: flex;
    background: #fbdc81;
`

export const ResultHolder = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(87vh - 7%);
    overflow-y: auto;
    &.message {
        padding: 15px;
        text-align: center;
        overflow: none;
    }
    h3 {
            margin: 10px;
    }
    .active {
            background: #9a5607;
            color: white;
    }
    &:isDragging {
        opacity: 0;
        background: purple;
    }
`

export const Message = styled(ResultHolder)` 
`

export const ResultList = styled.div` 
// border: solid 5px #6f3c05;
height: 87vh;
width: 25%;
background: #f2a743;
position: relative;
box-shadow: 3px 3px 5px grey;
border-top-right-radius: 10px;
border-top-left-radius: 10px;
z-index: 1;
`

export const ViewButton = styled.div `
display: flex;
margin: 0;
background: #fbdc81;
border-left: 2px solid #fbdc81;
border-right: 2px solid #fbdc81;
height: 100%;
width: 50%;
border-top-right-radius: 10px;
border-top-left-radius: 10px;
cursor: pointer;
align-items: center;
justify-content: center;
&:hover {
    background: rgba(242,167,67,.3);
    border-left: 2px solid #fbdc81;
    border-right: 2px solid #fbdc81;

}
&.active {
    background: #f2a743;
    border-left: 2px solid #f2a743;
    border-right: 2px solid #f2a743;
    font-size: x-large;
    font-weight: 700;
}
`