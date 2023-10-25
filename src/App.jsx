import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [data, setData] = useState();
  const [requestParams, setRequestParams] = useState({});
  const [responseBody, setResponseBody] = useState({});

  const callApi = async ({ method, url, body }) => {
    let response = await axios({
      method: method,
      url: url,
      data: body
    });

    let data = response.data;//.results;
    setData(data);
    setRequestParams({ method, url });
    setResponseBody(response.data);
  }

  // explain this in more detail:
  // the following useEffect will run every time the requestParams object changes and the url property is not empty (which is the default state), which means that it will run every time the user submits the form.
  useEffect(() => {
    if (requestParams.url) {
      callApi(requestParams);
    }
  }, [requestParams]);


  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {data && <Results data={responseBody} />}
      <Footer />
    </React.Fragment>
  );
}

export default App;
