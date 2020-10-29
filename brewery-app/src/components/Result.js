import React, { useRef } from 'react';
import { activateBrewery, deactivateBrewery, selectBrewery } from '../features/activeBrewerySlice';
import { hideSearch } from '../features/showSearchFormSlice';
import { addBrewery, barCrawl, removeBrewery, view } from "../features/barCrawlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from "react-dnd";
import { ResultDiv } from '../styles/ResultStyle';




const Result = (props) => {
    const dispatch = useDispatch();
    const brewery = useSelector(selectBrewery);
    const barCrawlList = useSelector(barCrawl);
    const activeView = useSelector(view);

    const isActiveBrewery = (props.result.id === brewery.id);
     // Sends brewery details up to hompage level and highlights the active div based on the index
     // Sets redux state for active brewery
     const handleClick = (e) => {
        if (e.target.className === 'cancel') {
            dispatch(activateBrewery(props.result));
            return
        }
        if (isActiveBrewery) {
            dispatch(deactivateBrewery());
        } else {
            dispatch(activateBrewery(props.result));
        }
    }
    
    const isOnList = (brewid, list) => {
        let index = list.findIndex(x => x.id === brewid);
        let onList = (index === -1 ? false : true);
        return onList;
    }

    let onList = isOnList(props.result.id, barCrawlList);

    const updateListClick = (e) => {
        let onList = isOnList(props.result.id, barCrawlList);
        if(onList) {
            dispatch(removeBrewery(props.result));
        } else {
            dispatch(addBrewery(props.result));
        }
        
        
    }

    const hideForm = () => {
        dispatch(hideSearch());
    }
    
    //Set up for draggable list
    const ref = useRef(null);
    const findBrew = props.findBrew;
    const moveBrew = props.moveBrew;

    const originalIndex = findBrew(props.id).index;
    

    const [{isDragging}, drag] = useDrag({
        item: {type: "resultCard", id: props.id, originalIndex },
        canDrag: activeView==="barCrawl" ? true : false,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        end: (dropResult, monitor) => {
            const {id: droppedId, originalIndex} = monitor.getItem();
            const didDrop = monitor.didDrop();
            if(!didDrop) {
                moveBrew(droppedId, originalIndex);
            }
        }
    });

    const[, drop] = useDrop({
        accept: "resultCard",
        canDrop: () => false,
        hover({id: draggedId}) {
            console.log(draggedId)
            if(draggedId !== props.id) {
                const { index: overIndex } = findBrew(props.id);
                console.log("trying to move brew")
                moveBrew(draggedId, overIndex);
                
            }
        },
    })
    

    drag(drop(ref))

    return (
        <ResultDiv 
            className={isActiveBrewery ? 'result active' : 'result'}  
            ref={ref} 
            isDragging={isDragging} 
            onClick={(e) => handleClick(e)}
            >
            <div className={isActiveBrewery ? 'active' : ''}> 
                <h3>Brewery: {props.result.name}</h3>
                <h4>Location: {props.result.street}, {props.result.city}, {props.result.state}</h4>
                { /* brewery name in URL is for visual purposes only. showPage uses Redux state */ }
                <Link to={`/show/${props.result.name.split(' ').join('')}`} className='cancel' onClick={hideForm}>
                    More info
                </Link> 
                <button className='cancel' onClick={(e) => updateListClick(e)}>
                    {onList ? "Remove from Bar Crawl" : "Add to Bar Crawl"}
                </button>
            </div>
        </ResultDiv>

    )
    
}

export default Result;