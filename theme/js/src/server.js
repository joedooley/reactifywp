'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from './components/Html.jsx';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducer);

store.dispatch({
	type: 'SET_CONTEXT',
	route: PHP.context.$route,
	posts: PHP.context.$posts,
	template_tags: PHP.context.$template_tags,
	nav_menus: PHP.context.$nav_menus,
	sidebars: PHP.context.$sidebars,
});

print(ReactDOMServer.renderToString(
	<Provider store={store}>
		<Html />
	</Provider>
));
