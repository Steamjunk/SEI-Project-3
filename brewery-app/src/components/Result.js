import React from 'react';
import styled from 'styled-components';
import { activateBrewery, deactivateBrewery, selectBrewery } from '../features/activeBrewerySlice';
import { hideSearch } from '../features/showSearchFormSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Div = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    margin: 5px;
    padding: 0;
    box-shadow: 2px 2px 10px 2px grey;
    &:hover {
        box-shadow: none;
    }
    &:active {
        box-shadow: inset 2px 2px 10px 2px grey;
    }
    .active {
        background: red;
    }
    div > *{
        margin: 0;
    }
`

const Result = (props) => {
    const dispatch = useDispatch();
    const brewery = useSelector(selectBrewery);

    const isActiveBrewery = (props.result.id === brewery.id);
     // Sends brewery details up to hompage level and highlights the active div based on the index
     // Sets redux state for active brewery
     const handleClick = (e) => {
        if (isActiveBrewery) {
            dispatch(deactivateBrewery());
        } else {
            dispatch(activateBrewery(props.result));
        }
    }

    const hideForm = () => {
        dispatch(hideSearch());
    }

    return (
        <Div className='result' onClick={(e) => handleClick(e)}>
            <div className={isActiveBrewery ? 'active' : ''}> 
                <h3>Brewery: {props.result.name}</h3>
                <h4>Location: {props.result.street}, {props.result.city}, {props.result.state}</h4>
                { /* brewery name in URL is for visual purposes only. showPage uses Redux state */ }
                <Link to={`/show/${props.result.name.split(' ').join('')}`} onClick={hideForm}>
                    More info
                </Link> 
            </div>
        </Div>
    )
}

export default Result;