import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

const initialState = {
  data: null,
  requestParams: {},
  responseBody: {},
  loading: false,
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'RESULTS':
      return { ...state, 
        loading: false, 
        data: action.payload.data, 
        requestParams: action.payload.requestParams, 
        responseBody: action.payload.responseBody, 
        history: [...state.history, action.payload] 
      };
    default:
      return state;
  }
}


const App = () => {
  // const [data, setData] = useState();
  // const [requestParams, setRequestParams] = useState({});
  // const [responseBody, setResponseBody] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shouldCallApi, setShouldCallApi] = useState(false);  

  const handleHistoryClick = (item) => {
    dispatch({ type: 'RESULTS', payload: item });
  };
  
  const callApi = async ({ method, url, body }) => {
    let response = await axios({
      method: method,
      url: url,
      data: body
    });
  
    let data = response.data;//.results;

    // for useReducer 
    // setData(data);
    // setRequestParams({ method, url });
    // setResponseBody(response.data);
    dispatch({ 
      type: 'RESULTS', 
      payload: { 
        data, 
        requestParams: { method, url }, 
        responseBody: response.data 
      }
    });

  setShouldCallApi(false);  // Set shouldCallApi to false after API call is made otherwise i render infinitely

  }

// i really don't like this work around - can't think of a better one though
  useEffect(() => {
    if (shouldCallApi && state.requestParams.url) {
      callApi(state.requestParams);
    }
  }, [shouldCallApi, state.requestParams]);  // Depend on shouldCallApi
  
  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <p>Viable options are:
        <ul>
        <li>https://pokeapi.co/api/v2/pokemon/</li>
        <li>https://opentdb.com/api.php?amount=10</li>
        </ul>
      </p>

      <Form handleApiCall={callApi} setShouldCallApi={setShouldCallApi} />
      <div>
        <History history={state.history} handleHistoryClick={handleHistoryClick} />
        <Results data={state.data} />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
