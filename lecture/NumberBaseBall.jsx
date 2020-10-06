import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

const NumberBaseBall = require('./NumberBaseball');

const Hot = hot(NumberBaseBall);

ReactDom.render(<Hot />, document.querySelector('#root'));