const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const Wordrelay = require('./Wordrelay');

const Hot = hot(Wordrelay); // 수정사항이 있을때 반영

ReactDom.render(<Hot />, document.querySelector('#root'));