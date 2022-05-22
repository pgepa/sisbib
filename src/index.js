import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import GlobalStyle from './globalStyled';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <GlobalStyle />
    </React.StrictMode>,
    document.getElementById('root')
);
