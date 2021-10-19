import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.13.17&externalPlugins=
// React.createElement(App,null, null);
ReactDOM.render(<App />, document.getElementById('root'));

// function createElement(tag, properties, contenido){
//   const $h1 = document.createElement(tag);
//   $h1.textContent = contenido;
//   $h1.setAttribute(properties.key), properties[key]);
// }

