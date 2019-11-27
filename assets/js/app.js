import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import ArticleRoute from './router';
// import Admin from './Admins';

ReactDOM.render(<HashRouter ><ArticleRoute /></HashRouter>, document.getElementById('root'));
// console.log(process.env.API_URL)
// ReactDOM.render(<Admin />, document.getElementById('root'));