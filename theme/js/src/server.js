'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import reducer from './reducer';
import App from './components/App.jsx';
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

const clientUrl = PHP.context.$template_tags.stylesheet_directory_url + '/js/client.js'

print(ReactDOMServer.renderToStaticMarkup(
	<html>
        <head dangerouslySetInnerHTML={{__html: PHP.context.$template_tags.wp_head}}>
        </head>
        <body className={PHP.context.$template_tags.get_body_class}>
        	<div className="reactifywp-app-container">
        		<Provider store={store}>
					<App />
				</Provider>
            </div>

			<script src={clientUrl}></script>
        </body>
    </html>
));
