'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App.jsx';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer);

store.dispatch({
	type: 'SET_ROUTE',
	route: PHP.app.$context.route
});

print(ReactDOMServer.renderToString(
	<Provider store={store}>
		<App />
	</Provider>
));
