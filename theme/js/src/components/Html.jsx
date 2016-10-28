'use strict';

import React from 'react';
import Body from './Body.jsx';
import Header from './Header.jsx';

class Html extends React.Component {
    render() {
        return (
            <html>
	            <head dangerouslySetInnerHTML={{__html: PHP.app.$template_tags.wp_head}}>
	            </head>
	            <body className={PHP.app.$template_tags.get_body_class}>

					<div id="page" className="site">
						<div className="site-inner">

		            		<Header />

		            		<div id="content" className="site-content">
		            		</div>
		            	</div>
		            </div>


	                <div dangerouslySetInnerHTML={{__html: PHP.app.$template_tags.wp_footer}}></div>
	            </body>
            </html>
        );
    }
}

export default Html;
