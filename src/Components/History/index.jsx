import React from 'react';
// import './History.scss'; 

const History = ({ history, handleHistoryClick }) => {
  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => handleHistoryClick(item)}>
            {item.requestParams.method} - {item.requestParams.url}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;