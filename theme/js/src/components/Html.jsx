'use strict';

import React from 'react';
import App from './App.jsx';

class Html extends React.Component {
    render() {
    	let clientUrl = PHP.context.$template_tags.stylesheet_directory_url + '/js/client.js';

        return (
            <html>
	            <head dangerouslySetInnerHTML={{__html: PHP.context.$template_tags.wp_head}}>
	            </head>
	            <body className={PHP.context.$template_tags.get_body_class}>
	            	<div id="reactifywp-app-container">
						<App />
	                </div>

					<script src={clientUrl}></script>
	            </body>
            </html>
        );
    }
}

export default Html;
