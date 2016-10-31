'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import River from './River.jsx';
import Single from './Single.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import * as ThemeActions from '../actions/index.js';

class App extends React.Component {

    render() {

    	let initialStateString = 'window.__INITIAL_STATE__ = ' + JSON.stringify(this.props) + ';';

        return (
        	<div id="reactify-app-container">
				<div id="page" className="site">
					<div className="site-inner">

	            		<Header {...this.props} />

	            		<div id="content" className="site-content">
	            			{ 'single' === this.props.route.type ?

	            				<Single {...this.props} />
	            			:
	            				<River {...this.props} />
	            			}

	            			<Sidebar {...this.props} />
	            		</div>
	            		<Footer {...this.props} />
	            	</div>
	            </div>

                <div dangerouslySetInnerHTML={{__html: this.props.template_tags.wp_footer}}></div>
                <script dangerouslySetInnerHTML={{__html: initialStateString}}></script>
            </div>
        );
    }
}

const mapStateToProps = state => ({
	route: state.get('route'),
	posts: state.get('posts'),
	template_tags: state.get('template_tags'),
	nav_menus: state.get('nav_menus'),
	sidebars: state.get('sidebars'),
});


const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(ThemeActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
