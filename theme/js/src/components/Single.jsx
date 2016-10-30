'use strict';

import React from 'react';

class Single extends React.Component {
    render() {
    	let id = 'post-' + this.props.post.ID;
        return (
            <main id="main" className="site-main" role="main">
				<article id=id className={this.props.posts[0].post_class}>
					<header className="entry-header">
						<h1 className="entry-title">
							{this.props.posts[0].the_title}
						</h1>
					</header>

					<div dangerouslySetInnerHTML={{__html: PHP.context.$template_tags.twentysixteen_post_thumbnail}}></div>

					<div className="entry-content">
						<div dangerouslySetInnerHTML={{__html: this.props.posts[0].the_content}}></div>
					</div>

				</article>
            </main>
        );
    }
}

export default Single;
