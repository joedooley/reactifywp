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

					<div id="page" class="site">
						<div class="site-inner">

		            		<Header />

		            		<div id="content" class="site-content">
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
