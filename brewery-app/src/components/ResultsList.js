import React, {useState} from 'react';
import Result from './Result';
import { useSelector, useDispatch} from 'react-redux';
import { selectBreweryList } from '../features/breweryListSlice';
import { useDrop } from "react-dnd";
import { barCrawl, view, setView, selectEmail, toggleEmail } from "../features/barCrawlSlice";
import EmailForm from './EmailForm';
import { StyledSubmit } from '../styles/FormStyles';
import { Message, ResultList, ResultHead, ViewButton, ResultHolder, CrawlCount } from '../styles/ResultStyle';
import update from "immutability-helper";


const ResultsList = () => {
    const viewClick = (view) => {
        dispatch(setView(view))
    }

    const dispatch = useDispatch();
    const searchResults = useSelector(selectBreweryList);
    const barCrawlList = useSelector(barCrawl);
    const activeView = useSelector(view);
    const email = useSelector(selectEmail);
    // Setting up neccessary controls for dragging cards

    const [brews, setBrews] = useState(barCrawlList);

    // $splice is an immutable version of plain splice
    // The first line of the splice removes the brewery we are dragging
    // The second line of the splice inserts in in the hovering position
    const moveBrew = (id, atIndex) => {
        const {brew, index} = findBrew(id);
        setBrews(update(brews, {
            $splice: [
                [index,1],
                [atIndex, 0, brew]
            ],
        }));      
    };

    const findBrew = (id) => {
        const brew = brews.filter((b) => `${b.id}` === id)[0];
        return {
            brew,
            index: brews.indexOf(brew),
        };
    };

    const [, drop] = useDrop({
        accept: "resultCard"
    })


    return (
        <ResultList className='Result-list'>
            <ResultHead>
                <ViewButton 
                    onClick={() => viewClick("results")}
                    className={activeView==="results" ? "active" : "inactive"}
                >Search Results</ViewButton>
                <ViewButton 
                    onClick={() => viewClick("barCrawl")}
                    className={activeView==="barCrawl" ? "active" : "inactive"}
                >
                    Bar Crawl List
                    <CrawlCount>{barCrawlList.length}</CrawlCount>
                    </ViewButton>
            </ResultHead>
            {activeView === "results" ?
                <ResultHolder>
                    <h3>Search Results</h3>
                    <ResultHolder className="results">
                        {searchResults && searchResults.map((result, index) => (
                        <Result 
                            result={result} 
                            key={index} 
                            id={`${result.id}`}
                            moveBrew={moveBrew}
                            findBrew={findBrew}
                        /> 
                        ))}
                    </ResultHolder>
                </ResultHolder> 
                
            :
                <ResultHolder>
                    <h3>Bar Crawl List</h3>
                    {barCrawlList.length === 0 ? 
                        <Message className="message">
                            <h4>You haven't pick any breweries yet...</h4>
                            <h5>Time to get planning!</h5> 
                        </Message>
                        :
                        <ResultHolder className="results" ref={drop}>
                            <StyledSubmit value='Send Email' onClick={(e) => {
                                e.preventDefault()
                                dispatch(toggleEmail())}
                                } />
                            {barCrawlList.map((brew, index) => (
                                    <Result
                                        result={brew}
                                        key={index}
                                        id={`${brew.id}`}
                                        moveBrew={moveBrew}
                                        findBrew={findBrew}
                                    />
                            ))}                            
                        </ResultHolder>

                    }
                </ResultHolder>
            }

            {email && <EmailForm />}

        </ResultList>

    )
}

export default ResultsList;