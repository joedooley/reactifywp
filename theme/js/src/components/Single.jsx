'use strict';

import React from 'react';

class Single extends React.Component {
    render() {
        return (
            <main id="main" className="site-main" role="main">
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<header className="entry-header">
						<h1 className="entry-title">
							{this.props.post.the_title}
						</h1>
					</header>

					<?php twentysixteen_post_thumbnail(); ?>

					<div className="entry-content">
						{this.props.post.the_content}
						<?php
						wp_link_pages( array(
						'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'twentysixteen' ) . '</span>',
						'after'       => '</div>',
						'link_before' => '<span>',
						'link_after'  => '</span>',
						'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>%',
						'separator'   => '<span class="screen-reader-text">, </span>',
						) );
						?>
					</div>

					<?php
					edit_post_link(
					sprintf(
					/* translators: %s: Name of current post */
					__( 'Edit<span class="screen-reader-text"> "%s"</span>', 'twentysixteen' ),
					get_the_title()
					),
					'<footer class="entry-footer"><span class="edit-link">',
					'</span></footer><!-- .entry-footer -->'
					);
					?>

				</article>
            </main>
        );
    }
}

export default Single;
