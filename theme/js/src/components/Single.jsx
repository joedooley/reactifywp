'use strict';

import React from 'react';
import Post from './Post.jsx';

class Single extends React.Component {
    render() {
        return (
        	<div id="primary" className="content-area">
	            <main id="main" className="site-main" role="main">
					<Post{...this.props} post={this.props.posts[0]} />
	            </main>
            </div>
        );
    }
}

export default Single;
