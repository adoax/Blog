import React from 'react';
import ReactDOM from 'react-dom'
// import { HashRouter } from 'react-router-dom'
import ArticleRoute from './router';

// ReactDOM.render(<HashRouter ><ArticleRoute /></HashRouter>, document.getElementById('root'));

// const ArticleRoute = () => (
//     <HydraAdmin entrypoint={process.env.API_URL}/>
//     );
    
ReactDOM.render(<ArticleRoute />, document.getElementById('root'));