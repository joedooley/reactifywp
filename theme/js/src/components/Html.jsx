'use strict';

import React from 'react';

import Body from './Body.jsx';

class Html extends React.Component {
    render() {
        return (
            <html>
	            <head dangerouslySetInnerHTML={{__html: PHP.app.actions.wp_head}}>
	            </head>
	            <body>
	                <Body />

	                <div dangerouslySetInnerHTML={{__html: PHP.app.actions.wp_footer}}></div>
	            </body>
            </html>
        );
    }
}

export default Html;
