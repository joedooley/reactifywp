'use strict';

import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer id="colophon" class="site-footer" role="contentinfo">
				<?php if ( has_nav_menu( 'primary' ) ) : ?>
					<nav class="main-navigation" role="navigation" aria-label="Footer Primary Menu">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'primary',
								'menu_class'     => 'primary-menu',
							 ) );
						?>
					</nav>
				<?php endif; ?>

				<?php if ( has_nav_menu( 'social' ) ) : ?>
					<nav class="social-navigation" role="navigation" aria-label="Footer Social Links Menu">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'social',
								'menu_class'     => 'social-links-menu',
								'depth'          => 1,
								'link_before'    => '<span class="screen-reader-text">',
								'link_after'     => '</span>',
							) );
						?>
					</nav>
				<?php endif; ?>

				<div class="site-info">
					<?php
						/**
						 * Fires before the twentysixteen footer text for footer customization.
						 *
						 * @since Twenty Sixteen 1.0
						 */
						do_action( 'twentysixteen_credits' );
					?>
					<span class="site-title"><a href={PHP.app.$constants.home_url} rel="home">{PHP.app.$constants.bloginfo_name}</a></span>
					<a href="https://wordpress.org">Proudly powered by WordPress</a>
				</div>
			</footer>
		);
	}
}

export default Footer;
