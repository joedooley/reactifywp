'use strict';

import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Body from './Body.jsx';
import River from './River.jsx';
import Single from './Single.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import * as ThemeActions from '../actions/index.js';
var util = require('util');

class App extends React.Component {
    render() {
    	let Content = River;

    	if ('single' === this.props.route.type) {
    		Content = Single;
    	}

        return (
            <html>
	            <head dangerouslySetInnerHTML={{__html: PHP.app.$template_tags.wp_head}}>
	            </head>
	            <body className={PHP.app.$template_tags.get_body_class}>

					<div id="page" className="site">
						<div className="site-inner">

		            		<Header route={this.props.route} />

		            		<div id="content" className="site-content">
		            			<Content />
		            		</div>

		            		<Footer route={this.props.route} />
		            	</div>
		            </div>


	                <div dangerouslySetInnerHTML={{__html: PHP.app.$template_tags.wp_footer}}></div>
	            </body>
            </html>
        );
    }
}

const mapStateToProps = state => ({
	route: state.get('route')
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(ThemeActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
